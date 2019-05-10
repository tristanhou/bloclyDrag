<!--渲染模版-->
<template>
<div style="display: flex; align-items:center">
  <div>
    <div><button @click="toShowJs">show code</button><button @click="toRunJs">run code</button></div>
    <div></div>
    <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
  </div>
  <div style="background: url(./static/image/750_1334_dev.png) center center no-repeat; height: 702px; min-width: 410px; position: relative">
    <div style="background-color: white; height: 534px; width: 302px;position:absolute;left:55px;top:84px;z-index:9999">
		<draggable group="people" style="height:100%; width:100%; overflow:auto" :list="buttonList" @clone="cloneButton">
			<div v-for="(item, index) in buttonList" :key="index" style="margin:10px">
				<van-button type="info" size="large">{{item.name}} {{item.key}}</van-button>
				<van-field placeholder="请输入"  v-if="item.index"/>
			</div>
		</draggable>
		<!-- <draggable group="person" style="100px; width:100%; overflow:auto" :list="labelList">
			<div v-for="(item, index) in labelList" :key="index" style="margin:10px">
				 <van-field placeholder="请输入" />
			</div>
		</draggable> -->
    </div>
  </div>
  <div style="background：red; height: 702px;width: 210px; border: 1px solid #eee; padding: 10px 10px;">
		<!-- <draggable  @clone="cloneLabel" :group="{ name: 'person', pull: 'clone', put: false }" :list="button">
			<van-field placeholder="请输入" style="height:40px" />
		</draggable> -->
		<draggable :group="{ name: 'people',  pull: 'clone', put: false }" :style="{marginTop: 10 + 'px'}" :list="button">
			<van-button type="info" size="large">按钮</van-button>
		</draggable>
  </div>
  <toolbox></toolbox>
</div>
</template>

<!--样式描述-->
<style scoped>
  h1 {
    color: red;
  }
</style>

<!--组件逻辑-->
<script>
  import draggable from 'vuedraggable'
  import toolbox from '_c/toolbox'
  import { getUniqueId } from '@/libs/untils'
  export default {
    data() {
        return {
			buttonList: [],
			button: [{ name: "cat 5", id: 5, key: 'index' },{ name: "cat 5", id: 5, key: 'home' }],
			label: [{ name: "cat 5", id: 5, key: 'home' }],
            labelList: [],
            item: ['http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'],
            msg: 'johnhuu',
            demoWorkspace: null,
            latestCode: null,
            idGlobal: 0,
            text: 'hello world'
        }
    },
    components: {
        draggable,
        toolbox
    },
    mounted () {
          var that = this
          Blockly.Blocks['say'] = {
            init: function() {
              this.appendDummyInput()
                  .appendField("say")
                  .appendField(new Blockly.FieldTextInput("hello"), "say_content");
              this.setPreviousStatement(true, null);
              this.setNextStatement(true, null);
              this.setColour(230);
              this.setTooltip("");
              this.setHelpUrl("");
            }
          };
          Blockly.JavaScript['say'] = function(block) {
              var text_say_content = block.getFieldValue('say_content').toString();
              // TODO: Assemble JavaScript into code variable.
            //   var code = `console.log(this.text)`;
              var code = `this.buttonList.push({name:'johnhuu', id:123})`;
              return code;
          };
          this.demoWorkspace = Blockly.inject('blocklyDiv',  {media: './static/media/', toolbox: document.getElementById('toolbox')});
    },
    methods: {
      toShowJs () {
          debugger
          console.log(Blockly.WorkspaceSvg)
          this.latestCode = Blockly.JavaScript.workspaceToCode(this.demoWorkspace);
          // document.getElementById('codeBox').innerHTML = this.latestCode
      },
      onStart () {
        debugger
      },
      onAdd (e,l) {
        debugger
      },
      cloneButton (eee) {
		  debugger
		// let id = getUniqueId()
		 return {
        id: 3,
        name: `cat 1`
      }
        // this.buttonList.push({
		// 	uniqueId: getUniqueId(),
        //   	id: id,
        //   	name: `button ${id}`
        // })
      },
      cloneLabel() {
		 return {
        id: 3,
        name: `cat 1`
      }
	  },
	  onEnd () {
		  debugger
	  },
      toRunJs () {
        try {
          debugger
          eval(this.latestCode)
        }
        catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
