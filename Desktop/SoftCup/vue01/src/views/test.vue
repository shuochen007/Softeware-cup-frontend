<template>
  <div class="edit" style="padding: 0;margin: 0;">
    <Rain v-if = "oneflag" :key = "1" style="z-index: -1; opacity: 0.9;"></Rain>
    <Star v-if = "twoflag" :key = "2" style="z-index: -1; opacity: 0.9;"></Star>
    
<!--顶部栏-->
    <div id = "head">
      <div class="top-bar">
        <div class="box-top">
          <ul class="top-ui">
            <li>
              <a href="/"><img src="../assets/logo.png" style="top:3px" alt=""></a>
            </li>
            <li>
              <div id = "clear" class="headTitle" @click = "clearText()">清空</div>
            </li>
            <li>
              <el-upload id="in"
                         action="/"
                         ref="upload"
                         accept=".txt"
                         :before-upload="beforeUpload">
              <div class="headTitle">导入</div></el-upload>
            </li>
            <li>
              <div id = "out" class="headTitle" @click = "outText()">导出</div>
            </li>
            <li>
              <div id = "main"  class="headTitle">
                <select id = "finalone" name="selectList" @change="configData()" size="1" style="outline:none; background: none; border: none; font-size: 21px;color: white" class = "final">
                  <option class="none-g" >星空</option>
                  <option class="none-g" >雨林</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div id="all">
      <div id = "box-button">
        <button class="button-user">生成关键词</button>
        <button class="button-user">生成摘要</button>
      </div>  
      <div id="inputArea">
<!--        <div class = "titleTip"><h2>待处理文本</h2></div>-->
        <textarea id="textarea" placeholder="请输入文章内容"></textarea>
      </div>
      <div id="titleArea">
        <el-card class="box-card" style="text-align: left;opacity: 0.8;background-color: RGBA(0,0,0,0)">
          <div id="haha" style="height: 100%;overflow: auto;position: absolute;color: white;margin-top: -10px;margin-left: -10px">
            <span style="font-weight: bolder;color: white">标题:</span>
            {{titleReturn}}
          </div>
        </el-card>
      </div>
      <div id = "keyArea">
        <el-card class="box-card" style="text-align: left;opacity: 0.8;background-color: RGBA(0,0,0,0)">
          <div style="height: 100%;overflow: auto;position: absolute;color: white;margin-top: -10px;margin-left: -10px">
            <span style="font-weight: bolder;">关键词:</span>
<!--            <span style="margin-left: 20px;color: white">{{titleReturn}}</span>-->
            {{keyReturn}}
          </div>
        </el-card>
      </div>
      <div id="abstractArea">
        <el-card class="box-card1" style="text-align: left;opacity: 0.8;background-color: RGBA(0,0,0,0)">
          <div style="height: 100%;overflow: auto;position: absolute;color: white;margin-top: -10px;margin-left: -10px">
            <span style="font-weight: bolder;color: white">摘要:</span>
<!--            <span style="margin-left: 20px;color: white">{{titleReturn}}</span>-->
            {{abstractReturn}}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>


<script>
import Rain from '@/components/Rain.vue'
import Star from '@/components/Star.vue'
export default {
  name: 'test',
  components: {
    Rain,
    Star,
  },
  data () {
    var oneflag = true;
    var twoflag = false;
    return {
      oneflag,
      twoflag,
      input: '',
      titleReturn: '哈哈哈哈哈哈哈哈哈哈哈',
      keyReturn: '哈哈哈哈哈哈哈哈哈哈哈',
      abstractReturn: '哈哈哈哈哈哈哈哈哈哈哈',
      textData: '',
      fileList:[],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  beforeCreate() {
    // 读取文件
    FileReader.prototype.reading = function ({encode} = pms) {
      let bytes = new Uint8Array(this.result);    //无符号整型数组
      let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
      return text;
    };
    /* 重写readAsBinaryString函数 */
    FileReader.prototype.readAsBinaryString = function (f) {
      if (!this.onload)       //如果this未重写onload函数，则创建一个公共处理方式
        this.onload = e => {  //在this.onload函数中，完成公共处理
          let rs = this.reading();
          console.log(rs);
        };
      this.readAsArrayBuffer(f);  //内部会回调this.onload方法
    };
  },
  methods: {
    configData() {
      var  Sel=document.getElementById("finalone");
      var index=Sel.selectedIndex ;             // selectedIndex是所选中的项的index
      var useing = Sel.options[index].text;
      console.log(useing);
      if(useing === "星空") {
        this.star();
      }
      else 
        this.rain();
    },
    async star() {
      this.oneflag = true;
      this.twoflag = false;
      this.$forceUpdate();
      console.log(this.oneflag)
      
    },
    async rain() {
      this.oneflag = false;
      this.twoflag = true;
      this.$forceUpdate();
      console.log(this.twoflag)
    },
    autoTextarea(elem, extra, maxHeight) {
      extra = extra || 0;
      var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
          isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
          addEvent = function (type, callback) {
            elem.addEventListener ?
                elem.addEventListener(type, callback, false) :
                elem.attachEvent('on' + type, callback);
          },
          getStyle = elem.currentStyle ? function (name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
              var rect = elem.getBoundingClientRect();
              return rect.bottom - rect.top -
                  parseFloat(getStyle('paddingTop')) -
                  parseFloat(getStyle('paddingBottom')) + 'px';
            }

            return val;
          } : function (name) {
            return getComputedStyle(elem, null)[name];
          },
          minHeight = parseFloat(getStyle('height'));

      elem.style.resize = 'none';

      var change = function () {
        var scrollTop, height,
            padding = 0,
            style = elem.style;

        if (elem._length === elem.value.length) return;
        elem._length = elem.value.length;

        if (!isFirefox && !isOpera) {
          padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
        }

        scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        elem.style.height = minHeight + 'px';
        if (elem.scrollHeight > minHeight) {
          if (maxHeight && elem.scrollHeight > maxHeight) {
            height = maxHeight - padding;
            style.overflowY = 'auto';
          } else {
            height = elem.scrollHeight - padding;
            style.overflowY = 'hidden';
          }
          style.height = height + extra + 'px';
          scrollTop += parseInt(style.height) - elem.currHeight;
          document.body.scrollTop = scrollTop;
          document.documentElement.scrollTop = scrollTop;
          elem.currHeight = parseInt(style.height);
        }
      };

      addEvent('propertychange', change);
      addEvent('input', change);
      addEvent('focus', change);
      change();
    },
    clearText() {
      this.input = document.getElementById("textarea").value;
      console.log(this.input);
      document.getElementById("textarea").value="";
    },
    beforeUpload(file) {
      this.fileList = [file]
      console.log('选择了文件beforeUpload')
      // 读取数据
      this.read(file);
      return false
    },
    read(f) {
      let rd = new FileReader();
      rd.onload = e => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        let cont = rd.reading({encode: 'UTF-8'});
        console.log(cont);
        document.getElementById("textarea").value=cont;
        let  formerData = this.textData;
        this.textData = formerData + "\n" + cont;
      };
      rd.readAsBinaryString(f);

    },
    outText() {
      this.input = document.getElementById("textarea").value;
      let str = new Blob([this.input], {type: 'text/plain;charset=utf-8'});
      saveAs(str, `message.txt`);
    }
  },
  mounted() {
    var text = document.getElementById("textarea");
    this.autoTextarea(text,2,550)// 调用
  }
}
</script>


<style>
.none-g {
  background: black;
  border: none;
}
.final:hover {
  background: none;
}
.topclick {
  height: 50px;
  width: 100px;
  position:relative;
  display:inline-block;
  margin-top: -100px;
}

.ltbox1 {
  width: 100px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;        /*鼠标指针经过*/
}
.ltbox2{
  width: 100px;
  height: 150px;
  margin-top: 2px;
  border-radius: 10px;
  background-color: white;
  position:absolute;
  display: none;        /*使下拉菜单栏消失*/
}

.li1{
  margin-top: 10px;
}
.ltbox2 li{
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
  display: block;        /*使下拉菜单栏显示*/
}
.ltbox2 li:hover{
  background-color:#E8E8E8;
}

.topclick:hover .ltbox2{
  display: block;
}
#main:hover {
  background-color: #55aaff;
}
#clear:hover {
  background-color: #55aaff;
}
#in:hover {
  background-color: #55aaff;
}
#out:hover {
  background-color: #55aaff;
}

.box-card {
  height: 80px;
}

.box-card1 {
  height: 200px;
}

#box-button {
  position: relative;
  float: left;
  top: 10px;
  left: 20px;
  width: 100%;
  backdrop-filter: blur(20px);
}
.button-user {
  background-color:greenyellow;
  color:black;
  width:200px;
  height: 47px;
  border:0;
  font-size: 16px;
  border-radius: 30px;
  position: relative;
  float: left;
  left: 50px;
  margin-right: 50px;
  top: 25px;
  backdrop-filter: blur(20px);
}
.button-user:hover{
  background-color: white;
}
#head {
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 100;
  margin-top: -20px;
  padding: 0;
}
.headTitle {
  color: white;
  height: 38px;
  font-size: 22px;
  position: relative;
  padding-top: 7px;
  z-index: 9998;
}
.edit {
  position: absolute;
  margin: 0;
  padding: 0;
  width: 1690px;
  height: 800px;
}
#textarea {
  display: block;
  overflow: hidden;
  line-height: 24px;
  padding:2px;
  opacity: 1;
  margin-top: 80px;
  position: relative;
  width: 75%;
  height: 100%;
  font-size:19px;
  color: white;
  background: black;
}

textarea {
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 0 8px rgba(82, 168, 236, 0.9);
  resize:none;
}
.titleTip {
  margin-top: 80px;
  position: relative;
  float: left;
  width: 20%;
}
#all {
  width: 1450px;
  min-height: 90%;
  opacity: 0.5;
  position: relative;
  float: left;
  left: 120px;
  top: 68px;
  margin-right: 50px;
  border: 1px bisque;
  z-index: 100;
  background: black;
}
#inputArea {
  width: 800px;
  height: 450px;
  opacity: 1;
  position: relative;
  float: left;
  left: 75px;
  border: 2px black;
}
#textareOne {
  opacity: 1;
  margin-top: 80px;
  position: relative;
  width: 75%;
  height: 100%;
  font-size:19px;
  color: white;
  background: black;
}

#titleArea {
  display: block;
  overflow: hidden;
  line-height: 24px;
  padding:2px;
  opacity: 1;
  position: relative;
  width: 500px;
  height: 80px;
  font-size:19px;
  color: white;
  top: 80px;
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}

#keyArea {
  position: relative;
  float: left;
  width: 500px;
  top: 120px;
  display: block;
  overflow: hidden;
  line-height: 24px;
  padding:2px;
  opacity: 1;
  height: 80px;
  font-size:19px;
  color: white;
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}

#abstractArea {
  position: relative;
  float: left;
  width: 500px;
  top: 165px;
  height: 200px;
  display: block;
  overflow: hidden;
  line-height: 24px;
  padding:2px;
  opacity: 1;
  font-size:19px;
  color: white;
  outline: 0 none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 8px rgba(82, 168, 236, 0.6);
}
.top-bar {
  width: 100%;
  height: 50px;
  margin: 0;
  display: flex;
}
.box-top {
  width: 100%;
  min-width: 1350px;
  background-color: black;
  opacity: 0.8;
  padding: 20px;
  height: 30px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 9998;
  
}
.top-ui {
  width: 100%;
  min-width: 800px;
  height: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.top-ui li{
  width:10%;
  min-width: 50px;
  margin:-5px 50px 0 70px;
  float: left;
  text-align: center;
  display: block;
}
.top-ui a{
  color: black;
  text-decoration: none;
}
.top-ui a:hover{
  color: white;
}
.top-ui img{
  height: 40px;
  margin: 0;
  padding: 0;
  display: inline;
  position: relative;
  top: -10px;
}
</style>