<script setup lang="ts">
import {getArticle} from "@/api/contents/article";
import {useRoute, useRouter} from "vue-router";
import {Article} from "@/api/contents/article/model";
import MarkdownIt from 'markdown-it';
import mdKatex from '@traptitech/markdown-it-katex';
import mila from 'markdown-it-link-attributes';
import hljs from 'highlight.js';
import '@/styles/lib/style.less';
import 'katex/dist/katex.min.css';
import '@/styles/lib/tailwind.css';
import '@/styles/lib/highlight.less';
import '@/styles/lib/github-markdown.less';
import type Player from "xgplayer";
import BomaosXgPlayer from "@/plugin/bomaos-xg-player/index";

const { params } = useRoute();
const { currentRoute } = useRouter();
const article = ref<Article>({});
const loading = ref(false);

const mdi = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    const validLang = !!(language && hljs.getLanguage(language))
    if (validLang) {
      const lang = language ?? ''
      return highlightBlock(hljs.highlight(code, { language: lang }).value, lang)
    }
    return highlightBlock(hljs.highlightAuto(code).value, '')
  },
})

mdi.use(mila, { attrs: { target: '_blank', rel: 'noopener' } })
mdi.use(mdKatex, { blockClass: 'katexmath-block rounded-md p-[10px]', errorColor: ' #cc0000' })

const text = computed(() => {
  const value = article.value.content ?? ''
  return mdi.render(value)
})

function highlightBlock(str: string, lang?: string) {
  return `<pre class="code-block-wrapper"><div class="code-block-header"><span class="code-block-header__lang">${lang}</span><span class="code-block-header__copy">复制代码</span></div><code class="hljs code-block-body ${lang}">${str}</code></pre>`
}

const config = reactive({
  id: 'demoPlayer1',
  lang: 'zh-cn',
  fluid: true,
  // 视频地址
  url: '',
  // 封面
  poster: '',
  // 开启倍速播放
  playbackRate: [0.5, 1, 1.5, 2],
  // 开启画中画
  pip: true
});

// 视频播放器二是否实例化完成
const ready = ref(false);

// 视频播放器一实例
let player1: Player;

/* 播放器一渲染完成 */
const onPlayer = (player: Player) => {
  player1 = player;
  player1.on('play', () => {
    ready.value = true;
  });
};

/**
 * 获取文章内容
 * @param id
 */
const query = (id?: number) => {
  if (id) {
    loading.value = true;
    getArticle(id).then((d) => {
      article.value = d;
      if (d.isVideo == 1) {
        config.url = d.videoUrl as string;
        config.poster = d.videoCover as string;
      }
      loading.value = false;
    }).catch((error) => {
      loading.value = false;
    })
  }
}

/* 初始化数据 */
onMounted(() => {
  query(params.id as unknown as number);
})

watch(currentRoute, (route) => {
  query(route.params.id as unknown as number);
})
</script>

<template>
  <a-spin tip="文章内容获取中..." :spinning="loading" size="large" :bodyStyle="{ minHeight: 'calc(100vh - 225px)' }">
    <a-card v-if="article.isVideo == 1" :bordered="false" style="margin-bottom: 15px">
      <bomaos-xg-player :config="config" @player="onPlayer" />
    </a-card>
    <a-card :title="article.title" :bordered="false" :bodyStyle="{ minHeight: '200px' }">
      <div class="markdown-body" v-html="text"></div>
    </a-card>
  </a-spin>
</template>

<style scoped>

</style>