$(function(){
    //获取目标iframe的contentWindow对象
    function getIframeWindow(){
        var _iframe = $("#editorBox").find("#reportIframe");
        if(_iframe.length){
            return _iframe[0].contentWindow;
        }else{
            return null;
        }
    }

    //对目标printInstance使用initJson进行初始化
    function initReportData(initJson){
        var targetWindow = getIframeWindow();
        if(targetWindow && targetWindow.printInstance){
            console.log(targetWindow);
            targetWindow.printInstance.initReportData(initJson);
        }
    }

    //根据url获取json数据；挂载新增的iframe
    function mountIframe(url){
        var $root = $("#editorBox");
        var $jsonEditor = $("#printTemplateBox #jsonText");

        if($root.length){
            $root.html("");
            $.get(url, function (result) {
                var src = "../static/report-vue.html";
                var _iframe = $("<iframe id='reportIframe'>");
                _iframe.attr("src",src);

                _iframe[0].onload = function(){//项目上使用的jquery不同于本地，故现在使用的onload。
                    initReportData(result);
                    $jsonEditor.val(JSON.stringify(result, null, 4));
                };

                _iframe.appendTo($root);
            });
        }else{
            alert("iframe无可挂载元素！");
        }
    }

    //新增打印模板【使用xx.json】
    $("#printTemplateBox #newReportTemplate").click(function(){
        var url = "../static/new-report.json";
        mountIframe(url);
    })

    //修改打印模板【使用report.json】
    $("#printTemplateBox #modifyReportTemplate").click(function(){
        var url = "../static/report.json";
        mountIframe(url);
    })

    //导出json数据【项目中会存储到数据库中】
    $("#printTemplateBox #exportReportData").click(function(){
        var targetWindow = getIframeWindow();
        if(targetWindow && targetWindow.printInstance){
            var $jsonEditor = $("#printTemplateBox #jsonText");
            var reportData = targetWindow.printInstance.exportReportData();
            console.log(reportData);
            var jsonStr = JSON.stringify(reportData);
            $jsonEditor.val(jsonStr);
        }
    })

    //查看最新reportData数据
    $("#printTemplateBox #showLatestReportData").click(function(){
        var targetWindow = getIframeWindow();
        if(targetWindow && targetWindow.printInstance){
            targetWindow.printInstance._showNewReportData();
        }
    })
})