<script setup lang="ts">
import {getArticle} from "@/api/contents/article";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter} from "vue-router";
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
import {useBasicLayout} from "@/hooks/useBasicLayout";
import {copyToClip} from "@/utils/copy";
const { isMobile } = useBasicLayout();

const { params } = useRoute();
const { currentRoute } = useRouter();
const article = ref<Article>({});
const loading = ref(false);
const textRef = ref<HTMLElement>()

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

function addCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.parentElement?.nextElementSibling?.textContent
        if (code) {
          copyToClip(code).then(() => {
            btn.textContent = '复制成功'
            setTimeout(() => {
              btn.textContent = '复制代码'
            }, 1000)
          })
        }
      })
    })
  }
}

function removeCopyEvents() {
  if (textRef.value) {
    const copyBtn = textRef.value.querySelectorAll('.code-block-header__copy')
    copyBtn.forEach((btn) => {
      btn.removeEventListener('click', () => {})
    })
  }
}

onMounted(() => {
  addCopyEvents()
})

onUpdated(() => {
  addCopyEvents()
})

onUnmounted(() => {
  removeCopyEvents()
})

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
</script>

<template>
  <a-spin tip="文章内容获取中..." :spinning="loading" size="large" style="min-height: calc(100vh - 169px)">
    <a-card
        v-if="article.isVideo == 1"
        :bordered="false"
        style="margin-bottom: 15px"
        :bodyStyle="{
          padding: isMobile ? '15px' : '20px'
        }"
    >
      <bomaos-xg-player :config="config" @player="onPlayer"/>
    </a-card>
    <a-card
        :title="article.title"
        :bordered="false"
        :head-style="{
          padding: isMobile ? '0 15px' : '0 20px'
        }"
        :bodyStyle="{
          minHeight: loading ? 'calc(100vh - 169px)' : '200px',
          padding: isMobile ? '15px' : '20px'
        }"
    >
      <div ref="textRef">
        <div class="markdown-body" v-html="text"></div>
      </div>
    </a-card>
  </a-spin>
</template>

<style scoped>

</style>