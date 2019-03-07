<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>iview example</title>
    <link rel="stylesheet" type="text/css" href="http://unpkg.com/iview/dist/styles/iview.css">
    <script type="text/javascript" src="http://vuejs.org/js/vue.min.js"></script>
    <script type="text/javascript" src="http://unpkg.com/iview/dist/iview.min.js"></script>
    <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
    <script type="text/javascript" src="http://www.xdocin.com/xdoc.js"></script>
    <style>
.form-box {
  width: 300px;
  display: inline-block;
  vertical-align: top;
}
#app {
  padding: 40px;
}
.inner-line {
  display: inline-block;
  vertical-align: top;
}
</style>
</head>
<body>
<div id="app" >
    <div class="form-box">
        <Card style="width:300px">
            <p slot="title">
                <Icon type="ios-film-outline"></Icon>
                关键字
            </p>    
            <i-form ref="formInline" :model="formInline" label-position="right" :label-width="50" inline>
                <div v-for="(item, index) in datasource">
                    <form-item  prop="user" :label="item.name">
                        <i-input type="text" v-model="formInline[item.key]" :placeholder="item.name" />>
                    </form-item>
                </div>  
            </i-form>
        </Card>
    </div>
    <div class="inner-line" style="margin: 80px 20px 0px 20px;">
        <i-button type="primary"  @click="print">查看文档</i-button>
    </div>
    <div class="inner-line">
        <iframe v-if="priviewUrl" :src="priviewUrl" width='900px' height='1000px' frameborder='1'></iframe>
    </div>

     <Drawer
            title="设置模版和字段"
            v-model="value3"
            width="720"
            :mask-closable="false"
            :styles="styles"
        >
    <form action="/upload?_csrf={{ ctx.csrf |  safe }}" method="post" enctype="multipart/form-data">
    <ul>
      <li><input name="file" type="file" placeHolder="请选择模版"/></li>
    
      
    <div id="cs" name="edit" style="height:200px;width:600px;border:solid 1px black" contenteditable="true">{{ FORM_FILED }}</div>
    
 </li>  
 <li><input type="button" @click="upload" value="上传" /></li>
      
    </ul>
  </form>
    </Drawer>
    <i-button size="large" v-if="showEditBtn" @click="show" type="primary">修改模版</i-button>
</div>
<script>
window.location.se;
const datasource =
  localStorage.getItem("FORM_FILED") || HTMLDecode("{{ FORM_FILED }}");
function HTMLDecode(text) {
  var temp = document.createElement("div");
  temp.innerHTML = text;
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
var match = window.location.search.match(/fanxinqi/);
new Vue({
  el: "#app",
  data: {
    visible: false,
    formInline: {},
    formData: [],
    datasourceStr: datasource,
    datasource: JSON.parse(datasource),
    priviewUrl: "",
    split1: 0.5,
    value3: false,
    showEditBtn: match && match.length > 0,
    styles: {
      height: "calc(100% - 55px)",
      overflow: "auto",
      paddingBottom: "53px",
      position: "static"
    }
  },

  methods: {
    show() {
      this.value3 = true;
    },
    upload() {
      var formData = new FormData();
      formData.append("formJson", $("#cs").html());
      localStorage.setItem("FORM_FILED", $("#cs").html());
      // Attach file
      formData.append("file", $("input[type=file]")[0].files[0]);
      console.log(formData);
      $.ajax({
        url: "/upload?_csrf=" + getCsrf(),
        data: formData,
        method: "POST",
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        success: function(result) {
          window.location.reload();
        },
        error: function(responseStr) {
          alert("error", responseStr);
        }
      });
      function getCsrf() {
        var keyValue = document.cookie.match("(^|;) ?csrfToken=([^;]*)(;|$)");
        return keyValue ? keyValue[2] : null;
      }
    },
    print: function() {
      const origin = window.location.origin;
      const self = this;
      $.ajax({
        type: "post",
        url: "/print",
        dataType: "json",
        data: this._data.formInline,
        success: function(res) {
          let now = new Date().getTime();
          self.priviewUrl =
            "https://view.officeapps.live.com/op/view.aspx?src=" +
            origin +
            "/public/doc/target.doc?t=" +
            now;
        }
      });
    }
  }
});
</script>
</body>
</html>