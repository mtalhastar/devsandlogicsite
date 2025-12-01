"use strict";(()=>{var e={};e.id=409,e.ids=[409],e.modules={3480:(e,r,t)=>{e.exports=t(5600)},5377:(e,r,t)=>{t.r(r),t.d(r,{config:()=>d,default:()=>p,routeModule:()=>m});var n={};t.r(n),t.d(n,{default:()=>l});var s=t(3480),o=t(8667),a=t(6435);let i=require("nodemailer");var u=t.n(i);async function l(e,r){if("POST"!==e.method)return r.setHeader("Allow",["POST"]),r.status(405).json({message:`Method ${e.method} Not Allowed`});let{name:t,email:n,phone:s,company:o,message:a}=e.body;if(!t||!n||!a)return r.status(400).json({message:"Bad Request",error:"Name, email, and message are required."});let i=u().createTransport({service:"gmail",auth:{user:process.env.GMAIL_EMAIL,pass:process.env.GMAIL_APP_PASSWORD}}),l={from:`"${t}" <${n}>`,replyTo:n,to:process.env.CONTACT_FORM_RECEIVE_EMAIL,subject:`New Contact Form Submission from ${t}${o?` (${o})`:""}`,text:`Name: ${t}
Email: ${n}
Phone: ${s||"N/A"}
Company: ${o||"N/A"}
Message: ${a}`,html:`
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${t}</p>
        <p><strong>Email:</strong> <a href="mailto:${n}">${n}</a></p>
        <p><strong>Phone:</strong> ${s||"N/A"}</p>
        <p><strong>Company:</strong> ${o||"N/A"}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 10px; border-radius: 4px;">${a}</p>
      </div>
    `};try{return await i.sendMail(l),r.status(200).json({message:"Email sent successfully!"})}catch(e){return console.error("Error sending email:",e),r.status(500).json({message:"Error sending email",error:e.message||"Internal Server Error"})}}let p=(0,a.M)(n,"default"),d=(0,a.M)(n,"config"),m=new s.PagesAPIRouteModule({definition:{kind:o.A.PAGES_API,page:"/api/contact",pathname:"/api/contact",bundlePath:"",filename:""},userland:n})},5600:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},6435:(e,r)=>{Object.defineProperty(r,"M",{enumerable:!0,get:function(){return function e(r,t){return t in r?r[t]:"then"in r&&"function"==typeof r.then?r.then(r=>e(r,t)):"function"==typeof r&&"default"===t?r:void 0}}})},8667:(e,r)=>{Object.defineProperty(r,"A",{enumerable:!0,get:function(){return t}});var t=function(e){return e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE",e.IMAGE="IMAGE",e}({})}};var r=require("../../webpack-api-runtime.js");r.C(e);var t=r(r.s=5377);module.exports=t})();