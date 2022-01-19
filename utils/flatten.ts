import {
  Fragment,
  createTextVNode,
  Comment,
  VNode,
  VNodeArrayChildren,
} from "vue";

export function flatten(
  vNodes: VNode[] | VNodeArrayChildren,
  filterCommentNode = true,
  result = []
): VNode[] {
  vNodes.forEach((vNode) => {
    if (vNode === null) return;
    if (typeof vNode !== "object") {
      if (typeof vNode === "string" || typeof vNode === "number") {
        result.push(createTextVNode(String(vNode)));
      }
      return;
    }
    if (Array.isArray(vNode)) {
      flatten(vNode, filterCommentNode, result);
      return;
    }
    if (vNode.type === Fragment) {
      if (vNode.children === null) return;
      if (Array.isArray(vNode.children)) {
        flatten(vNode.children, filterCommentNode, result);
      }
    } else if (vNode.type !== Comment) {
      result.push(vNode);
    }
  });
  return result;
}
