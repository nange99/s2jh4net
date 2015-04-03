var AdminPage=function(){var a=function(){$("[data-multiimage]").each(function(){var t=$(this);if(t.attr("multiimage-done")){return}if(t.attr("id")==undefined){t.attr("id","multiimage_id_"+new Date().getTime())}var u=t.attr("name");var c={width:"150",height:"150"};if(t.attr("data-multiimage-width")){c.width=t.attr("data-multiimage-width")}if(t.attr("data-multiimage-height")){c.height=t.attr("data-multiimage-height")}var e=t.attr("data-index-prop");Util.assertNotBlank(e,"缺少顺序属性设定");var j=t.closest("div.controls");var v=$('<div class="thumbnail thumbnail-'+t.attr("data-multiimage")+'" style="float:left; margin-right: 5px; width: '+c.width+'px"/>').appendTo(j);v.append(t);var n=t.attr("data-pk");if(n){var m=$('<input type="hidden" name="'+u.substring(0,u.indexOf("]"))+'].id" />');m.val(n);v.append(m);var h=$('<input type="hidden" name="'+u.substring(0,u.indexOf("]"))+'].extraAttributes.operation" />');h.val("update");v.append(h);var q=$('<input type="hidden" name="'+u.substring(0,u.indexOf("]"))+"]."+e+'" />');var g=Number(t.attr("data-index-val"));q.val(g);var d=j.attr("min-index");if(d==undefined){d=1000}d=Number(d);if(g<d){j.attr("min-index",g)}var k=j.attr("pk-count");if(k==undefined){k=0}j.attr("pk-count",Number(k)+1);v.append(q)}else{var q=$('<input type="hidden"  name="'+u.substring(0,u.indexOf("]"))+"]."+e+'" />');var d=j.attr("min-index");if(d==undefined){d=1000}d=Number(d)-100;j.attr("min-index",d);q.val(d);v.append(q);if(t.attr("data-multiimage")=="btn"){t.attr("disabled",true);q.attr("disabled",true)}}var i=function(){var w=j.attr("pk-count");if(w==undefined){w=0}j.find("> .thumbnail-edit").each(function(){var x=$(this);if(x.find("input[name$='.id']").size()==0){x.find("input").each(function(){var z=$(this);var y=z.attr("name");if(y){z.attr("name",y.substring(0,y.indexOf("[")+1)+w+y.substring(y.indexOf("]"),y.length))}});w++}})};var f=$('<div class="div-add-img" style="line-height: '+c.height+'px; background-color: #EEEEEE; text-align: center;"/>');f.append('<p style="margin:0px"><button class="btn btn-large" type="button">点击上传图片</button></p>');var o=$('<div class="caption" style="height: 15px;padding-top:0px;cursor: crosshair">');var l=$('<a class="btn-add pull-right" style="cursor: pointer;" title="点击上传图片"><i class="fa fa-plus"></i></a>');var b=$('<a class="btn-view" style="cursor: pointer;"  title="查看原始图片"><i class="fa fa-picture-o"></i></a>');var p=$('<a class="btn-remove pull-right"  style="cursor: pointer;" title="点击移除图片"><i class="fa fa-minus"></i></a>');var r=t.val();if(r==undefined||r==""){f.appendTo(v);o.appendTo(v);o.append(l)}else{if(IMAGE_URL_PREFIX){v.append('<img src="'+IMAGE_URL_PREFIX+r+'" style="cursor: pointer; width: '+c.width+"px; height: "+c.height+'px;" />')}else{v.append('<img src="'+r+'" style="cursor: pointer; width: '+c.width+"px; height: "+c.height+'px;" />')}o.appendTo(v);o.append(b);o.append(p)}j.css("min-height",(Number(c.height)+50)+"px");j.append(j.find(".thumbnail-btn"));var s=KindEditor.editor({allowFileManager:false});j.sortable({items:".thumbnail",stop:function(y,z){var w=1000;var x=$(z.item);x.parent().find("input[name$='"+e+"']").each(function(A,B){$(this).val(w);w-=100})}});v.delegate("div.div-add-img, a.btn-add","click",function(){s.loadPlugin("multiimage",function(){s.plugin.multiImageDialog({showRemote:false,clickFn:function(w){KindEditor.each(w,function(x,z){var y=$('<input type="hidden" name="'+u+'" data-multiimage="edit"  data-index-prop="'+e+'" />');y.val(z.md5);v.before(y);a()});i();s.hideDialog()}})})});v.delegate("img","click",function(){s.loadPlugin("image",function(){s.plugin.imageDialog({showRemote:false,clickFn:function(y,B,z,w,x,C){var A=y;if(IMAGE_URL_PREFIX){A=y.split(IMAGE_URL_PREFIX)[1]}t.val(A);if(v.find("img").length==0){f.hide();v.prepend('<img src="'+y+'" style="cursor: pointer; width: '+c.width+"; height: "+c.height+';" />');o.empty();o.append(b);o.append(p)}else{v.find("img").attr({src:y})}s.hideDialog()}})})});v.delegate("a.btn-remove","click",function(){var w=$(this).closest(".thumbnail");if(w.find("input[name$='.id']").size()>0){w.find("input[name$='.extraAttributes.operation']").val("remove");w.hide()}else{w.remove();i()}});v.delegate("a.btn-view","click",function(){window.open(v.find("img").attr("src"),"_blank")});t.attr("multiimage-done",true)})};return{initAjaxBeforeShow:function(b){if(b==undefined){b=$("body")}$("#btn-profile-param").hide();a();$("[data-profile-param]:not([data-profile-param-done])",b).each(function(){var e=$(this);e.attr("data-profile-param-done",true);var g=e.attr("data-profile-param");var c=e.closest(".controls");var j="data-profile-param-done"+g;if(c.attr(j)){return}c.attr(j,true);var i=e.closest("form").find("input[name='id']").val();var h=e.val();if(i.length==0&&(h==undefined||h=="")){var d=Global.findUserProfileParams(g);if(d){if(e.is('[type="radio"]')){c.find('[type="radio"][value="'+d+'"]').attr("checked",true)}else{e.val(d);if(e.is("select")){e.select2()}}}}var f=$("#btn-profile-param");c.add(e).mouseenter(function(){f.toggle();f.position({my:"right center",at:"left center",of:c});f.off();f.click(function(){var l=[];var k={};c.find("[data-profile-param]").each(function(){var o;var n=$(this);if(n.is('[type="radio"]')){o=c.find(":checked").val()}else{o=n.val()}var m=n.attr("data-profile-param");l.push(m);k[m]=o});k.codes=l.join(",");f.ajaxPostURL({url:WEB_ROOT+"/profile/simple-param-val!doSave",success:function(){$.each(l,function(m,n){Global.setUserProfileParams(n,k[n])});f.hide()},confirmMsg:false,data:k})})})});$('input[data-toggle="treeselect"]',b).each(function(){var c=$(this);c.treeselect()});$('[data-toggle="dropdownselect"]',b).each(function(){var f=$(this);var e=$('<i class="fa fa-times"></i>').insertBefore(f);var c=$('<i class="fa fa-angle-double-down btn-toggle"></i>').insertBefore(f);var h=f.parent().children();h.wrapAll('<div class="input-icon right"></div>');e.click(function(){h.val("")});f.attr("autocomplete","off");var d=f.closest(".panel-content");var g=$('<div class="container-dropdownselect container-callback" style="display : none;background-color: white;border: 1px solid #CCCCCC;"></div>');if(d.size()>0){g.appendTo(d)}else{g.appendTo($("body"))}if(f.attr("data-minWidth")){g.css("min-width",f.attr("data-minWidth"))}f.add(f.parent().find("i.btn-toggle")).click(function(){var m=0;var i=0;if(d.size()>0){m=d.offset().left;i=d.offset().top}var l=f.offset();g.css({width:f.outerWidth(),position:"absolute",left:(l.left-m)+"px",top:(l.top-i)+f.outerHeight()+"px"});g.data("callback",f.data("data-dropdownselect-callback"));g.slideToggle("fast");var k=f.parent().find("i.btn-toggle");if(k.hasClass("fa-angle-double-down")){k.removeClass("fa-angle-double-down");k.addClass("fa-angle-double-up")}else{k.addClass("fa-angle-double-down");k.removeClass("fa-angle-double-up")}if(g.is(":empty")){var j=f.attr("data-url");if(f.attr("data-selected")){if(j.indexOf("?")>-1){j=j+"&selected="+f.attr("data-selected")}else{j=j+"?selected="+f.attr("data-selected")}}g.ajaxGetUrl(j)}});$(document).on("mousedown",function(j){var i=f.parent("div");if(!(i.is(j.target)||i.find(j.target).length||g.is(j.target)||g.find(j.target).length)){g.hide()}})});$("[data-singleimage]").each(function(){var l=$(this);if(l.attr("singleimage-done")){return}if(l.attr("id")==undefined){l.attr("id","singleimage_id_"+new Date().getTime())}var m={width:"150px",height:"150px"};if(l.attr("data-singleimage-width")){m.width=l.attr("data-singleimage-width")}if(l.attr("data-singleimage-height")){m.height=l.attr("data-singleimage-height")}var g=l.closest("div.form-group").children("div");var c=$('<div class="thumbnail" style=" width: '+m.width+'"/>').appendTo(g);var d=$('<div class="div-add-img" style="line-height: '+m.height+'; background-color: #EEEEEE; text-align: center;"/>');d.append('<p><button class="btn btn-large" type="button">点击上传图片</button></p>');var k=$('<div class="caption" style="height: 15px;padding-top:0px">');var e=$('<a class="btn-add pull-right" style="cursor: pointer;" title="点击上传图片"><i class="fa fa-plus"></i></a>');var j=$('<a class="btn-view" style="cursor: pointer;"  title="查看原始图片"><i class="fa fa-picture-o"></i></a>');var f=$('<a class="btn-remove pull-right"  style="cursor: pointer;" title="点击移除图片"><i class="fa fa-minus"></i></a>');var h=l.val();if(h==undefined||h==""){d.appendTo(c);k.appendTo(c);k.append(e)}else{if(IMAGE_URL_PREFIX){c.append('<img src="'+IMAGE_URL_PREFIX+h+'" style="cursor: pointer; width: '+m.width+"; height: "+m.height+';" />')}else{c.append('<img src="'+h+'" style="cursor: pointer; width: '+m.width+"; height: "+m.height+';" />')}k.appendTo(c);k.append(j);k.append(f)}var i=KindEditor.editor({allowFileManager:false});c.delegate("div.div-add-img, a.btn-add , img","click",function(){i.loadPlugin("image",function(){i.plugin.imageDialog({showRemote:false,clickFn:function(p,s,q,n,o,t){var r=p;if(IMAGE_URL_PREFIX){r=p.split(IMAGE_URL_PREFIX)[1]}l.val(r);if(c.find("img").length==0){d.hide();c.prepend('<img src="'+p+'" style="cursor: pointer; width: '+m.width+"; height: "+m.height+';" />');k.empty();k.append(j);k.append(f)}else{c.find("img").attr({src:p})}i.hideDialog()}})})});c.delegate("a.btn-remove","click",function(){l.val("");c.find("img").remove();if(c.find("div.div-add-img").length==0){c.prepend(d)}else{d.show()}k.empty();k.append(e)});c.delegate("a.btn-view","click",function(){window.open(c.find("img").attr("src"),"_blank")});l.attr("singleimage-done",true)});$("a.btn-fileinput-trigger",b).each(function(){var g=$(this);var f=g.attr("data-pk");var e=g.attr("data-category");var c=g.attr("data-readonly");if(f&&f.trim()!=""){var d=g.attr("data-url");g.ajaxJsonUrl(Util.AddOrReplaceUrlParameter(d,"id",f),function(j){var k=$('<table role="presentation" class="table table-striped table-filelist clearfix"><tbody class="files"></tbody></table>').insertAfter(g);var i=k.find("tbody.files");i.append(tmpl("template-download",j));if(BooleanUtil.toBoolean(c)){i.find("td.td-op").remove();g.remove()}})}if(!BooleanUtil.toBoolean(c)){var h=$('<input type="hidden" name="_attachment_'+e+'"  value="" />').insertBefore(g)}});$(".nav[data-active-index]").each(function(){var d=$(this);var c=d.attr("data-active-index");if(c==undefined||c==""){return}var e=d.find("li:not(.tools)").index(d.find("li.active"));if(c!=e){d.find("li:not(.tools):eq("+c+") > a").click()}});$("a.x-editable",b).each(function(){var c=$(this);var d=c.attr("data-url");if(d==undefined){d=c.closest("form").attr("action")}var f=c.attr("data-pk");if(f==undefined){f=c.closest("form").find("input[name='id']").val()}var g=c.attr("data-original-title");if(g==undefined){g="数据修改"}var e=c.attr("data-placement");if(e==undefined){e="top"}Util.assertNotBlank(d);Util.assertNotBlank(f);c.editable({url:d,pk:f,title:g,placement:e,params:function(h){h.id=f;h[h.name]=h.value;return h},validate:function(h){var i=c.attr("data-required");if(i=="true"){if($.trim(h)==""){return"数据不能为空"}}},success:function(){if(c.hasClass("editable-bpm-task-transfer")){$("#layout-nav .btn-close-active").click();$(".ajaxify-tasks").ajaxGetUrl($(".ajaxify-tasks").attr("data-url"))}}})});$("div.scroller",b).each(function(){var c;if($(this).attr("data-height")){c=$(this).attr("data-height")}else{c=$(this).css("height")}$(this).slimScroll({size:"7px",color:($(this).attr("data-handle-color")?$(this).attr("data-handle-color"):"#a1b2bd"),railColor:($(this).attr("data-rail-color")?$(this).attr("data-rail-color"):"#333"),position:"right",height:c,alwaysVisible:($(this).attr("data-always-visible")=="true"?true:false),railVisible:($(this).attr("data-rail-visible")=="true"?true:false),wheelStep:5,disableFadeOut:true})});if($.fn.dropdownHover){$('[data-hover="dropdown"]',b).dropdownHover()}},initAjaxAfterShow:function(d){if(d==undefined){d=$("body")}var e=$(".nav-tabs",d);if(e.size()>0){var c=null;var b=e.find("li:not(.tools):not(.dropdown).active");if(b.size()>0){c=e.index("li:not(.tools):not(.dropdown).active")}if(c==null){var c=e.attr("data-active");if(c&&c!=""){c=Number(c)}else{c=0}}e.find("li:not(.tools):not(.dropdown):eq("+c+")").find("> a").click()}$("button:not([type])",d).each(function(){$(this).attr("type","button")});$('.form-body .row[data-equal-height!="false"]',d).each(function(){var f=0;var g=$(this).find(" > div > .form-group > div, > .form-group > div");g.each(function(){var h=$(this).innerHeight();if(h>f){f=h}});g.css("min-height",f)});$("div[data-chart]",d).each(function(){var g=$(this);var j=g.attr("id");if(j==undefined){j="chart_"+new Date().getTime();g.attr("id",j)}var i=g.attr("data-chart");if(i=="plot"){$.plot(g,g.data("plotData"),g.data("plotOptions"))}else{if(i=="echarts"){var f=echarts.init(document.getElementById(j));var h=g.data("echartsOptions");if(h){h.title=$.extend(true,{x:"center",y:"bottom"},h.title||{});$.each(h.series,function(k,l){if(l.type=="bar"){h.series[k]=$.extend(true,{itemStyle:{normal:{color:function(n){var m=["#97B552","#D87A80","#5AB1EF","#B6A2DE","#E5CF0D"];return m[n.dataIndex]}}}},l)}});f.setOption(h)}else{alert("Undefined Echarts Options")}}}});$(".full-calendar",d).each(function(){$(this).fullCalendar($(this).data("fullCalendarOptions"))});$(".gmaps-baidu",d).each(function(){var g=$(this);var j=g.attr("id");if(j==undefined){j="map_baidu_id_"+new Date().getTime();g.attr("id",j)}var h=new BMap.Map(j);h.centerAndZoom("北京市",12);h.enableScrollWheelZoom();h.enableContinuousZoom();h.addControl(new BMap.NavigationControl());var i=new BMap.Geocoder();g.bind("mapLocate",function(l,k){i.getPoint(k,function(m){if(m){h.clearOverlays();h.panTo(m);var n=new BMap.Marker(m);h.addOverlay(n);n.setAnimation(BMAP_ANIMATION_BOUNCE);return m}},"北京市")});var f=g.attr("data-init-location");if(f&&f!=""){setTimeout(function(){g.trigger("mapLocate",f)},2000)}h.addEventListener("click",function(l){var k=l.point;i.getLocation(k,function(m){var n=m.addressComponents;m.fullAddress=n.province+n.city+n.district+n.street+n.streetNumber;g.trigger("mapClick",m)})})})},doSomeStuff:function(){myFunc()}}}();