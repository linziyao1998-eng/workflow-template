<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
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
        <button type="button" @click="count += 1">增加</button>
        <button type="button" :disabled="count === 0" @click="count = 0">重置</button>
      </div>
      <p class="hint">计数仅保存在当前页面，刷新后归零。</p>
    </section>
  </main>
</template>
