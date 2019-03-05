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
        <script type="text/javascript">
        
        </script>
</head>
<body>
<div id="app" >
    <i-form ref="formInline" :model="formInline"  inline>
        <form-item  v-for="(item, index) in datasource" prop="user" :label="item.name">
            <i-input type="text" v-model="formInline[item.key]" :placeholder="item.name" />>
        </form-item>
        <i-button type="primary"  @click="print">打印</i-button>
    </i-form>
   

</div>
<script>
const datasource = HTMLDecode("{{ formField }}");
function HTMLDecode(text) { 
    var temp = document.createElement("div"); 
    temp.innerHTML = text; 
    var output = temp.innerText || temp.textContent; 
    temp = null; 
    return output; 
} 
new Vue({
  el: "#app",
  data: {
    visible: false,
    formInline: {
    },
    datasource:JSON.parse(datasource)
  },
  methods: {
    print: function() {
        console.log(this._data.formInline);
        const origin = window.location.origin
        $.ajax({
            type:"post",
            url:"/print",
            dataType:"json",
            data:this._data.formInline,
            success:function(res) {
               $("#app").append(" <iframe src='https://view.officeapps.live.com/op/view.aspx?src="+ origin + "/doc/target.doc" +"' width='1000px' height='100%' frameborder='1'></iframe>")
            }
        });
    }
  }
});
</script>
</body>
</html>