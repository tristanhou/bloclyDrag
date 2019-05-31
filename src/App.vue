<!--渲染模版-->
<template>
<div style="display: flex; -webkit-align-items: center;justify-content:center;height:100vh">
	<div>
		<div><button @click="toShowJs">show code</button><button @click="toRunJs" style="margin-left:10px">run code</button></div>
		<br>
		<div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
		<br>
		<div><van-button type="info" size="large" ref="btn">按钮</van-button></div>
		<div id="codeBox"  style="height: 280px; width: 600px;" >
		</div>
	</div>
	<br>
	<!-- <div class="parents-box" >
		<div style=" height: 534px; width: 302px;position:absolute;left:55px;top:84px;z-index:9999" >
			<template v-for="(item, index) in dataList" > -->
				<!-- <van-button type="info" size="middle" v-draggable="item.options"  :class="item.class" style="position:absolute" :key="index">{{item.name}} {{item.key}}</van-button> -->
				<!-- <div :class="item.class" style="max-width:100%; max-height:170px;position:absolute;overflow:hidden" :key="index" v-draggable="item.options" :id="item.id">
					<img src="https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg" style="width:100%; height:100%;overflow:hidden"/>
				</div>
				
			</template>
		</div>
	</div>
	<div style="height: 702px;width: 210px; border: 1px solid #eee; padding: 10px 10px;" >
		<van-button type="info" size="large"    draggable="true" v-on:dragstart.native="drag($event)" id='draggable' style="">按钮</van-button>
			<buttonBox/>
	</div> -->
	<toolBox></toolBox>
</div>
</template>
<!--样式描述-->
<style scoped>
	h1 {
		color: red;
	}
	.parents-box {
		background: url(../public/image/750_1334_dev.png) center center no-repeat;
		position: relative;
		height: 702px; 
		min-width: 410px;
		
		/* background: url('./static/image/750_1334_dev.png') center center no-repeat;   */
	}
</style>

<!--组件逻辑-->
<script>
	import draggable from 'vuedraggable'
	import toolBox from '_c/toolbox'
	import buttonBox from '_c/buttons'
	import { getUniqueId } from '@/libs/untils'
	export default {
		data() {
			return {
				dataList: [{ name: "cat 5", id: 'cat5', key: 'index', class: 'cat5', options: {
					trigger: '.cat5',
					body: '.cat5',
					recover: true
				}},{ name: "cat 6", id: 'cat6', key: 'indexlist', class: 'cat6', options: {
					trigger: '.cat6',
					body: '.cat6',
					recover: true
				}}],
				options: {
					trigger: '.cat5',
					body: '.cat5',
					recover: true
				},
				label: [{ name: "cat 5", id: 5, key: 'home' }],
				labelList: [],
				item: ['http://fuss10.elemecdn.com/b/18/0678e57cb1b226c04888e7f244c20jpeg.jpeg'],
				msg: 'johnhuu',
				demoWorkspace: null,
				latestCode: null,
				idGlobal: 0,
				text: 'hello world',
				top: 0,
				left: 0
			}
		},
		components: {
			draggable,
			toolBox,
			buttonBox
		},
		mounted () {
			var that = this
	
			Blockly.Blocks['block_type'] = {
				init: function() {
					this.appendValueInput("NAME")
							.setCheck(null)
							.appendField("hello");
					this.setOutput(true, null);
					this.setColour(230);
					this.setTooltip("");
					this.setHelpUrl("");
				}
			};
			Blockly.JavaScript['block_type'] = function(block) {
				var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);
				// TODO: Assemble JavaScript into code variable.
				var code = `'ssssssw'`;
				// TODO: Change ORDER_NONE to the correct strength.
				return [code, Blockly.JavaScript.ORDER_NONE];
			};
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
					// var code = `console.log(this.text)`;
					var code = `this.buttonList.push({name:'johnhuu', id:123})`;
					var code = `this.$refs['btn'].addEventListener('click', alert(1))`;
					return code;
			};
			Blockly.Blocks['string_length'] = {
				init: function() {
					this.appendValueInput('VALUE')
							.setCheck('String')
							.appendField('length of');
					this.setOutput(true, 'Number');
					this.setColour(160);
					this.setTooltip('Returns number of letters in the provided text.');
					this.setHelpUrl('http://www.w3schools.com/jsref/jsref_length_string.asp');
				}
			};
			Blockly.JavaScript['string_length'] = function(block) {
				// String or array length.
				var argument0 = Blockly.JavaScript.valueToCode(block, 'VALUE',
						Blockly.JavaScript.ORDER_ATOMIC) || '\'\'';
						debugger
				return [argument0 + '.length', Blockly.JavaScript.ORDER_ATOMIC];
			};
			this.demoWorkspace = Blockly.inject('blocklyDiv',  {media:'../public/media/', toolbox: document.getElementById('toolbox')});
		},
		methods: {
			kill () {
				debugger
			},
			toShowJs () {
				debugger
				console.log(Blockly.WorkspaceSvg)
				this.latestCode = Blockly.JavaScript.workspaceToCode(this.demoWorkspace);
				document.getElementById('codeBox').innerHTML = this.latestCode
			},
			drop (evt) {
				evt.preventDefault();
				let type = evt.dataTransfer.getData("Text")
				switch (type) {
					case 'button':
					this.buttonList.push({ name: "cat 6", id: 6, key: 'index', class: 'cat6',
					options: {
						trigger: '.cat6',
						body: '.cat6',
						recover: true
					}})
				}
				let v = evt.dataTransfer.getData("button")
			
				var data=evt.dataTransfer.getData("Text");
				evt.target.appendChild(document.getElementById(data));
				debugger
			},
			drag (evt) {
			
				evt.dataTransfer.setData('Text', evt.target.id);
			},
			allowDrop (e) {
				e.preventDefault();
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
