<script setup lang="ts">
import type { Lead, Proposal } from "@bycar-in-ua/crm-sdk";
import { useQuery } from "@tanstack/vue-query";

const LEAD_STATUS = {
  Pending: "pending",
  OffersReceived: "offers_received",
  Resolved: "resolved",
  Canceled: "canceled",
} as const;

const PROPOSAL_STATUS = {
  Draft: "draft",
  Submitted: "submitted",
  Accepted: "accepted",
  Rejected: "rejected",
} as const;

const AVAILABILITY = {
  DealerStock: "dealer_stock",
  DomesticStock: "domestic_stock",
  ForeignStock: "foreign_stock",
  Shipping: "shipping",
  FactoryOrder: "factory_order",
} as const;

const props = withDefaults(defineProps<{
  lead: Lead;
  defaultOpen?: boolean;
}>(), { defaultOpen: false });

const leadsService = useLeadService();

const isOpen = ref(props.defaultOpen);

const shouldLoadProposals = computed(() =>
  isOpen.value
  && (props.lead.status === LEAD_STATUS.OffersReceived || props.lead.status === LEAD_STATUS.Resolved),
);

const {
  data: proposalsData,
  isLoading,
  isError,
  error,
  refetch,
} = useQuery({
  queryKey: [
    "profile", "offers", props.lead.id, "proposals",
  ],
  queryFn: () => leadsService.getLeadProposals(props.lead.id),
  enabled: shouldLoadProposals,
  staleTime: 60_000,
});

const visibleProposals = computed(() => {
  const proposals = (proposalsData.value ?? [])
    .filter((proposal) => proposal.status !== PROPOSAL_STATUS.Draft && proposal.status !== PROPOSAL_STATUS.Rejected)
    .sort((left, right) => {
      if (left.status === PROPOSAL_STATUS.Accepted && right.status !== PROPOSAL_STATUS.Accepted) {
        return -1;
      }

      if (left.status !== PROPOSAL_STATUS.Accepted && right.status === PROPOSAL_STATUS.Accepted) {
        return 1;
      }

      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });

  return proposals;
});

const acceptedProposal = computed(() =>
  visibleProposals.value.find((proposal) => proposal.status === PROPOSAL_STATUS.Accepted) ?? null,
);

const leadTitle = computed(() => {
  const sourceVehicle = props.lead.availableVehicle?.vehicle ?? props.lead.vehicle;
  const brand = sourceVehicle?.brand?.displayName ?? "";
  const model = sourceVehicle?.model ?? "";

  return [brand, model].filter(Boolean).join(" ").trim() || "Авто за вашим запитом";
});

const leadSubtitle = computed(() => {
  if (props.lead.availableVehicle?.complectation?.displayName) {
    return props.lead.availableVehicle.complectation.displayName;
  }

  if (!props.lead.vehicle?.complectations?.length || !props.lead.trimId) {
    return "";
  }

  return props.lead.vehicle.complectations.find((complectation) => complectation.id === props.lead.trimId)?.displayName ?? "";
});

const leadBrandLogo = computed(() =>
  props.lead.availableVehicle?.vehicle?.brand?.logo ?? props.lead.vehicle?.brand?.logo ?? "",
);

const formattedCreatedAt = computed(() => formatDate(props.lead.createdAt));

const formattedDeadline = computed(() => {
  if (!props.lead.resolutionDeadline) {
    return "";
  }

  return formatDate(props.lead.resolutionDeadline, true);
});

const statusMeta = computed(() => {
  switch (props.lead.status) {
    case LEAD_STATUS.OffersReceived:
      return {
        label: "Готово до вибору",
        classes: "border-blue-100 text-blue-600",
      };
    case LEAD_STATUS.Resolved:
      return {
        label: "Пропозицію прийнято",
        classes: "border-green-100 text-green-600",
      };
    case LEAD_STATUS.Canceled:
      return {
        label: "Протерміновано",
        classes: "border-red-100 text-red-600",
      };
    default:
      return {
        label: "Шукаємо авто",
        classes: "border-amber-100 text-amber-600",
      };
  }
});

const readyStateSummary = computed(() => {
  if (!visibleProposals.value.length) {
    return "Ми завершили пошук, але пропозиції ще оновлюються. Спробуйте відкрити картку пізніше.";
  }

  return `Отримано пропозицій від дилерів: ${visibleProposals.value.length}.`;
});

function formatDate(value: Date | string | number, withTime = false) {
  const date = new Date(value);

  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    ...(withTime
      ? {
          hour: "2-digit",
          minute: "2-digit",
        }
      : {}),
  });
}

function formatProposalPrice(price: number) {
  return formatCurrency(price, {
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
    trailingZeroDisplay: "stripIfInteger",
  });
}

function getAvailabilityLabel(availability: Proposal["availability"]) {
  switch (availability) {
    case AVAILABILITY.DealerStock:
      return "В наявності у дилера";
    case AVAILABILITY.DomesticStock:
      return "Склад в Україні";
    case AVAILABILITY.ForeignStock:
      return "Склад закордоном";
    case AVAILABILITY.Shipping:
      return "В дорозі";
    case AVAILABILITY.FactoryOrder:
      return "Під замовлення";
    default:
      return "Доступність уточнюється";
  }
}

function getProposalTitle(proposal: Proposal) {
  const brand = proposal.vehicle?.brand?.displayName ?? "";
  const model = proposal.vehicle?.model ?? "";

  return [brand, model].filter(Boolean).join(" ").trim() || "Пропозиція дилера";
}

function getProposalSubtitle(proposal: Proposal) {
  if (!proposal.vehicle?.complectations?.length || !proposal.complectationId) {
    return "";
  }

  return proposal.vehicle.complectations.find((complectation) => complectation.id === proposal.complectationId)?.displayName ?? "";
}

function getProposalLocation(proposal: Proposal) {
  return proposal.location || proposal.dealer?.address || proposal.dealer?.location || proposal.dealer?.name || "Локація уточнюється";
}
</script>

<template>
  <UCollapsible
    v-model:open="isOpen"
    :default-open="defaultOpen"
    :unmount-on-hide="false"
    class="border border-gray-200 bg-white"
  >
    <template #default="{ open }">
      <button
        type="button"
        class="flex w-full flex-col gap-4 px-4 py-4 text-left transition-colors md:flex-row md:items-center md:justify-between md:px-5"
      >
        <div class="flex min-w-0 items-center gap-3 md:flex-1">
          <div class="flex size-12 shrink-0 items-center justify-center bg-black p-2 text-white">
            <CdnImage
              v-if="leadBrandLogo"
              :src="leadBrandLogo"
              size="thumbnail"
              class="h-full w-full object-contain invert"
            />
            <span v-else class="text-sm font-bold uppercase">
              {{ leadTitle.slice(0, 1) }}
            </span>
          </div>

          <div class="min-w-0">
            <p class="text-xl font-bold text-black">
              {{ leadTitle }}
            </p>
            <p v-if="leadSubtitle" class="text-base font-bold text-gray-950">
              {{ leadSubtitle }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-3 md:shrink-0 md:justify-end">
          <span
            class="inline-flex items-center border px-2 py-1 text-xs font-semibold"
            :class="statusMeta.classes"
          >
            {{ statusMeta.label }}
          </span>

          <span class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700">
            <UIcon name="i-lucide-clock-3" class="size-4 shrink-0" />
            {{ formattedCreatedAt }}
          </span>

          <span v-if="formattedDeadline" class="inline-flex items-center gap-1 text-sm font-semibold text-gray-700">
            <UIcon name="i-lucide-calendar-range" class="size-4 shrink-0" />
            {{ formattedDeadline }}
          </span>

          <UIcon
            name="i-lucide-chevron-down"
            class="size-5 shrink-0 transition-transform"
            :class="open ? 'rotate-180' : ''"
          />
        </div>
      </button>
    </template>

    <template #content>
      <div class="border-t border-gray-200 px-4 py-4 md:px-5">
        <div v-if="lead.status === LEAD_STATUS.Pending" class="border border-amber-500 bg-amber-50 px-3 py-3 text-base font-medium text-amber-700">
          Ми вже збираємо найкращі пропозиції від дилерів. Надішлемо сповіщення, як тільки вони будуть готові<span v-if="formattedDeadline">, але не пізніше {{ formattedDeadline }}</span>.
        </div>

        <div v-else-if="lead.status === LEAD_STATUS.Canceled" class="border border-red-500 bg-red-50 px-3 py-3 text-base font-medium text-red-700">
          На жаль, час на вибір авто за цим запитом вичерпано. Ви можете створити новий запит, щоб отримати актуальні ціни та наявність у дилерів.
        </div>

        <template v-else>
          <div v-if="isLoading" class="space-y-3">
            <USkeleton class="h-20 rounded-none" />
            <USkeleton class="h-20 rounded-none" />
          </div>

          <div v-else-if="isError" class="border border-red-200 bg-red-50 px-3 py-3 text-sm text-red-700">
            <p>Не вдалося завантажити пропозиції для цього запиту.</p>
            <p v-if="error instanceof Error" class="mt-1 text-xs opacity-80">
              {{ error.message }}
            </p>
            <UButton
              class="mt-3"
              color="error"
              variant="soft"
              size="sm"
              @click="refetch()"
            >
              Спробувати ще раз
            </UButton>
          </div>

          <template v-else>
            <div
              v-if="lead.status === LEAD_STATUS.OffersReceived"
              class="mb-4 border border-blue-100 bg-blue-50 px-3 py-3 text-sm font-medium text-blue-700"
            >
              {{ readyStateSummary }}
            </div>

            <div v-if="visibleProposals.length" class="space-y-3">
              <article
                v-for="proposal in lead.status === LEAD_STATUS.Resolved && acceptedProposal ? [acceptedProposal] : visibleProposals"
                :key="proposal.id"
                class="border border-gray-100 bg-white px-3 py-3"
              >
                <div class="flex flex-col gap-3 md:flex-row md:items-center">
                  <div class="flex min-w-0 flex-1 items-center gap-3">
                    <div class="h-16 w-20 shrink-0 overflow-hidden bg-gray-100">
                      <CdnImage
                        v-if="proposal.vehicle?.featureImage?.path"
                        :src="proposal.vehicle.featureImage.path"
                        size="small"
                        :densities="['small:1x', 'medium:2x']"
                        class="h-full w-full object-cover"
                      />
                      <img
                        v-else
                        src="/images/placeholder-image.jpg"
                        alt=""
                        class="h-full w-full object-cover"
                      >
                    </div>

                    <div class="min-w-0">
                      <p class="truncate text-sm font-bold text-gray-900">
                        {{ getProposalTitle(proposal) }}
                      </p>
                      <p v-if="getProposalSubtitle(proposal)" class="truncate text-sm font-bold text-gray-900">
                        {{ getProposalSubtitle(proposal) }}
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-col gap-3 md:w-auto md:min-w-0 md:flex-row md:items-center md:justify-end">
                    <UTooltip :text="getProposalLocation(proposal)">
                      <span class="truncate text-xs font-medium text-black md:max-w-44">
                        {{ getProposalLocation(proposal) }}
                      </span>
                    </UTooltip>

                    <span class="inline-flex w-fit items-center border border-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                      {{ getAvailabilityLabel(proposal.availability) }}
                    </span>

                    <span class="text-sm font-bold text-black md:min-w-28 md:text-right">
                      {{ formatProposalPrice(proposal.price) }}
                    </span>
                  </div>
                </div>
              </article>
            </div>

            <div v-else class="border border-gray-100 bg-gray-50 px-3 py-3 text-sm text-gray-700">
              Деталі пропозицій для цього запиту ще недоступні.
            </div>

            <div
              v-if="lead.status === LEAD_STATUS.Resolved"
              class="mt-4 border border-gray-100 bg-white px-3 py-3 text-base font-medium text-gray-950"
            >
              Вибір завершено. Вашу заявку на цей автомобіль було надіслано дилеру для подальшого зв’язку.
            </div>
          </template>
        </template>
      </div>
    </template>
  </UCollapsible>
</template>
