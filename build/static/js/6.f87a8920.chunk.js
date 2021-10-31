(this["webpackJsonpreact-complete-guide"]=this["webpackJsonpreact-complete-guide"]||[]).push([[6],{40:function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n(38),r=n.n(a),c=n(39),s=n(14),o=n(1),i=function(){var e=Object(o.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],i=Object(o.useState)(),u=Object(s.a)(i,2),l=u[0],d=u[1],j=Object(o.useCallback)(function(){var e=Object(c.a)(r.a.mark((function e(t){var n,c,s,o,i,u=arguments;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=u.length>1&&void 0!==u[1]?u[1]:"GET",c=u.length>2&&void 0!==u[2]?u[2]:null,s=u.length>3&&void 0!==u[3]?u[3]:{},a(!0),e.prev=4,e.next=7,fetch(t,{method:n,body:c,headers:s});case 7:return o=e.sent,e.next=10,o.json();case 10:if(i=e.sent,o.ok){e.next=13;break}throw new Error(i.mess);case 13:return a(!1),e.abrupt("return",i);case 17:throw e.prev=17,e.t0=e.catch(4),d(e.t0.message||"Something went wrong"),a(!1),e.t0;case 22:case"end":return e.stop()}}),e,null,[[4,17]])})));return function(t){return e.apply(this,arguments)}}(),[]);return{isLoading:n,error:l,sendRequest:j,clearError:function(){d(null)}}}},41:function(e,t,n){"use strict";n(1);var a=n(43),r=n(42),c=n.n(r),s=n(0);t.a=function(e){return Object(s.jsx)(a.a,{onCancel:e.onClear,header:"An Error Occurred!",show:!!e.error,footer:Object(s.jsx)("button",{className:c.a.edit,onClick:e.onClear,children:"Okay"}),children:Object(s.jsx)("p",{children:e.error})})}},42:function(e,t,n){e.exports={main:"Task_main__1S7O9",task:"Task_task__y_jar",p:"Task_p__3_LGx",button:"Task_button__2WaKy",edit:"Task_edit__1rpTY",delete:"Task_delete__1C-mw",cancel:"Task_cancel__395EH",values:"Task_values__3uKPV"}},43:function(e,t,n){"use strict";var a=n(46),r=n(1),c=n.n(r),s=n(18),o=n.n(s),i=n(67),u=(n(44),n(0)),l=function(e){return o.a.createPortal(Object(u.jsx)("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))},d=(n(45),function(e){var t=Object(u.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[Object(u.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:Object(u.jsx)("h2",{children:e.header})}),Object(u.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[Object(u.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),Object(u.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return o.a.createPortal(t,document.getElementById("modal-hook"))});t.a=function(e){return Object(u.jsxs)(c.a.Fragment,{children:[e.show&&Object(u.jsx)(l,{onClick:e.onCancel}),Object(u.jsx)(i.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:Object(u.jsx)(d,Object(a.a)({},e))})]})}},44:function(e,t,n){},45:function(e,t,n){},53:function(e,t,n){e.exports={main:"EditTask_main__1ZMpx",form:"EditTask_form__24V7-"}},62:function(e,t,n){"use strict";n.r(t);var a=n(38),r=n.n(a),c=n(39),s=n(14),o=n(1),i=n(2),u=n(11),l=n(41),d=n(40),j=n(19),b=n(53),h=n.n(b),p=n(0);t.default=function(e){var t=Object(i.g)(),n=Object(o.useContext)(u.a),a=Object(i.h)().taskId,b=Object(d.a)(),m=b.isLoading,O=b.error,f=b.sendRequest,k=b.clearError,x=Object(o.useState)(),v=Object(s.a)(x,2),_=v[0],g=v[1],C=Object(o.useState)(),T=Object(s.a)(C,2),y=T[0],w=T[1],E=Object(o.useState)(),N=Object(s.a)(E,2),S=N[0],I=N[1],P=Object(o.useState)(),A=Object(s.a)(P,2),B=A[0],F=A[1];Object(o.useEffect)((function(){var e=function(){var e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f("https://shreyash-task-manager-app.herokuapp.com"+"/tasks/".concat(a),"GET",null,{Authorization:"Bearer "+n.token});case 3:t=e.sent,F(t),g(t.title),w(t.description),I(t.status),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(0);case 12:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}();e()}),[f,a]);var D=function(){var e=Object(c.a)(r.a.mark((function e(c){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c.preventDefault(),e.prev=1,e.next=4,f("https://shreyash-task-manager-app.herokuapp.com"+"/tasks/".concat(a),"PATCH",JSON.stringify({title:_,description:y,status:S}),{Authorization:"Bearer "+n.token,"Content-Type":"application/json"});case 4:e.next=8;break;case 6:e.prev=6,e.t0=e.catch(1);case 8:t.push("/tasks/".concat(n.userId));case 9:case"end":return e.stop()}}),e,null,[[1,6]])})));return function(t){return e.apply(this,arguments)}}();return m&&j.a,B||O||setTimeout((function(){return Object(p.jsx)("div",{children:"Could not find the task"})}),5e3),Object(p.jsxs)("div",{children:[Object(p.jsx)(l.a,{error:O,onClear:k}),Object(p.jsxs)("div",{className:h.a.main,children:[m&&Object(p.jsx)(j.a,{asOverlay:!0}),!m&&B&&Object(p.jsxs)("form",{onSubmit:D,className:h.a.form,children:[Object(p.jsx)("p",{children:"Edit Task"}),Object(p.jsx)("label",{htmlFor:"taskName",children:"Task Name"}),Object(p.jsx)("input",{onChange:function(e){g(e.target.value)},value:_,id:"taskName",type:"text"}),Object(p.jsx)("label",{htmlFor:"description",children:"Task Description"}),Object(p.jsx)("textarea",{onChange:function(e){w(e.target.value)},value:y,id:"description",type:"text"}),Object(p.jsx)("label",{htmlFor:"status",children:"Task Status"}),Object(p.jsxs)("select",{onChange:function(e){I(e.target.value)},value:S,id:"status",children:[Object(p.jsx)("option",{value:"Incomplete",children:"Incomplete"}),Object(p.jsx)("option",{value:"Completed",children:"Completed"}),Object(p.jsx)("option",{value:"In Progress",children:"In Progress"})]}),Object(p.jsx)("button",{type:"submit",children:"Update Task"}),Object(p.jsx)("button",{type:"button",onClick:function(){t.push("/tasks/".concat(n.userId))},children:"Cancel"})]})]})]})}}}]);
//# sourceMappingURL=6.f87a8920.chunk.js.map