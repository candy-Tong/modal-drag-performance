import { ref, watch, watchEffect, computed, CSSProperties, Ref } from 'vue';
import { useDraggable } from '@vueuse/core';
export function useDragModal(modalRef: Ref<HTMLElement | undefined>) {
  const { x, y, isDragging, position } = useDraggable(modalRef);
  const startX = ref<number>(0);
  const startY = ref<number>(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;
    }
    startedDrag.value = true;
  });
  watch(isDragging, () => {
    if (!isDragging) {
      startedDrag.value = false;
    }
  });
  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value = x.value - startX.value;
      transformY.value = y.value - startY.value;
    }
  });
  const transformStyle = computed<CSSProperties>(() => ({
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  }));
  return {
    x: transformX,
    y: transformY,
    style: transformStyle,
    isDragging,
    position,
  };
}
