<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDragModal } from './use-drag-modal';

const columns = [
  {
    title: 'A',
    dataIndex: 'a',
    width: 150,
    align: 'center',
  },
  {
    title: 'B',
    dataIndex: 'b',
    align: 'center',
  },
  {
    title: 'C',
    dataIndex: 'c',
    width: 120,
    align: 'center',
  },
  {
    title: 'D',
    dataIndex: 'd',
    width: 150,
    align: 'center',
  },
  {
    title: 'E',
    dataIndex: 'e',
    width: 140,
    align: 'center',
  },
];

const tableData = ref(
  Array.from({ length: 20 }).map(() => ({
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
  }))
);

const visible = ref(false);
function showModal() {
  visible.value = true;
}
defineExpose({
  showModal,
});

const modalTitleRef = ref();
const { style } = useDragModal(modalTitleRef);
</script>

<template>
  <a-modal v-model:visible="visible" width="1100px">
    <template #title>
      <div ref="modalTitleRef" style="width: 100%; cursor: move">弹窗</div>
    </template>
    <template #modalRender="{ originVNode }">
      <div :style="style">
        <component :is="originVNode" />
      </div>
    </template>
    <a-table
      :columns="columns"
      :data-source="tableData"
      bordered
      :pagination="false"
      :scroll="{ y: '650px' }"
      size="small"
    >
      <template #bodyCell="{ record, column, text, index }">
        <template v-if="column.dataIndex === 'a'">
          <div>
            <a-input v-model:value="tableData[index].a"></a-input>
          </div>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>
