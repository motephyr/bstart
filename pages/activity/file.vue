<template>
  <div>
    <div class="nuxtMainPanel ovh">
      <div id="hot"></div>
    </div>
    <div id="footerBar">
      <div class="ftBt" id="downBt"><i class="icon-file-excel-o"></i>下载樣板</div>
      <div class="ftBt"><i class="icon-file-excel-o"></i>修改上傳<input type="file" id="changeBt"/></div>
      <div class="ftBt" id="showDataBt"><i class="icon-checkmark5"></i>儲存</div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import _ from 'lodash'
  export default {
    data() {
      return {
        vuexData: this.$store.state
      };
    },
    watch: {
      'vuexData.yearPlaceId': {
        handler: function(newValue, oldValue) { // 可以获取新值与老值两个参数
          this.getData()
        }
      }
    },
    methods: {
      async getData() {
        var result = await axios.get('/api/activity_docs/' + this.$store.state.yearPlaceId)
        if (result.data.value) {
          alert(JSON.stringify(result.data.value))
        }
      }
    },
    created () {
      this.$store.dispatch('setIsTitle', {
        is_title: "活動表件"
      })
    },
    mounted: async function () {
      var self = this;
      this.getData()
      var utl = {};
      utl.Binary = {
        fixdata(data) {
          var o = "";var l = 0;var w = 10240;
          for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
        },
        s2ab(s) { //字符串转字符流
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
        }
      }
      utl.XLSX = {
        wb: null,
        rABS: false,
        import(f, c) {//导入根据文件
          this.wb = null;
          var reader = new FileReader();
          reader.onload = function (e) {
            var data = e.target.result;
            if (utl.XLSX.rABS) {
              utl.XLSX.wb = XLSX.read(btoa(utl.Binary.fixdata(data)), {//手动转化
                type: 'base64'
              });
            } else {
              utl.XLSX.wb = XLSX.read(data, {
                type: 'binary'
              });
            }
            if (c && typeof (c)) {
              c();
            }
          };
          if (utl.XLSX.rABS) {
            reader.readAsArrayBuffer(f);
          } else {
            reader.readAsBinaryString(f);
          }
        },
        onImport(obj, c) {//导入根据 input file标签
          if (!obj.files) {
            return;
          }
          this.import(obj.files[0], c);
        },
        getSheetsByIndex(index = 0) {//获取数据根据Sheets索引
          return XLSX.utils.sheet_to_json(this.wb.Sheets[this.wb.SheetNames[index]]);
        },
        getCharCol(n) {
          let temCol = ''; let s = ''; let m = 0;
          while (n > 0) {
            m = n % 26 + 1
            s = String.fromCharCode(m + 64) + s
            n = (n - m) / 26
          }
          return s
        },
        export(json, title, type) {//导出
          var keyMap = [];//获取keys
          for (var k in json[0]) {
            keyMap.push(k);
          }
          var tmpdata = [];//用来保存转换好的json
          json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? utl.XLSX.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
          }))).reduce((prev, next) => prev.concat(next)).forEach((v,i) => tmpdata[v.position] = {
            v: v.v
          });
          var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
          var tmpWB = {};
          title = title ? title : "mySheet";
          tmpWB.SheetNames = [title];
          tmpWB.Sheets = {};
          tmpWB.Sheets[title] = Object.assign({}, tmpdata, //内容
            {
              '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
            });
          return new Blob([utl.Binary.s2ab(XLSX.write(tmpWB,
            { bookType: (type === undefined ? 'xlsx' : type), bookSST: false, type: 'binary' }//这里的数据是用来定义导出的格式类型
          ))], { type: "" }); //创建二进制对象写入转换好的字节流
        },
        onExport(json, title, type) {//直接下载
//          utl.Download.byObj(this.export(json, title, type), "下载.xlsx");
          utl.Download.byObj(this.export(json, title, type), "下载.ods");
        }
      };
      utl.Download = {
        byURL(url, fileName) {//动态下载
          var tmpa = document.createElement("a");
          tmpa.download = fileName || "下载";
          tmpa.href = url; //绑定a标签
          tmpa.click(); //模拟点击实现下载
        },
        byObj(obj, fileName) {//内存二进制数据下载
          this.byURL(URL.createObjectURL(obj), fileName);
          setTimeout(function () { //延时释放
            URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
          }, 100);
        }
      }
      utl.Object = {
        reverse(obj) {//对象键值倒转
          var o = {};
          for (var k in obj) {
            o[obj[k]] = k;
          }
          return o;
        },
        deepCopy() {//深拷贝
          let temp = obj.constructor === Array ? [] : {}
          for (let val in obj) {
            temp[val] = typeof obj[val] === 'object' ? deepCopy(obj[val]) : obj[val];
          }
          return temp;
        },
        copyJson(o) { return JSON.parse(JSON.stringify(o)); }//拷贝JSON格式
      }

      const xHred = {
        "項次": "nb",
        "日期/時間": "date",
        "活動主題": "title",
        "活動內容": "activities",
        "活動對象": "object",
        "活動地點": "local",
        "承辦單位電話": "mobPhone"
      };
      const filterVal = {//<=====值转化
      };
      function impt(emt) {//<===导入
        utl.XLSX.onImport(emt, function () {
          var rt = utl.XLSX.getSheetsByIndex();//<===默认获取Sheet1
          // console.log(rt);
          var tmp = [];
          rt.forEach(function (value, index, array) {
            var t = {};
            for (var k in value) {
              t[xHred[k]] = value[k];
            }
            tmp.push(t);
          });
          hot.loadData(tmp);//<====将读取完成数据显示到handsontable
        });
      }
      function down() {//<===下载导出数据
        var d = utl.Object.copyJson(hot.getSourceData());//<=====读取handsontable的数据
        d.unshift(utl.Object.reverse(xHred));//<====追加到列头
        utl.XLSX.onExport(d);//<====导出
      }
      function showData() {//<====获取真实数据
        var tmp = [];
        hot.getSourceData().forEach(function (value, index, array) {
          var t = {};
          for (var k in value) {
            t[k] = filterVal[k] ? filterVal[k](value[k]) : value[k];//<====将xlsx数据转为实际需要的值
          }
          tmp.push(t);
        });
        /*
        *更多规则自己定义吧
        */
        axios.post('/api/activity_docs', {
          value: tmp,
          yearPlaceId: self.$store.state.yearPlaceId
        }).catch((e) => {
          console.log(e)
        })

        return tmp;
      }
      //----handsontable 初始化 开始------
      var hotElement = document.querySelector('#hot');//<====绑定handsontable初始化div
      var colHeaders = [];//<===handsontable列头显示值
      var cols = [];//<====handsontable列头显示值对应的实际字段与其他配置
      for (var key in xHred) {
        cols.push({ data: xHred[key] });
        colHeaders.push(key);
      }
      var hotSettings = {//<====handsontable的配置
        colHeaders: colHeaders,//当值为true时显示列头，当值为数组时，列头为数组的值
        data: [],//数据源
        columns: cols,//列具体配置
        // width: 906,
        autoWrapRow: true,
        // height: 641,
        // maxRows: 22,
        minRows: 1,
//        contextMenuCopyPaste: true,
//        contextMenuCopyPaste: {
//          swfPath: './js/ZeroClipboard.swf'
//        },
        // currentRowClassName：当前行样式的名称,
        // currentColClassName：当前列样式的名称,
        manualColumnResize: true,//当值为true时，允许拖动，当为false时禁止拖动
        manualRowResize: true,//当值为true时，允许拖动，当为false时禁止拖动
        stretchH: "all", //last:延伸最后一列,all:延伸所有列,none默认不延伸。
        manualColumnMove: false,// 当值为true时，列可拖拽移动到指定列
        manualRowMove: false,// 当值为true时，行可拖拽至指定行
        rowHeaders: true, //当值为true时显示行头，当值为数组时，行头为数组的值
        columnSorting: false,//允许排序
        sortIndicator: false,
        contextMenu: true,//显示右键菜单
        autoColumnSize: true //当值为true且列宽未设置时，自适应列大小
      }
      var hot = new Handsontable(hotElement, hotSettings);
//    var dfg = hotSettings={minRows: 30;}; Handsontable(hotElement, dfg);
      $("#changeBt").on("change", function () {
        impt(this);
      });
      $("#downBt").on("click", function () {
        down();
      });
      $("#showDataBt").on("click", function () {
        showData();
      });
    }
  }
</script>

<style>
    .nuxtMainPanel.ovh {
        overflow-y: hidden;
    }
    #hot{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        border: 0;
    }
    .handsontable .wtHider .wtSpreader table.htCore{
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0 2px 64px 1px rgba(0, 38, 65, 0.22);
    }
    .handsontable thead th .relative {
        /*padding: 2px 16px;*/
    }
    .htContextMenu table.htCore {
        border: 0 none;
        /*border-bottom-width: 2px;*/
        /*border-right-width: 2px;*/
    }
    .handsontable tr {
        background-color: rgb(255, 255, 255);
    }
    .htContextMenu table tbody tr td {
        color: #1E8F8B;
        padding: 5px;
    }
    .htContextMenu table tbody tr td.htDisabled {
        color: #C4C4C4;
        cursor: default;
    }
    .htContextMenu table tbody tr td:first-child {
        border: 0;
        transition: all .2s;
    }
    .htContextMenu table tbody tr td.htSeparator {
        border-top: 1px solid #E0E0E0;
        height: 0;
        padding: 0;
        cursor: default;
    }
    .htContextMenu table tbody tr td.current, .htContextMenu table tbody tr td.zeroclipboard-is-hover {
        background: #1E8F8B;
        color: #FFF;
    }
    .handsontable .htSubmenu :after {
        content: "\25B6";
        color: #97CBC6;
        position: absolute;
        right: 5px;
    }
    .handsontable .htDimmed {
        color: #B7B7B7;
    }
    table.htCore{

    }
    .handsontable thead th:first-child{
        cursor: se-resize;
    }
    .handsontable thead th{
        cursor: s-resize;
    }
    .handsontable tbody th{
        cursor: e-resize;
    }
    .handsontable tbody th.ht__highlight, .handsontable thead th.ht__highlight {
        background-color: #CFE5FF;
    }
    .handsontable.ht__selection--columns thead th.ht__highlight, .handsontable.ht__selection--rows tbody th.ht__highlight {
        background-color: #5495F4;
        color: #FFF;
    }
</style>

