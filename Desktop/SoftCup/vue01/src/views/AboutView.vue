<template>
  <div style="position: absolute;width: 100%;">
    <div id="toolbar-container"></div>
    <div id="editor-container" style="height: 600px;"></div>
  </div>
</template>
<style scoped>
#toolbar-container {
  
}
</style>

<script>
import qs from "qs";
import { createEditor, createToolbar } from "@wangeditor/editor";
const editorConfig = {};

// 工具栏配置
const toolbarConfig = {
  excludeKeys: ["insertVideo", "fullScreen", "codeBlock", "bgColor", "color","group-image"],
};

export default {
  name: "teleeditor",
  methods: {
    createEditor() {
      editorConfig.placeholder = '请输入内容';

// 工具栏配置

// 创建编辑器
      const editor = createEditor({
        selector: '#editor-container',
        config: editorConfig,
        mode: 'default' // 或 'simple' 参考下文
      });
// 创建工具栏
      const toolbar = createToolbar({
        editor,
        selector: '#toolbar-container',
        config: toolbarConfig,
        mode: 'simple' // 或 'simple' 参考下文
      });
    }
  },
  mounted() {
    this.createEditor();
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>