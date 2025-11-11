<template>
    <div class="table-wrapper" :class="variantClass">
        <table class="custom-table">
            <thead>
                <tr>
                    <th
                        v-for="col in columns"
                        :key="col.key"
                        @click="col.sortable ? sort(col.key) : null"
                        :class="{ sortable: col.sortable, active: sortKey === col.key }"
                    >
                        {{ col.label }}
                        <span v-if="col.sortable" class="sort-icon">
                            {{ sortOrder === 'asc' && sortKey === col.key ? '▲' : sortKey === col.key ? '▼' : '' }}
                        </span>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
                    <td v-for="col in columns" :key="col.key">
                        <slot
                            :name="`cell-${col.key}`"
                            :value="row[col.key]"
                            :row="row"
                        >
                            {{ row[col.key] }}
                        </slot>
                    </td>
                </tr>
                <tr v-if="!sortedRows.length">
                    <td :colspan="columns.length" class="empty">데이터가 없습니다.</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    columns: { type: Array, required: true },
    rows: { type: Array, required: true },
    variant: {
        type: String,
        default: 'default', // default | striped | bordered | hover | compact
    },
})

const sortKey = ref('')
const sortOrder = ref('asc')

const sort = (key) => {
    if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortKey.value = key
        sortOrder.value = 'asc'
    }
}

const sortedRows = computed(() => {
    if (!sortKey.value) return props.rows
    return [...props.rows].sort((a, b) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]
        if (valA === valB) return 0
        if (sortOrder.value === 'asc') return valA > valB ? 1 : -1
        return valA < valB ? 1 : -1
    })
})

const variantClass = computed(() => `table-${props.variant}`)
</script>

<style scoped>
.table-wrapper {
    width: 100%;
    overflow-x: auto;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #333;
}

/* 공통 스타일 */
.custom-table th,
.custom-table td {
    padding: 10px 14px;
    border-bottom: 1px solid #e0e0e0;
    text-align: left;
    transition: background 0.2s;
}

.custom-table th.sortable {
    cursor: pointer;
    user-select: none;
}
.custom-table th.active {
    color: #1976d2;
}
.sort-icon {
    margin-left: 4px;
    font-size: 12px;
}

/* 빈 데이터 */
.empty {
    text-align: center;
    color: #777;
    padding: 20px 0;
}

/* ─────────────── VARIANTS ─────────────── */

/* 기본형 */
.table-default .custom-table {
    background: white;
}

/* 줄무늬형 */
.table-striped .custom-table tbody tr:nth-child(odd) {
    background: #fafafa;
}

/* 테두리형 */
.table-bordered .custom-table th,
.table-bordered .custom-table td {
    border: 1px solid #ddd;
}
.table-bordered .custom-table {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

/* hover 효과 */
.table-hover .custom-table tbody tr:hover {
    background: #f1f7ff;
}

/* compact (공간 절약형) */
.table-compact .custom-table th,
.table-compact .custom-table td {
    padding: 6px 10px;
    font-size: 13px;
}

/* 헤더 스타일 */
.custom-table thead {
    background: #f8f9fa;
    font-weight: 600;
}
</style>
