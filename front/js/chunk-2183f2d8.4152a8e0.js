(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2183f2d8"],{1474:function(t,e,a){"use strict";a.r(e);var n=a("7a23"),c=Object(n["D"])("data-v-1322142c");Object(n["t"])("data-v-1322142c");var r={class:"news_container"},s=Object(n["h"])("div",{class:"area"},[Object(n["h"])("div",{class:"content"},[Object(n["g"])("载入中，"),Object(n["h"])("br"),Object(n["g"])("请稍候……")])],-1),o={class:"title"},i={class:"stamp"},u={ref:"content",class:"content"},d={class:"backer"};Object(n["r"])();var b=c((function(t,e,a,c,b,f){var l=Object(n["x"])("FootMark");return Object(n["q"])(),Object(n["d"])(n["a"],null,[Object(n["h"])("div",r,[Object(n["h"])("div",{class:"mask",show:!b.loaded},[s],8,["show"]),Object(n["h"])("div",o,Object(n["z"])(b.title),1),Object(n["h"])("div",i,Object(n["z"])(b.stamp),1),Object(n["h"])("div",u,null,512),Object(n["h"])("div",d,[Object(n["h"])("a",{onClick:e[1]||(e[1]=function(){return f.backHome&&f.backHome.apply(f,arguments)})},"< 返回 >")])]),Object(n["h"])(l)],64)})),f=a("1da1"),l=(a("96cf"),a("3904")),j={name:"News",components:{FootMark:l["a"]},data:function(){return{loaded:!1,title:"",stamp:""}},methods:{backHome:function(){this.$router.push({path:"/"})}},mounted:function(){var t=this;return Object(f["a"])(regeneratorRuntime.mark((function e(){var a,n,c,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(t.loaded=!1,a=t.$route.params,n=a.type,c=a.id,n&&c){e.next=4;break}return e.abrupt("return");case 4:return e.next=6,BackEnd.getNewsInfo(n,c);case 6:if(r=e.sent,t.loaded=!0,r){e.next=10;break}return e.abrupt("return");case 10:t.title=r.title,t.$refs.content.innerHTML=r.content,t.stamp=stamp2string(r.stamp);case 13:case"end":return e.stop()}}),e)})))()},unmounted:function(){}};a("7e4d");j.render=b,j.__scopeId="data-v-1322142c";e["default"]=j},3904:function(t,e,a){"use strict";var n=a("7a23"),c=Object(n["D"])("data-v-71eb554a");Object(n["t"])("data-v-71eb554a");var r={class:"footmark"};Object(n["r"])();var s=c((function(t,e){return Object(n["q"])(),Object(n["d"])("div",r,"© Copyright @ Head Tax Firm. All Rights Reserved.")}));a("7791");const o={};o.render=s,o.__scopeId="data-v-71eb554a";e["a"]=o},7791:function(t,e,a){"use strict";a("f4a8")},"7e4d":function(t,e,a){"use strict";a("f66f")},f4a8:function(t,e,a){},f66f:function(t,e,a){}}]);
//# sourceMappingURL=chunk-2183f2d8.4152a8e0.js.map