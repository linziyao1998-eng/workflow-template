<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
const previousCount = ref<number | null>(null)

function changeCount(nextCount: number) {
  if (nextCount === count.value) return
  previousCount.value = count.value
  count.value = nextCount
}

function undo() {
  if (previousCount.value === null) return
  count.value = previousCount.value
  previousCount.value = null
}
</script>
<template>
  <main>
    <p class="eyebrow">Vue · TypeScript · Codex</p>
    <h1>Workflow Template</h1>
    <p>从一个经过验证的小交互开始。</p>
    <section aria-labelledby="counter-title">
      <h2 id="counter-title">计数器示例</h2>
      <output aria-label="当前计数" aria-live="polite">{{ count }}</output>
      <div class="actions">
        <button type="button" @click="changeCount(Math.min(count + 1, 10))">增加</button>
        <button type="button" :disabled="count === 0" @click="changeCount(count - 1)">减少</button>
        <button type="button" :disabled="count === 0" @click="changeCount(0)">重置</button>
        <button type="button" :disabled="previousCount === null" @click="undo">撤销</button>
      </div>
      <p class="hint">计数仅保存在当前页面，刷新后归零。</p>
    </section>
  </main>
</template>
