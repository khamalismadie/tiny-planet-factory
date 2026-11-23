import{w as V,R as Ze,D as ft,E as ia,a as uh,S as zt,B as Se,b as G,g as hr,G as cs,N as na,W as oa,T as L,c as Ae,d as aa,C as bt,e as dr,f as Fe,h as gt,i as vt,M as fr,j as it,k as Qs,U as ca,l as nt,p as la,m as pr,_ as di,n as ua,o as hh,q as ha,r as _t,s as jt,t as Pi,u as da,v as ze,P as ls,x as lt,y as dh,z as fh,A as ph,F as dt,H as Qe,I as gs,J as mh,K as gh,L as Mr,O as _h,Q as Je,V as fa,X as yh,Y as xh,Z as _s,$ as ke,a0 as Jt,a1 as bh,a2 as vh,a3 as Js,a4 as wh}from"./pixi-core-DXQFmL6O.js";var Sh=class{label;tracks;duration=0;constructor(e){this.label=e.label,this.tracks=e.tracks||[],this.duration=e.duration??this._getDuration()}_getDuration(){let e=0;for(let t=0;t<this.tracks.length;t++){const s=this.tracks[t],r=s.times[s.times.length-1];r>e&&(e=r)}return e}};function Z(e,t,s){return Math.max(t,Math.min(s,e))}var F=class pa{x=0;y=0;z=0;static get shared(){return ys.x=0,ys.y=0,ys.z=0,ys}constructor(t=0,s=0,r=0){this.x=t,this.y=s,this.z=r}set(t=0,s=t,r=t){return this.x=t,this.y=s,this.z=r,this}copyFrom(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}copyTo(t){return t.set(this.x,this.y,this.z),t}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}clone(){return new pa(this.x,this.y,this.z)}toString(){return`[@pixi/3d/math:Vector3 x=${this.x} y=${this.y} z=${this.z}]`}fromArray(t,s=0){return this.x=t[s],this.y=t[s+1],this.z=t[s+2],this}toArray(t=[],s=0){return t[s]=this.x,t[s+1]=this.y,t[s+2]=this.z,t}add(t,s=this){return s.x=this.x+t.x,s.y=this.y+t.y,s.z=this.z+t.z,s}subtract(t,s=this){return s.x=this.x-t.x,s.y=this.y-t.y,s.z=this.z-t.z,s}multiply(t,s=this){return s.x=this.x*t.x,s.y=this.y*t.y,s.z=this.z*t.z,s}multiplyScalar(t,s=this){return s.x=this.x*t,s.y=this.y*t,s.z=this.z*t,s}divide(t,s=this){return s.x=this.x/t.x,s.y=this.y/t.y,s.z=this.z/t.z,s}divideScalar(t,s=this){return this.multiplyScalar(1/t,s)}addScaledVector(t,s,r=this){return r.x=this.x+t.x*s,r.y=this.y+t.y*s,r.z=this.z+t.z*s,r}negate(t=this){return t.x=-this.x,t.y=-this.y,t.z=-this.z,t}min(t,s=this){return s.x=Math.min(this.x,t.x),s.y=Math.min(this.y,t.y),s.z=Math.min(this.z,t.z),s}max(t,s=this){return s.x=Math.max(this.x,t.x),s.y=Math.max(this.y,t.y),s.z=Math.max(this.z,t.z),s}clamp(t,s,r=this){return r.x=Z(this.x,t.x,s.x),r.y=Z(this.y,t.y,s.y),r.z=Z(this.z,t.z,s.z),r}normalize(t=this){const s=1/(Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)||1);return t.x=this.x*s,t.y=this.y*s,t.z=this.z*s,t}setLength(t,s=this){const r=t/(Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)||1);return s.x=this.x*r,s.y=this.y*r,s.z=this.z*r,s}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}magnitudeSquared(){return this.x*this.x+this.y*this.y+this.z*this.z}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const s=this.x-t.x,r=this.y-t.y,i=this.z-t.z;return s*s+r*r+i*i}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}angleTo(t){const s=Math.sqrt(this.magnitudeSquared()*(t.x*t.x+t.y*t.y+t.z*t.z));if(s===0)return Math.PI/2;const r=this.dot(t)/s;return Math.acos(Z(r,-1,1))}cross(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.x,a=t.y,c=t.z;return s.x=i*c-n*a,s.y=n*o-r*c,s.z=r*a-i*o,s}applyMatrix3(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.elements;return s.x=o[0]*r+o[3]*i+o[6]*n,s.y=o[1]*r+o[4]*i+o[7]*n,s.z=o[2]*r+o[5]*i+o[8]*n,s}applyMatrix4(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.elements,a=1/(o[3]*r+o[7]*i+o[11]*n+o[15]);return s.x=(o[0]*r+o[4]*i+o[8]*n+o[12])*a,s.y=(o[1]*r+o[5]*i+o[9]*n+o[13])*a,s.z=(o[2]*r+o[6]*i+o[10]*n+o[14])*a,s}applyAffineMatrix4(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.elements;return s.x=o[0]*r+o[4]*i+o[8]*n+o[12],s.y=o[1]*r+o[5]*i+o[9]*n+o[13],s.z=o[2]*r+o[6]*i+o[10]*n+o[14],s}applyQuaternion(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.x,a=t.y,c=t.z,l=t.w,u=l*r+a*n-c*i,h=l*i+c*r-o*n,d=l*n+o*i-a*r,f=-o*r-a*i-c*n;return s.x=u*l-f*o-h*c+d*a,s.y=h*l-f*a-d*o+u*c,s.z=d*l-f*c-u*a+h*o,s}transformDirection(t,s=this){const r=this.x,i=this.y,n=this.z,o=t.elements,a=o[0]*r+o[4]*i+o[8]*n,c=o[1]*r+o[5]*i+o[9]*n,l=o[2]*r+o[6]*i+o[10]*n,u=1/(Math.sqrt(a*a+c*c+l*l)||1);return s.x=a*u,s.y=c*u,s.z=l*u,s}setFromSpherical(t){const s=Math.sin(t.phi)*t.radius;return this.x=s*Math.sin(t.theta),this.y=Math.cos(t.phi)*t.radius,this.z=s*Math.cos(t.theta),this}setFromCylindrical(t){return this.x=t.radius*Math.sin(t.theta),this.y=t.y,this.z=t.radius*Math.cos(t.theta),this}setFromMatrixColumn(t,s){return this.fromArray(t.elements,s*4)}};const ys=new F;var E=class ma{elements;elements64;array=null;static multiplyAffineTo3x4(t,s,r,i,n,o){const a=r[i+0],c=r[i+1],l=r[i+2],u=r[i+4],h=r[i+5],d=r[i+6],f=r[i+8],p=r[i+9],m=r[i+10],_=r[i+12],g=r[i+13],b=r[i+14],y=n[o+0],v=n[o+1],x=n[o+2],w=n[o+4],T=n[o+5],B=n[o+6],S=n[o+8],C=n[o+9],D=n[o+10],I=n[o+12],M=n[o+13],P=n[o+14];t[s+0]=a*y+u*v+f*x,t[s+1]=a*w+u*T+f*B,t[s+2]=a*S+u*C+f*D,t[s+3]=a*I+u*M+f*P+_,t[s+4]=c*y+h*v+p*x,t[s+5]=c*w+h*T+p*B,t[s+6]=c*S+h*C+p*D,t[s+7]=c*I+h*M+p*P+g,t[s+8]=l*y+d*v+m*x,t[s+9]=l*w+d*T+m*B,t[s+10]=l*S+d*C+m*D,t[s+11]=l*I+d*M+m*P+b}static multiplyAffine(t,s,r,i,n,o){const a=r[i+0],c=r[i+1],l=r[i+2],u=r[i+4],h=r[i+5],d=r[i+6],f=r[i+8],p=r[i+9],m=r[i+10],_=r[i+12],g=r[i+13],b=r[i+14],y=n[o+0],v=n[o+1],x=n[o+2],w=n[o+4],T=n[o+5],B=n[o+6],S=n[o+8],C=n[o+9],D=n[o+10],I=n[o+12],M=n[o+13],P=n[o+14];t[s+0]=a*y+u*v+f*x,t[s+1]=c*y+h*v+p*x,t[s+2]=l*y+d*v+m*x,t[s+3]=0,t[s+4]=a*w+u*T+f*B,t[s+5]=c*w+h*T+p*B,t[s+6]=l*w+d*T+m*B,t[s+7]=0,t[s+8]=a*S+u*C+f*D,t[s+9]=c*S+h*C+p*D,t[s+10]=l*S+d*C+m*D,t[s+11]=0,t[s+12]=a*I+u*M+f*P+_,t[s+13]=c*I+h*M+p*P+g,t[s+14]=l*I+d*M+m*P+b,t[s+15]=1}static get shared(){return Ih.identity()}static get IDENTITY(){return Mh.identity()}constructor(t){this.elements=t||new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);const s=this.elements;this.elements64=new Float64Array(s.buffer,s.byteOffset,8)}set(t,s,r,i,n,o,a,c,l,u,h,d,f,p,m,_){const g=this.elements;return g[0]=t,g[1]=n,g[2]=l,g[3]=f,g[4]=s,g[5]=o,g[6]=u,g[7]=p,g[8]=r,g[9]=a,g[10]=h,g[11]=m,g[12]=i,g[13]=c,g[14]=d,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}isIdentity(){const t=this.elements;return t[0]===1&&t[1]===0&&t[2]===0&&t[3]===0&&t[4]===0&&t[5]===1&&t[6]===0&&t[7]===0&&t[8]===0&&t[9]===0&&t[10]===1&&t[11]===0&&t[12]===0&&t[13]===0&&t[14]===0&&t[15]===1}copyFrom(t){const s=this.elements,r=t.elements;return s[0]=r[0],s[1]=r[1],s[2]=r[2],s[3]=r[3],s[4]=r[4],s[5]=r[5],s[6]=r[6],s[7]=r[7],s[8]=r[8],s[9]=r[9],s[10]=r[10],s[11]=r[11],s[12]=r[12],s[13]=r[13],s[14]=r[14],s[15]=r[15],this}copyTo(t){const s=t.elements,r=this.elements;return s[0]=r[0],s[1]=r[1],s[2]=r[2],s[3]=r[3],s[4]=r[4],s[5]=r[5],s[6]=r[6],s[7]=r[7],s[8]=r[8],s[9]=r[9],s[10]=r[10],s[11]=r[11],s[12]=r[12],s[13]=r[13],s[14]=r[14],s[15]=r[15],t}equals(t){const s=this.elements,r=t.elements;return s[0]===r[0]&&s[1]===r[1]&&s[2]===r[2]&&s[3]===r[3]&&s[4]===r[4]&&s[5]===r[5]&&s[6]===r[6]&&s[7]===r[7]&&s[8]===r[8]&&s[9]===r[9]&&s[10]===r[10]&&s[11]===r[11]&&s[12]===r[12]&&s[13]===r[13]&&s[14]===r[14]&&s[15]===r[15]}clone(){return new ma().copyFrom(this)}toString(){const t=this.elements;return`[@pixi/3d/math:Matrix4 [${t[0]}, ${t[4]}, ${t[8]}, ${t[12]} | ${t[1]}, ${t[5]}, ${t[9]}, ${t[13]} | ${t[2]}, ${t[6]}, ${t[10]}, ${t[14]} | ${t[3]}, ${t[7]}, ${t[11]}, ${t[15]}]]`}fromArray(t,s=0){const r=this.elements;return r[0]=t[s],r[1]=t[s+1],r[2]=t[s+2],r[3]=t[s+3],r[4]=t[s+4],r[5]=t[s+5],r[6]=t[s+6],r[7]=t[s+7],r[8]=t[s+8],r[9]=t[s+9],r[10]=t[s+10],r[11]=t[s+11],r[12]=t[s+12],r[13]=t[s+13],r[14]=t[s+14],r[15]=t[s+15],this}toArray(t,s){this.array||(this.array=new Float32Array(16));const r=s||this.array,i=this.elements;return t?(r[0]=i[0],r[1]=i[4],r[2]=i[8],r[3]=i[12],r[4]=i[1],r[5]=i[5],r[6]=i[9],r[7]=i[13],r[8]=i[2],r[9]=i[6],r[10]=i[10],r[11]=i[14],r[12]=i[3],r[13]=i[7],r[14]=i[11],r[15]=i[15]):(r[0]=i[0],r[1]=i[1],r[2]=i[2],r[3]=i[3],r[4]=i[4],r[5]=i[5],r[6]=i[6],r[7]=i[7],r[8]=i[8],r[9]=i[9],r[10]=i[10],r[11]=i[11],r[12]=i[12],r[13]=i[13],r[14]=i[14],r[15]=i[15]),r}multiply(t,s=this){return Pr(this,t,s),s}premultiply(t,s=this){return Pr(t,this,s),s}multiplyMatrices(t,s,r=this){return Pr(t,s,r),r}multiplyScalar(t,s=this){const r=s.elements,i=this.elements;return r[0]=i[0]*t,r[4]=i[4]*t,r[8]=i[8]*t,r[12]=i[12]*t,r[1]=i[1]*t,r[5]=i[5]*t,r[9]=i[9]*t,r[13]=i[13]*t,r[2]=i[2]*t,r[6]=i[6]*t,r[10]=i[10]*t,r[14]=i[14]*t,r[3]=i[3]*t,r[7]=i[7]*t,r[11]=i[11]*t,r[15]=i[15]*t,s}append(t,s=this){return this.multiply(t,s)}prepend(t,s=this){return this.premultiply(t,s)}appendFrom(t,s,r=this){return this.multiplyMatrices(t,s,r)}determinant(){const t=this.elements,s=t[0],r=t[4],i=t[8],n=t[12],o=t[1],a=t[5],c=t[9],l=t[13],u=t[2],h=t[6],d=t[10],f=t[14],p=t[3],m=t[7],_=t[11],g=t[15];return p*(n*c*h-i*l*h-n*a*d+r*l*d+i*a*f-r*c*f)+m*(s*c*f-s*l*d+n*o*d-i*o*f+i*l*u-n*c*u)+_*(s*l*h-s*a*f-n*o*h+r*o*f+n*a*u-r*l*u)+g*(-i*a*u-s*c*h+s*a*d+i*o*h-r*o*d+r*c*u)}transpose(t=this){const s=this.elements,r=t.elements,i=s[0],n=s[1],o=s[2],a=s[3],c=s[4],l=s[5],u=s[6],h=s[7],d=s[8],f=s[9],p=s[10],m=s[11],_=s[12],g=s[13],b=s[14],y=s[15];return r[0]=i,r[1]=c,r[4]=n,r[2]=d,r[8]=o,r[5]=l,r[6]=f,r[9]=u,r[10]=p,r[3]=_,r[12]=a,r[7]=g,r[13]=h,r[11]=b,r[14]=m,r[15]=y,t}getInverse(t,s,r=this){const i=r.elements,n=t.elements,o=n[0],a=n[1],c=n[2],l=n[3],u=n[4],h=n[5],d=n[6],f=n[7],p=n[8],m=n[9],_=n[10],g=n[11],b=n[12],y=n[13],v=n[14],x=n[15],w=m*v*f-y*_*f+y*d*g-h*v*g-m*d*x+h*_*x,T=b*_*f-p*v*f-b*d*g+u*v*g+p*d*x-u*_*x,B=p*y*f-b*m*f+b*h*g-u*y*g-p*h*x+u*m*x,S=b*m*d-p*y*d-b*h*_+u*y*_+p*h*v-u*m*v,C=o*w+a*T+c*B+l*S;if(C===0){const I="Matrix4: .getInverse() can't invert matrix, determinant is 0";if(s===!0)throw new Error(I);return V(I),r.identity(),r}const D=1/C;return i[0]=w*D,i[1]=(y*_*l-m*v*l-y*c*g+a*v*g+m*c*x-a*_*x)*D,i[2]=(h*v*l-y*d*l+y*c*f-a*v*f-h*c*x+a*d*x)*D,i[3]=(m*d*l-h*_*l-m*c*f+a*_*f+h*c*g-a*d*g)*D,i[4]=T*D,i[5]=(p*v*l-b*_*l+b*c*g-o*v*g-p*c*x+o*_*x)*D,i[6]=(b*d*l-u*v*l-b*c*f+o*v*f+u*c*x-o*d*x)*D,i[7]=(u*_*l-p*d*l+p*c*f-o*_*f-u*c*g+o*d*g)*D,i[8]=B*D,i[9]=(b*m*l-p*y*l-b*a*g+o*y*g+p*a*x-o*m*x)*D,i[10]=(u*y*l-b*h*l+b*a*f-o*y*f-u*a*x+o*h*x)*D,i[11]=(p*h*l-u*m*l-p*a*f+o*m*f+u*a*g-o*h*g)*D,i[12]=S*D,i[13]=(p*y*c-b*m*c+b*a*_-o*y*_-p*a*v+o*m*v)*D,i[14]=(b*h*c-u*y*c-b*a*d+o*y*d+u*a*v-o*h*v)*D,i[15]=(u*m*c-p*h*c+p*a*d-o*m*d-u*a*_+o*h*_)*D,r}compose(t,s,r,i=this){const n=i.elements,o=s.x,a=s.y,c=s.z,l=s.w,u=o+o,h=a+a,d=c+c,f=o*u,p=o*h,m=o*d,_=a*h,g=a*d,b=c*d,y=l*u,v=l*h,x=l*d,w=r.x,T=r.y,B=r.z;return n[0]=(1-(_+b))*w,n[1]=(p+x)*w,n[2]=(m-v)*w,n[3]=0,n[4]=(p-x)*T,n[5]=(1-(f+b))*T,n[6]=(g+y)*T,n[7]=0,n[8]=(m+v)*B,n[9]=(g-y)*B,n[10]=(1-(f+_))*B,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,i}decompose(t,s,r,i=this){i!==this&&i.copyFrom(this);const n=i.elements,o=n[0],a=n[1],c=n[2],l=n[4],u=n[5],h=n[6],d=n[8],f=n[9],p=n[10];let m=Math.sqrt(o*o+a*a+c*c);const _=Math.sqrt(l*l+u*u+h*h),g=Math.sqrt(d*d+f*f+p*p);o*(u*p-h*f)-l*(a*p-c*f)+d*(a*h-c*u)<0&&(m=-m),t.x=n[12],t.y=n[13],t.z=n[14];const b=1/m,y=1/_,v=1/g,x=sn.elements;return x[0]=o*b,x[1]=a*b,x[2]=c*b,x[4]=l*y,x[5]=u*y,x[6]=h*y,x[8]=d*v,x[9]=f*v,x[10]=p*v,s.setFromRotationMatrix(sn),r.x=m,r.y=_,r.z=g,i}makeTranslation(t,s,r){return this.set(1,0,0,t,0,1,0,s,0,0,1,r,0,0,0,1)}makeScale(t,s,r){return this.set(t,0,0,0,0,s,0,0,0,0,r,0,0,0,0,1)}makeShear(t,s,r){return this.set(1,s,r,0,t,1,r,0,t,s,1,0,0,0,0,1)}makeRotationX(t){const s=Math.cos(t),r=Math.sin(t);return this.set(1,0,0,0,0,s,-r,0,0,r,s,0,0,0,0,1)}makeRotationY(t){const s=Math.cos(t),r=Math.sin(t);return this.set(s,0,r,0,0,1,0,0,-r,0,s,0,0,0,0,1)}makeRotationZ(t){const s=Math.cos(t),r=Math.sin(t);return this.set(s,-r,0,0,r,s,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(t,s){const r=Math.cos(s),i=Math.sin(s),n=1-r,o=t.x,a=t.y,c=t.z,l=n*o,u=n*a;return this.set(l*o+r,l*a-i*c,l*c+i*a,0,l*a+i*c,u*a+r,u*c-i*o,0,l*c-i*a,u*c+i*o,n*c*c+r,0,0,0,0,1)}makeRotationFromEuler(t){const s=this.elements,r=Math.cos(t.x),i=Math.sin(t.x),n=Math.cos(t.y),o=Math.sin(t.y),a=Math.cos(t.z),c=Math.sin(t.z),l=r*a,u=r*c,h=i*a,d=i*c;return s[0]=n*a,s[4]=-n*c,s[8]=o,s[1]=u+h*o,s[5]=l-d*o,s[9]=-i*n,s[2]=d-l*o,s[6]=h+u*o,s[10]=r*n,s[3]=0,s[7]=0,s[11]=0,s[12]=0,s[13]=0,s[14]=0,s[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Dh,t,Bh)}makePerspective(t,s,r,i){const n=this.elements,o=1/Math.tan(t/2);if(n[0]=o/s,n[1]=0,n[2]=0,n[3]=0,n[4]=0,n[5]=o,n[6]=0,n[7]=0,n[8]=0,n[9]=0,n[11]=-1,n[12]=0,n[13]=0,n[15]=0,i!==void 0&&i!==1/0){const a=1/(r-i);n[10]=(i+r)*a,n[14]=2*i*r*a}else n[10]=-1,n[14]=-2*r;return this}makeOrthographic(t,s,r,i,n,o){const a=this.elements,c=1/(t-s),l=1/(i-r),u=1/(n-o);return a[0]=-2*c,a[1]=0,a[2]=0,a[3]=0,a[4]=0,a[5]=-2*l,a[6]=0,a[7]=0,a[8]=0,a[9]=0,a[10]=2*u,a[11]=0,a[12]=(t+s)*c,a[13]=(r+i)*l,a[14]=(o+n)*u,a[15]=1,this}lookAt(t,s,r,i=this){i!==this&&i.copyFrom(this);const n=xs,o=Th,a=Ch,c=i.elements;return a.x=t.x-s.x,a.y=t.y-s.y,a.z=t.z-s.z,a.magnitudeSquared()===0&&(a.z=1),a.normalize(),n.copyFrom(r).cross(a),n.magnitudeSquared()===0&&(Math.abs(r.z)===1?a.x+=1e-4:a.z+=1e-4,a.normalize(),n.copyFrom(r).cross(a)),n.normalize(),o.copyFrom(a).cross(n),c[0]=n.x,c[4]=o.x,c[8]=a.x,c[1]=n.y,c[5]=o.y,c[9]=a.y,c[2]=n.z,c[6]=o.z,c[10]=a.z,i}setPosition(t,s=this){s!==this&&s.copyFrom(this);const r=s.elements;return r[12]=t.x,r[13]=t.y,r[14]=t.z,s}scale(t,s=this){s!==this&&s.copyFrom(this);const r=s.elements,i=t.x,n=t.y,o=t.z;return r[0]*=i,r[4]*=n,r[8]*=o,r[1]*=i,r[5]*=n,r[9]*=o,r[2]*=i,r[6]*=n,r[10]*=o,r[3]*=i,r[7]*=n,r[11]*=o,s}extractPosition(t){const s=this.elements;return t.set(s[12],s[13],s[14]),t}extractScale(t){const s=this.elements;return t.set(Math.sqrt(s[0]*s[0]+s[1]*s[1]+s[2]*s[2]),Math.sqrt(s[4]*s[4]+s[5]*s[5]+s[6]*s[6]),Math.sqrt(s[8]*s[8]+s[9]*s[9]+s[10]*s[10])),t}extractBasis(t,s,r,i=this){return i!==this&&i.copyFrom(this),t.setFromMatrixColumn(i,0),s.setFromMatrixColumn(i,1),r.setFromMatrixColumn(i,2),i}makeBasis(t,s,r){return this.set(t.x,s.x,r.x,0,t.y,s.y,r.y,0,t.z,s.z,r.z,0,0,0,0,1)}extractRotation(t,s=this){const r=s.elements,i=t.elements,n=1/xs.setFromMatrixColumn(t,0).magnitude(),o=1/xs.setFromMatrixColumn(t,1).magnitude(),a=1/xs.setFromMatrixColumn(t,2).magnitude();return r[0]=i[0]*n,r[1]=i[1]*n,r[2]=i[2]*n,r[3]=0,r[4]=i[4]*o,r[5]=i[5]*o,r[6]=i[6]*o,r[7]=0,r[8]=i[8]*a,r[9]=i[9]*a,r[10]=i[10]*a,r[11]=0,r[12]=0,r[13]=0,r[14]=0,r[15]=1,s}extractForward(t){const s=this.elements;let r=-s[8],i=-s[9],n=-s[10];const o=1/(Math.sqrt(r*r+i*i+n*n)||1);return r*=o,i*=o,n*=o,t.set(r,i,n),t}extractRight(t){const s=this.elements;let r=s[0],i=s[1],n=s[2];const o=1/(Math.sqrt(r*r+i*i+n*n)||1);return r*=o,i*=o,n*=o,t.set(r,i,n),t}extractUp(t){const s=this.elements;let r=s[4],i=s[5],n=s[6];const o=1/(Math.sqrt(r*r+i*i+n*n)||1);return r*=o,i*=o,n*=o,t.set(r,i,n),t}getMaxScaleOnAxis(){const t=this.elements,s=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],r=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(s,r,i))}getMaxSingularValueSq(){const t=this.elements,s=t[0],r=t[1],i=t[2],n=t[4],o=t[5],a=t[6],c=t[8],l=t[9],u=t[10],h=s*s+r*r+i*i,d=n*n+o*o+a*a,f=c*c+l*l+u*u,p=s*n+r*o+i*a,m=s*c+r*l+i*u,_=n*c+o*l+a*u,g=p*p+m*m+_*_;if(g===0)return Math.max(h,d,f);const b=(h+d+f)/3,y=h-b,v=d-b,x=f-b,w=Math.sqrt((y*y+v*v+x*x+2*g)/6),T=y/w,B=v/w,S=x/w,C=p/w,D=m/w,I=_/w,M=T*(B*S-I*I)-C*(C*S-I*D)+D*(C*I-B*D),P=Math.max(-1,Math.min(1,M/2)),A=b+2*w*Math.cos(Math.acos(P)/3);return Math.max(A,0)}};function Pr(e,t,s){const r=e.elements,i=t.elements,n=s.elements,o=r[0],a=r[4],c=r[8],l=r[12],u=r[1],h=r[5],d=r[9],f=r[13],p=r[2],m=r[6],_=r[10],g=r[14],b=r[3],y=r[7],v=r[11],x=r[15],w=i[0],T=i[4],B=i[8],S=i[12],C=i[1],D=i[5],I=i[9],M=i[13],P=i[2],A=i[6],z=i[10],k=i[14],O=i[3],U=i[7],X=i[11],W=i[15];return n[0]=o*w+a*C+c*P+l*O,n[4]=o*T+a*D+c*A+l*U,n[8]=o*B+a*I+c*z+l*X,n[12]=o*S+a*M+c*k+l*W,n[1]=u*w+h*C+d*P+f*O,n[5]=u*T+h*D+d*A+f*U,n[9]=u*B+h*I+d*z+f*X,n[13]=u*S+h*M+d*k+f*W,n[2]=p*w+m*C+_*P+g*O,n[6]=p*T+m*D+_*A+g*U,n[10]=p*B+m*I+_*z+g*X,n[14]=p*S+m*M+_*k+g*W,n[3]=b*w+y*C+v*P+x*O,n[7]=b*T+y*D+v*A+x*U,n[11]=b*B+y*I+v*z+x*X,n[15]=b*S+y*M+v*k+x*W,s}const xs=new F,Th=new F,Ch=new F,sn=new E,Dh=new F(0,0,0),Bh=new F(1,1,1),Ih=new E,Mh=new E;var mt=class ga{x=0;y=0;z=0;w=0;static get shared(){return Le.x=0,Le.y=0,Le.z=0,Le.w=1,Le}static slerpFlat(t,s,r,i,n,o,a){let c=r[i+0],l=r[i+1],u=r[i+2],h=r[i+3],d=n[o+0],f=n[o+1],p=n[o+2],m=n[o+3];if(h!==m||c!==d||l!==f||u!==p){let _=c*d+l*f+u*p+h*m;_<0&&(d=-d,f=-f,p=-p,m=-m,_=-_);let g=1-a,b=a;if(_<.9995){const y=Math.sin(a*Math.acos(_));b=y/Math.sqrt(1-_*_),g=Math.sqrt(1-y*y)-_*b,c=c*g+d*b,l=l*g+f*b,u=u*g+p*b,h=h*g+m*b}else{c=c*g+d*b,l=l*g+f*b,u=u*g+p*b,h=h*g+m*b;const y=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=y,l*=y,u*=y,h*=y}}t[s]=c,t[s+1]=l,t[s+2]=u,t[s+3]=h}constructor(t=0,s=0,r=0,i=1){this.x=t,this.y=s,this.z=r,this.w=i}set(t,s,r,i){return this.x=t,this.y=s,this.z=r,this.w=i,this}copyFrom(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}copyTo(t){return t.x=this.x,t.y=this.y,t.z=this.z,t.w=this.w,t}clone(){return new ga(this.x,this.y,this.z,this.w)}identity(){return this.x=0,this.y=0,this.z=0,this.w=1,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}setFromEuler(t,s=this){const r=t.x*.5,i=t.y*.5,n=t.z*.5,o=Math.cos(r),a=Math.cos(i),c=Math.cos(n),l=Math.sin(r),u=Math.sin(i),h=Math.sin(n);return s.x=l*a*c+o*u*h,s.y=o*u*c-l*a*h,s.z=o*a*h+l*u*c,s.w=o*a*c-l*u*h,s}setFromAxisAngle(t,s,r=this){const i=s/2,n=Math.sin(i);return r.x=t.x*n,r.y=t.y*n,r.z=t.z*n,r.w=Math.cos(i),r}setFromRotationMatrix(t,s=this){const r=t.elements;return rn(s,r[0],r[4],r[8],r[1],r[5],r[9],r[2],r[6],r[10]),s}setFromScaledRotationMatrix(t,s=this){const r=t.elements;let i=r[0],n=r[1],o=r[2],a=r[4],c=r[5],l=r[6],u=r[8],h=r[9],d=r[10];const f=1/Math.sqrt(i*i+n*n+o*o),p=1/Math.sqrt(a*a+c*c+l*l),m=1/Math.sqrt(u*u+h*h+d*d);return i*=f,n*=f,o*=f,a*=p,c*=p,l*=p,u*=m,h*=m,d*=m,rn(s,i,a,u,n,c,h,o,l,d),s}setFromUnitVectors(t,s,r=this){let n=t.x*s.x+t.y*s.y+t.z*s.z+1;return n<1e-6?(n=0,Math.abs(t.x)>Math.abs(t.z)?(r.x=-t.y,r.y=t.x,r.z=0):(r.x=0,r.y=-t.z,r.z=t.y)):(r.x=t.y*s.z-t.z*s.y,r.y=t.z*s.x-t.x*s.z,r.z=t.x*s.y-t.y*s.x),r.w=n,nn(r)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}angleTo(t){return 2*Math.acos(Math.abs(Z(this.dot(t),-1,1)))}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}magnitudeSquared(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}normalize(t=this){const s=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);if(s===0)t.x=0,t.y=0,t.z=0,t.w=1;else{const r=1/s;t.x=this.x*r,t.y=this.y*r,t.z=this.z*r,t.w=this.w*r}return t}inverse(t=this){return this.conjugate(t)}conjugate(t=this){return t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}multiply(t,s=this){return pe(this,t,s)}premultiply(t,s=this){return pe(t,this,s)}slerp(t,s,r=this){if(s===0)return r!==this&&(r.x=this.x,r.y=this.y,r.z=this.z,r.w=this.w),r;if(s===1)return r.x=t.x,r.y=t.y,r.z=t.z,r.w=t.w,r;const i=this.x,n=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,u=t.z,h=t.w,d=i*c+n*l+o*u+a*h;d<0&&(c=-c,l=-l,u=-u,h=-h,d=-d);let f=1-s,p=s;if(d<.9995){const m=Math.acos(d),_=Math.sin(m);return f=Math.sin(f*m)/_,p=Math.sin(s*m)/_,r.x=i*f+c*p,r.y=n*f+l*p,r.z=o*f+u*p,r.w=a*f+h*p,r}return r.x=i*f+c*p,r.y=n*f+l*p,r.z=o*f+u*p,r.w=a*f+h*p,nn(r)}fromArray(t,s=0){return this.x=t[s],this.y=t[s+1],this.z=t[s+2],this.w=t[s+3],this}toArray(t=[],s=0){return t[s]=this.x,t[s+1]=this.y,t[s+2]=this.z,t[s+3]=this.w,t}toString(){return`[@pixi/3d/math:Quaternion x=${this.x} y=${this.y} z=${this.z} w=${this.w}]`}};function rn(e,t,s,r,i,n,o,a,c,l){const u=t+n+l;let h;u>0?(h=.5/Math.sqrt(u+1),e.w=.25/h,e.x=(c-o)*h,e.y=(r-a)*h,e.z=(i-s)*h):t>n&&t>l?(h=2*Math.sqrt(1+t-n-l),e.w=(c-o)/h,e.x=.25*h,e.y=(s+i)/h,e.z=(r+a)/h):n>l?(h=2*Math.sqrt(1+n-t-l),e.w=(r-a)/h,e.x=(s+i)/h,e.y=.25*h,e.z=(o+c)/h):(h=2*Math.sqrt(1+l-t-n),e.w=(i-s)/h,e.x=(r+a)/h,e.y=(o+c)/h,e.z=.25*h)}function pe(e,t,s){const r=e.x,i=e.y,n=e.z,o=e.w,a=t.x,c=t.y,l=t.z,u=t.w;return s.x=r*u+o*a+i*l-n*c,s.y=i*u+o*c+n*a-r*l,s.z=n*u+o*l+r*c-i*a,s.w=o*u-r*a-i*c-n*l,s}function nn(e){const t=Math.sqrt(e.x*e.x+e.y*e.y+e.z*e.z+e.w*e.w);if(t===0)e.x=0,e.y=0,e.z=0,e.w=1;else{const s=1/t;e.x*=s,e.y*=s,e.z*=s,e.w*=s}return e}const Le=new mt;var _a=class ya{_x=0;_y=0;_z=0;_w=0;_observer;get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this._observer._onUpdate(this))}get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this._observer._onUpdate(this))}get z(){return this._z}set z(t){this._z!==t&&(this._z=t,this._observer._onUpdate(this))}get w(){return this._w}set w(t){this._w!==t&&(this._w=t,this._observer._onUpdate(this))}constructor(t,s=0,r=0,i=0,n=1){this._x=s,this._y=r,this._z=i,this._w=n,this._observer=t}set(t,s,r,i){return(this._x!==t||this._y!==s||this._z!==r||this._w!==i)&&(this._x=t,this._y=s,this._z=r,this._w=i,this._observer._onUpdate(this)),this}copyFrom(t){return(this._x!==t.x||this._y!==t.y||this._z!==t.z||this._w!==t.w)&&(this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._observer._onUpdate(this)),this}copyTo(t){return t.x=this._x,t.y=this._y,t.z=this._z,t.w=this._w,t}clone(t){return new ya(t??this._observer,this._x,this._y,this._z,this._w)}identity(){return this.set(0,0,0,1)}equals(t){return t.x===this._x&&t.y===this._y&&t.z===this._z&&t.w===this._w}setFromEuler(t,s=this){return s===this?(R.setFromEuler(t),this.set(R.x,R.y,R.z,R.w)):(R.setFromEuler(t,s),s)}setFromAxisAngle(t,s,r=this){return r===this?(R.setFromAxisAngle(t,s),this.set(R.x,R.y,R.z,R.w)):(R.setFromAxisAngle(t,s,r),r)}setFromRotationMatrix(t,s=this){return s===this?(R.setFromRotationMatrix(t),this.set(R.x,R.y,R.z,R.w)):(R.setFromRotationMatrix(t,s),s)}setFromScaledRotationMatrix(t,s=this){return s===this?(R.setFromScaledRotationMatrix(t),this.set(R.x,R.y,R.z,R.w)):(R.setFromScaledRotationMatrix(t,s),s)}setFromUnitVectors(t,s,r=this){return r===this?(R.setFromUnitVectors(t,s),this.set(R.x,R.y,R.z,R.w)):(R.setFromUnitVectors(t,s,r),r)}dot(t){return this._x*t.x+this._y*t.y+this._z*t.z+this._w*t.w}angleTo(t){return 2*Math.acos(Math.abs(Z(this.dot(t),-1,1)))}magnitude(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}magnitudeSquared(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}normalize(t=this){const s=Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w);let r,i,n,o;if(s===0)r=0,i=0,n=0,o=1;else{const a=1/s;r=this._x*a,i=this._y*a,n=this._z*a,o=this._w*a}return t===this?this.set(r,i,n,o):(t.x=r,t.y=i,t.z=n,t.w=o,t)}inverse(t=this){return this.conjugate(t)}conjugate(t=this){return t===this?this.set(-this._x,-this._y,-this._z,this._w):(t.x=-this._x,t.y=-this._y,t.z=-this._z,t.w=this._w,t)}multiply(t,s=this){return s===this?(pe(this,t,R),this.set(R.x,R.y,R.z,R.w)):(pe(this,t,s),s)}premultiply(t,s=this){return s===this?(pe(t,this,R),this.set(R.x,R.y,R.z,R.w)):(pe(t,this,s),s)}slerp(t,s,r=this){return R.set(this._x,this._y,this._z,this._w).slerp(t,s),r===this?this.set(R.x,R.y,R.z,R.w):(r.x=R.x,r.y=R.y,r.z=R.z,r.w=R.w,r)}fromArray(t,s=0){return this.set(t[s],t[s+1],t[s+2],t[s+3])}toArray(t=[],s=0){return t[s]=this._x,t[s+1]=this._y,t[s+2]=this._z,t[s+3]=this._w,t}toString(){return`[@pixi/3d/math:ObservableQuaternion x=${this._x} y=${this._y} z=${this._z} w=${this._w}]`}};const R=new mt;var Q=class Es{min;max;type="box";constructor(t,s){this.min=t!==void 0?t:new F(1/0,1/0,1/0),this.max=s!==void 0?s:new F(-1/0,-1/0,-1/0)}static fromCenterSize(t,s){const r=(typeof s=="number"?s:s.x)*.5,i=(typeof s=="number"?s:s.y)*.5,n=(typeof s=="number"?s:s.z)*.5;return new Es(new F(t.x-r,t.y-i,t.z-n),new F(t.x+r,t.y+i,t.z+n))}set(t,s){return this.min.copyFrom(t),this.max.copyFrom(s),this}copyFrom(t){return this.min.copyFrom(t.min),this.max.copyFrom(t.max),this}copyTo(t){return t.min.copyFrom(this.min),t.max.copyFrom(this.max),t}clone(){return new Es().copyFrom(this)}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}expandByPoint(t,s=this){return s!==this&&s.copyFrom(this),s.min.min(t),s.max.max(t),s}union(t,s=this){return s!==this&&s.copyFrom(this),s.min.min(t.min),s.max.max(t.max),s}getCenter(t){return t||=new F,this.isEmpty()?t.set(0,0,0):(t.x=(this.min.x+this.max.x)*.5,t.y=(this.min.y+this.max.y)*.5,t.z=(this.min.z+this.max.z)*.5,t)}getSize(t){return t||=new F,this.isEmpty()?t.set(0,0,0):(t.x=this.max.x-this.min.x,t.y=this.max.y-this.min.y,t.z=this.max.z-this.min.z,t)}distanceToPoint(t){return Ar.copyFrom(t).clamp(this.min,this.max).distanceTo(t)}clampPoint(t,s){return s||=new F,s.copyFrom(t).clamp(this.min,this.max)}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return t.radius<0?!1:(this.clampPoint(t.center,Ar),Ar.distanceToSquared(t.center)<=t.radius*t.radius)}intersectsPlane(t){let s,r;return t.normal.x>0?(s=t.normal.x*this.min.x,r=t.normal.x*this.max.x):(s=t.normal.x*this.max.x,r=t.normal.x*this.min.x),t.normal.y>0?(s+=t.normal.y*this.min.y,r+=t.normal.y*this.max.y):(s+=t.normal.y*this.max.y,r+=t.normal.y*this.min.y),t.normal.z>0?(s+=t.normal.z*this.min.z,r+=t.normal.z*this.max.z):(s+=t.normal.z*this.max.z,r+=t.normal.z*this.min.z),s<=-t.constant&&r>=-t.constant}intersectsRay(t){return t.intersectsBox(this)}applyMatrix4(t,s=this){if(s!==this&&s.copyFrom(this),s.isEmpty())return s;const r=t.elements,i=(s.min.x+s.max.x)*.5,n=(s.min.y+s.max.y)*.5,o=(s.min.z+s.max.z)*.5,a=(s.max.x-s.min.x)*.5,c=(s.max.y-s.min.y)*.5,l=(s.max.z-s.min.z)*.5,u=r[0]*i+r[4]*n+r[8]*o+r[12],h=r[1]*i+r[5]*n+r[9]*o+r[13],d=r[2]*i+r[6]*n+r[10]*o+r[14],f=Math.abs(r[0])*a+Math.abs(r[4])*c+Math.abs(r[8])*l,p=Math.abs(r[1])*a+Math.abs(r[5])*c+Math.abs(r[9])*l,m=Math.abs(r[2])*a+Math.abs(r[6])*c+Math.abs(r[10])*l;return s.min.set(u-f,h-p,d-m),s.max.set(u+f,h+p,d+m),s}getBounds(t){return t||=new Es,t.copyFrom(this)}get width(){return this.max.x-this.min.x}get height(){return this.max.y-this.min.y}get depth(){return this.max.z-this.min.z}toString(){return`[@pixi/3d/math:Box min=(${this.min.x}, ${this.min.y}, ${this.min.z}) max=(${this.max.x}, ${this.max.y}, ${this.max.z})]`}};const Ar=new F;var Ph=class{_radians;constructor(e){this._radians=e}get x(){return this._radians._x*Ze}set x(e){this._radians.x=e*ft}get y(){return this._radians._y*Ze}set y(e){this._radians.y=e*ft}get z(){return this._radians._z*Ze}set z(e){this._radians.z=e*ft}set(e=0,t=e,s=e){return this._radians.set(e*ft,t*ft,s*ft),this}copyFrom(e){return this.set(e.x,e.y,e.z)}copyTo(e){return e.set(this.x,this.y,this.z)}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}},qe=class xa{_x=0;_y=0;_z=0;_observer;get x(){return this._x}set x(t){this._x!==t&&(this._x=t,this._observer._onUpdate(this))}get y(){return this._y}set y(t){this._y!==t&&(this._y=t,this._observer._onUpdate(this))}get z(){return this._z}set z(t){this._z!==t&&(this._z=t,this._observer._onUpdate(this))}constructor(t,s=0,r=0,i=0){this._x=s,this._y=r,this._z=i,this._observer=t}set(t=0,s=t,r=t){return(this._x!==t||this._y!==s||this._z!==r)&&(this._x=t,this._y=s,this._z=r,this._observer._onUpdate(this)),this}copyFrom(t){return(this._x!==t.x||this._y!==t.y||this._z!==t.z)&&(this._x=t.x,this._y=t.y,this._z=t.z,this._observer._onUpdate(this)),this}copyTo(t){return t.set(this._x,this._y,this._z),t}equals(t){return t.x===this._x&&t.y===this._y&&t.z===this._z}clone(t){return new xa(t??this._observer,this._x,this._y,this._z)}toString(){return`[@pixi/3d/math:ObservableVector3 x=${this._x} y=${this._y} z=${this._z}]`}fromArray(t,s=0){return this.set(t[s],t[s+1],t[s+2])}toArray(t=[],s=0){return t[s]=this._x,t[s+1]=this._y,t[s+2]=this._z,t}add(t,s=this){const r=this._x+t.x,i=this._y+t.y,n=this._z+t.z;return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}subtract(t,s=this){const r=this._x-t.x,i=this._y-t.y,n=this._z-t.z;return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}multiply(t,s=this){const r=this._x*t.x,i=this._y*t.y,n=this._z*t.z;return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}multiplyScalar(t,s=this){const r=this._x*t,i=this._y*t,n=this._z*t;return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}divide(t,s=this){const r=this._x/t.x,i=this._y/t.y,n=this._z/t.z;return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}divideScalar(t,s=this){return this.multiplyScalar(1/t,s)}addScaledVector(t,s,r=this){const i=this._x+t.x*s,n=this._y+t.y*s,o=this._z+t.z*s;return r===this?this.set(i,n,o):(r.x=i,r.y=n,r.z=o,r)}negate(t=this){const s=-this._x,r=-this._y,i=-this._z;return t===this?this.set(s,r,i):(t.x=s,t.y=r,t.z=i,t)}min(t,s=this){const r=Math.min(this._x,t.x),i=Math.min(this._y,t.y),n=Math.min(this._z,t.z);return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}max(t,s=this){const r=Math.max(this._x,t.x),i=Math.max(this._y,t.y),n=Math.max(this._z,t.z);return s===this?this.set(r,i,n):(s.x=r,s.y=i,s.z=n,s)}clamp(t,s,r=this){const i=Z(this._x,t.x,s.x),n=Z(this._y,t.y,s.y),o=Z(this._z,t.z,s.z);return r===this?this.set(i,n,o):(r.x=i,r.y=n,r.z=o,r)}normalize(t=this){const s=1/(Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)||1),r=this._x*s,i=this._y*s,n=this._z*s;return t===this?this.set(r,i,n):(t.x=r,t.y=i,t.z=n,t)}setLength(t,s=this){const r=t/(Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)||1),i=this._x*r,n=this._y*r,o=this._z*r;return s===this?this.set(i,n,o):(s.x=i,s.y=n,s.z=o,s)}magnitude(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z)}magnitudeSquared(){return this._x*this._x+this._y*this._y+this._z*this._z}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const s=this._x-t.x,r=this._y-t.y,i=this._z-t.z;return s*s+r*r+i*i}dot(t){return this._x*t.x+this._y*t.y+this._z*t.z}angleTo(t){const s=Math.sqrt(this.magnitudeSquared()*(t.x*t.x+t.y*t.y+t.z*t.z));if(s===0)return Math.PI/2;const r=this.dot(t)/s;return Math.acos(Z(r,-1,1))}cross(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.x,a=t.y,c=t.z,l=i*c-n*a,u=n*o-r*c,h=r*a-i*o;return s===this?this.set(l,u,h):(s.x=l,s.y=u,s.z=h,s)}applyMatrix3(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.elements,a=o[0]*r+o[3]*i+o[6]*n,c=o[1]*r+o[4]*i+o[7]*n,l=o[2]*r+o[5]*i+o[8]*n;return s===this?this.set(a,c,l):(s.x=a,s.y=c,s.z=l,s)}applyMatrix4(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.elements,a=1/(o[3]*r+o[7]*i+o[11]*n+o[15]),c=(o[0]*r+o[4]*i+o[8]*n+o[12])*a,l=(o[1]*r+o[5]*i+o[9]*n+o[13])*a,u=(o[2]*r+o[6]*i+o[10]*n+o[14])*a;return s===this?this.set(c,l,u):(s.x=c,s.y=l,s.z=u,s)}applyAffineMatrix4(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.elements,a=o[0]*r+o[4]*i+o[8]*n+o[12],c=o[1]*r+o[5]*i+o[9]*n+o[13],l=o[2]*r+o[6]*i+o[10]*n+o[14];return s===this?this.set(a,c,l):(s.x=a,s.y=c,s.z=l,s)}applyQuaternion(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.x,a=t.y,c=t.z,l=t.w,u=l*r+a*n-c*i,h=l*i+c*r-o*n,d=l*n+o*i-a*r,f=-o*r-a*i-c*n,p=u*l-f*o-h*c+d*a,m=h*l-f*a-d*o+u*c,_=d*l-f*c-u*a+h*o;return s===this?this.set(p,m,_):(s.x=p,s.y=m,s.z=_,s)}transformDirection(t,s=this){const r=this._x,i=this._y,n=this._z,o=t.elements,a=o[0]*r+o[4]*i+o[8]*n,c=o[1]*r+o[5]*i+o[9]*n,l=o[2]*r+o[6]*i+o[10]*n,u=1/(Math.sqrt(a*a+c*c+l*l)||1),h=a*u,d=c*u,f=l*u;return s===this?this.set(h,d,f):(s.x=h,s.y=d,s.z=f,s)}setFromSpherical(t){const s=Math.sin(t.phi)*t.radius;return this.set(s*Math.sin(t.theta),Math.cos(t.phi)*t.radius,s*Math.cos(t.theta))}setFromCylindrical(t){return this.set(t.radius*Math.sin(t.theta),t.y,t.radius*Math.cos(t.theta))}setFromMatrixColumn(t,s){return this.fromArray(t.elements,s*4)}};function Ut(e,t){return typeof e=="boolean"?e:e?.[t]??!1}const Ah=new Q,Fh=[];function ba(e,t,s=!0){return t.makeEmpty(),va(e,t,null,0,s),t.isEmpty()&&(t.min.set(0,0,0),t.max.set(0,0,0)),t}function va(e,t,s,r,i){const n=e.boundsVolume;if(n){on(n,t,s);return}const o=e.geometry;o&&on(o.bounds3D,t,s);const a=e.children;if(a.length===0)return;const c=Fh[r]??=new E;for(let l=0;l<a.length;l++){const u=a[l];i&&!u.visible||(u.updateLocalTransform(),s?c.copyFrom(s).multiply(u.localTransform):c.copyFrom(u.localTransform),va(u,t,c,r+1,i))}}function on(e,t,s){t.union(s?e.applyMatrix4(s,Ah):e)}const zh=new E,Ee=[];function bs(e,t){let s=0,r=e.parent;for(;r;)Ee[s++]=r,r=r.parent;for(let a=s;Ee[a];a++)Ee[a]=null;if(s===0)return t.identity();const i=Ee[s-1];i._localTransformDirty&&(i.updateLocalTransform(),i._localTransformDirty=!1),t.copyFrom(i.localTransform);let n=t,o=zh;for(let a=s-2;a>=0;a--){const c=Ee[a];c._localTransformDirty&&(c.updateLocalTransform(),c._localTransformDirty=!1),E.multiplyAffine(o.elements,0,n.elements,0,c.localTransform.elements,0);const l=n;n=o,o=l}return n!==t&&t.copyFrom(n),t}let kh=0;const Fr=new E,Ve=new F,zr=new E,kr=new mt,Rr=new mt,Rh={x:0,y:1,z:0},vs=new F,oe=new E,an=new F,Lh=new F,ws=new E,Ge=new E,Lr=new F,cn=new F,ln=new mt,kt=new Q;function ae(e,t,s){const r=Math.sign(s)||1;return t!==0?e/t*r:r}function un(e,t){return e===null?!1:e===t||t instanceof RegExp&&t.test(e)}const Eh={children:!0,hitVolume:!0,parent:!0,width:!0,height:!0,depth:!0};var tt=class extends ia{uid=kh++;label=null;rotationDirty=!1;localTransform=new E;worldTransform=new E;_position=new qe(this,0,0,0);_scale=new qe(this,1,1,1);_rotation=new qe(this,0,0,0);_quaternion=new _a(this,0,0,0,1);_angle=null;_origin=null;children=[];parent=null;_view3d=null;boundsVolume=null;destroyed=!1;didChange=!1;_worldTransformDirty=!0;_worldVisibleDirty=!0;_localTransformDirty=!1;_visible=1;_worldVisible=1;_updateTick=-1;_relativeSceneDepth=0;_storeDirty=!1;_worldTransformId=0;_lookAtForwardIsPositiveZ=!0;constructor(e={}){super(),uh(this,e,Eh);const{children:t,hitVolume:s,width:r,height:i,depth:n,parent:o}=e;if(t)for(let a=0;a<t.length;a++)this.addChild(t[a]);s!==void 0&&(this.hitVolume=s),r!==void 0&&(this.width=r),i!==void 0&&(this.height=i),n!==void 0&&(this.depth=n),o?.addChild(this)}get position(){return this._position}set position(e){this._position.copyFrom(e)}get scale(){return this._scale}set scale(e){typeof e=="number"?this._scale.set(e):this._scale.copyFrom(e)}get rotation(){return this._rotation}set rotation(e){this._rotation.copyFrom(e),this.rotationDirty||this._onUpdate(this._rotation)}get angle(){return this._angle??=new Ph(this._rotation)}set angle(e){this._rotation.set(e.x*ft,e.y*ft,e.z*ft),this.rotationDirty||this._onUpdate(this._rotation)}get quaternion(){return this._quaternion}set quaternion(e){this._quaternion.copyFrom(e),this.rotationDirty&&this._onUpdate(this._quaternion)}get origin(){return this._origin??=new qe(this,0,0,0)}set origin(e){const t=this.origin;typeof e=="number"?t.set(e):t.copyFrom(e)}get x(){return this._position._x}set x(e){this._position.x=e}get y(){return this._position._y}set y(e){this._position.y=e}get z(){return this._position._z}set z(e){this._position.z=e}addChild(...e){if(e.length>1){for(let s=0;s<e.length;s++)this.addChild(e[s]);return e[0]}const t=e[0];return t.parent===this?(this.children.splice(this.children.indexOf(t),1),this.children.push(t),t):(t.parent&&t.parent.removeChild(t),this.children.push(t),t._worldTransformDirty=!0,t._worldVisibleDirty=!0,t.didChange=!0,t.parent=this,this._view3d&&this._view3d._attach(t),this.emit("childAdded",t,this,this.children.length-1),t.emit("added",this),t)}removeChild(...e){if(e.length>1){for(let r=0;r<e.length;r++)this.removeChild(e[r]);return e[0]}const t=e[0],s=this.children.indexOf(t);return s>-1&&(this.children.splice(s,1),t._view3d&&t._view3d._detach(t),t.parent=null,this.emit("childRemoved",t,this,s),t.emit("removed",this)),t}removeChildren(e=0,t){const s=t??this.children.length,r=s-e,i=[];if(r>0&&r<=s){for(let n=s-1;n>=e;n--){const o=this.children[n];o&&(i.push(o),o._view3d&&o._view3d._detach(o),o.parent=null)}this.children.splice(e,r);for(let n=0;n<i.length;n++){const o=i[n];this.emit("childRemoved",o,this,n),o.emit("removed",this)}return i}else if(r===0&&this.children.length===0)return i;throw new RangeError("removeChildren: numeric values are outside the acceptable range.")}removeChildAt(e){const t=this.getChildAt(e);return this.removeChild(t)}getChildAt(e){if(e<0||e>=this.children.length)throw new Error(`getChildAt: Index (${e}) does not exist.`);return this.children[e]}getChildIndex(e){const t=this.children.indexOf(e);if(t===-1)throw new Error("getChildIndex: The supplied Container3D must be a child of the caller.");return t}setChildIndex(e,t){if(t<0||t>=this.children.length)throw new Error(`setChildIndex: The index ${t} supplied is out of bounds ${this.children.length}.`);this.getChildIndex(e),this.addChildAt(e,t)}addChildAt(e,t){const{children:s}=this;if(t<0||t>s.length)throw new Error(`addChildAt: The index ${t} supplied is out of bounds ${s.length}.`);const r=e.parent===this;if(e.parent)if(r){const i=s.indexOf(e);if(i===t)return e;s.splice(i,1)}else e.parent.removeChild(e);return t===s.length?s.push(e):s.splice(t,0,e),r||(e._worldTransformDirty=!0,e._worldVisibleDirty=!0,e.didChange=!0,e.parent=this,this._view3d&&this._view3d._attach(e),this.emit("childAdded",e,this,t),e.emit("added",this)),e}swapChildren(e,t){if(e===t)return;const s=this.getChildIndex(e),r=this.getChildIndex(t);this.children[s]=t,this.children[r]=e}getChildByLabel(e,t=!1){const s=this.children;for(let r=0;r<s.length;r++)if(un(s[r].label,e))return s[r];if(t)for(let r=0;r<s.length;r++){const i=s[r].getChildByLabel(e,!0);if(i)return i}return null}getChildrenByLabel(e,t=!1,s=[]){const r=this.children;for(let i=0;i<r.length;i++)un(r[i].label,e)&&s.push(r[i]);if(t)for(let i=0;i<r.length;i++)r[i].getChildrenByLabel(e,!0,s);return s}traverse(e){const t=this.children;let s=t.length;e(this);for(let r=0;r<s&&r<t.length;){const i=t[r],n=t[r+1];i.traverse(e),t[r]===n?s--:r++}}removeFromParent(){this.parent?.removeChild(this)}reparentChild(...e){if(e.length===1)return this.reparentChildAt(e[0],this.children.length);for(let t=0;t<e.length;t++)this.reparentChildAt(e[t],this.children.length);return e[0]}reparentChildAt(e,t){return e.parent===this?(this.setChildIndex(e,t),e):(bs(e,ws),e._localTransformDirty&&(e.updateLocalTransform(),e._localTransformDirty=!1),ws.multiply(e.localTransform),e.removeFromParent(),this.addChildAt(e,t),bs(this,Ge),this._localTransformDirty&&(this.updateLocalTransform(),this._localTransformDirty=!1),Ge.multiply(this.localTransform),Ge.getInverse(Ge),ws.premultiply(Ge),ws.decompose(Lr,ln,cn),e.scale.copyFrom(cn),e.quaternion.copyFrom(ln),e._origin!==null&&(e.updateLocalTransform(),Lr.subtract(e._getOriginOffset(vs))),e.position.copyFrom(Lr),e)}replaceChild(e,t){const s=this.getChildIndex(e);this.addChildAt(t,s),t.scale.copyFrom(e.scale),t.rotation.copyFrom(e.rotation),t.quaternion.copyFrom(e.quaternion),t.rotationDirty=e.rotationDirty;const r=t.position.copyFrom(e.position);e._origin!==null&&(e.updateLocalTransform(),r.add(e._getOriginOffset(vs))),t._origin!==null&&(t.updateLocalTransform(),r.subtract(t._getOriginOffset(vs))),this.removeChild(e)}updateLocalTransform(){const e=this._quaternion;if(this.rotationDirty){this.rotationDirty=!1;const x=this._rotation._x,w=this._rotation._y,T=this._rotation._z,B=Math.cos(x/2),S=Math.cos(w/2),C=Math.cos(T/2),D=Math.sin(x/2),I=Math.sin(w/2),M=Math.sin(T/2);e._x=D*S*C+B*I*M,e._y=B*I*C-D*S*M,e._z=B*S*M+D*I*C,e._w=B*S*C-D*I*M}const t=e._x,s=e._y,r=e._z,i=e._w,n=t+t,o=s+s,a=r+r,c=t*n,l=t*o,u=t*a,h=s*o,d=s*a,f=r*a,p=i*n,m=i*o,_=i*a,g=this.localTransform.elements,b=this._scale._x,y=this._scale._y,v=this._scale._z;g[0]=(1-(h+f))*b,g[1]=(l+_)*b,g[2]=(u-m)*b,g[4]=(l-_)*y,g[5]=(1-(c+f))*y,g[6]=(d+p)*y,g[8]=(u+m)*v,g[9]=(d-p)*v,g[10]=(1-(c+h))*v,g[12]=this._position._x,g[13]=this._position._y,g[14]=this._position._z,this._origin!==null&&this._addOriginOffset()}_addOriginOffset(){const e=this._getOriginOffset(vs),t=this.localTransform.elements;t[12]+=e.x,t[13]+=e.y,t[14]+=e.z}_getOriginOffset(e){const t=this.localTransform.elements,s=this._origin,r=s._x,i=s._y,n=s._z;return e.x=r-(t[0]*r+t[4]*i+t[8]*n),e.y=i-(t[1]*r+t[5]*i+t[9]*n),e.z=n-(t[2]*r+t[6]*i+t[10]*n),e}getLocalBounds(e=new Q){return ba(this,e)}get width(){return Math.abs(this._scale._x*this.getLocalBounds(kt).width)}set width(e){this._scale.x=ae(e,this.getLocalBounds(kt).width,this._scale._x)}get height(){return Math.abs(this._scale._y*this.getLocalBounds(kt).height)}set height(e){this._scale.y=ae(e,this.getLocalBounds(kt).height,this._scale._y)}get depth(){return Math.abs(this._scale._z*this.getLocalBounds(kt).depth)}set depth(e){this._scale.z=ae(e,this.getLocalBounds(kt).depth,this._scale._z)}getSize(e={width:0,height:0,depth:0}){const t=this.getLocalBounds(kt);return e.width=Math.abs(this._scale._x*t.width),e.height=Math.abs(this._scale._y*t.height),e.depth=Math.abs(this._scale._z*t.depth),e}setSize(e,t,s){let r;typeof e=="object"?(r=e.width,t=e.height??r,s=e.depth??r):(r=e,t??=r,s??=r);const i=this.getLocalBounds(kt),n=this._scale;n.set(ae(r,i.width,n._x),ae(t,i.height,n._y),ae(s,i.depth,n._z))}lookAt(e,t=Rh){bs(this,Fr.identity()),Ve.copyFrom(this.position),this._origin!==null&&Ve.add(this._origin),Ve.applyAffineMatrix4(Fr),this._lookAtForwardIsPositiveZ?zr.lookAt(e,Ve,t):zr.lookAt(Ve,e,t),kr.setFromRotationMatrix(zr),this.parent&&(Rr.setFromScaledRotationMatrix(Fr),Rr.inverse(),kr.premultiply(Rr)),this.quaternion.copyFrom(kr)}getGlobalTransform(e=new E,t=!1){return t?e.copyFrom(this.worldTransform):(bs(this,e),this._localTransformDirty&&(this.updateLocalTransform(),this._localTransformDirty=!1),e.multiply(this.localTransform))}toGlobal(e,t,s=!1){return t??=new F,this.getGlobalTransform(oe,s),an.copyFrom(e).applyAffineMatrix4(oe,t),t}toLocal(e,t,s,r=!1){return s??=new F,t&&(e=t.toGlobal(e,Lh,r)),this.getGlobalTransform(oe,r),oe.getInverse(oe),an.copyFrom(e).applyAffineMatrix4(oe,s),s}getGlobalPosition(e=new F,t=!1){return this.parent?this.parent.toGlobal(this.position,e,t):e.copyFrom(this.position)}logHierarchy(e=0){const t="  ".repeat(e),s=this.constructor.name,r=this.label?` "${this.label}"`:"";console.log(`${t}${s}${r}`);for(const i of this.children)i.logHierarchy(e+1)}get visible(){return!!this._visible}set visible(e){const t=e?1:0;this._visible!==t&&(this._visible=t,this._worldVisibleDirty=!0,this.didChange||(this.didChange=!0,this._view3d?._onChildUpdate(this)),this.emit("visibleChanged",e))}get worldVisible(){return this._worldVisible}get view3d(){return this._view3d}_onUpdate(e){e&&(e===this._rotation?this.rotationDirty=!0:e===this._quaternion&&(this.rotationDirty=!1)),this._localTransformDirty=!0,this._worldTransformDirty=!0,!this.didChange&&(this.didChange=!0,this._view3d&&this._view3d._onChildUpdate(this))}unload(){const e=this.children;for(let t=0;t<e.length;t++)e[t].unload()}_storeWorldTransform(){}_storeWorldVisible(){}destroy(e){if(this.destroyed)return;this.destroyed=!0;const t=Ut(e,"children"),s=t?this.children.slice():null;if(this.removeChildren(0,this.children.length),this.removeFromParent(),this.emit("destroyed",this),this.removeAllListeners(),t&&s)for(let r=0;r<s.length;r++)s[r].destroy(e);this.parent=null,this._view3d=null}},Vh=class{_bitsByName=Object.assign(Object.create(null),{shadow:1,opaque:2,transparent:4,background:8,transmission:16});_nextBit=256;getOrAllocate(e,t){const s=this._bitsByName[e];if(s!==void 0)return t!==void 0&&t!==s&&V(`[@pixi/3d] pass "${e}" already registered with bit ${s}; ignoring explicit bit ${t}.`),s;const r=t??this._nextBit;return t===void 0&&(this._nextBit<<=1),this._bitsByName[e]=r,r}get(e){return this._bitsByName[e]}nameOf(e){return Object.keys(this._bitsByName).find(t=>this._bitsByName[t]===e)}};const Qt=new Vh;function us(e){return e.bindGroups.map(t=>typeof t=="string"?{name:t,ubo:!1}:{name:t.name,ubo:t.ubo??!1})}const Er=new Map;function hn(e){return e._contentSnapshot??=JSON.stringify(e,(t,s)=>t.startsWith("_")?void 0:s)}function Te(e){if(e._identityChecked)return;const t=Er.get(e.name);if(t===void 0||t===e){Er.set(e.name,e),e._identityChecked=!0;return}if(hn(t)===hn(e)){Er.set(e.name,e),e._identityChecked=!0;return}throw new Error(`[bitRegistry] Two different shader bits share the name '${e.name}'. Bit names are shader-cache identities, so this would silently serve one bit's compiled shader for the other. Rename one of them — or, if you didn't define a second '${e.name}', two copies of a module/library are loaded.`)}const Gh=[{name:"global",ubo:!0},{name:"camera",ubo:!1},{name:"batch",ubo:!1}];function dn(e){return e.ubo?`\`{ name: '${e.name}', ubo: true }\``:`\`'${e.name}'\``}function tr(e,t){const s=us(t);for(const r of Gh){const{name:i,ubo:n}=r,o=s.find(c=>c.name===i),a=e.find(c=>c.bindings?.[i]);if(a&&!o)throw new Error(`The shader bit '${a.name}' declares the '${i}' bind group, but the shader template doesn't list it. Add ${dn(r)} to the template's \`bindGroups\`.`);if(i==="camera"&&o&&!a)throw new Error("The shader template lists a 'camera' bind group but no bit declares it. Leave `includeCamera` on (the default), or list `cameraBit` in the descriptor.");if(o&&o.ubo!==n)throw new Error(`The shader template lists the '${i}' bind group ${n?"without":"with"} \`ubo: true\`. List it as ${dn(r)} in \`bindGroups\`, because the engine binds '${i}' as ${n?"one uniform block":"plain uniforms"} on WebGL.`)}}const Oh=/^[a-z][A-Za-z0-9]*$/,Nh=new Set(["const uniform buffer shared coherent volatile restrict readonly writeonly layout centroid flat smooth patch sample invariant precise break continue do for while switch case default if else in out inout int void bool true false float discard return vec2 vec3 vec4 ivec2 ivec3 ivec4 bvec2 bvec3 bvec4 uint uvec2 uvec3 uvec4 mat2 mat3 mat4 mat2x2 mat2x3 mat2x4 mat3x2 mat3x3 mat3x4 mat4x2 mat4x3 mat4x4 lowp mediump highp precision sampler2D sampler2DShadow sampler2DArray sampler2DArrayShadow isampler2D isampler2DArray usampler2D usampler2DArray sampler2DMS isampler2DMS usampler2DMS sampler2DMSArray isampler2DMSArray usampler2DMSArray sampler3D isampler3D usampler3D samplerCube samplerCubeShadow isamplerCube usamplerCube samplerCubeArray samplerCubeArrayShadow isamplerCubeArray usamplerCubeArray samplerBuffer isamplerBuffer usamplerBuffer image2D iimage2D uimage2D image2DArray iimage2DArray uimage2DArray image3D iimage3D uimage3D imageCube iimageCube uimageCube imageCubeArray iimageCubeArray uimageCubeArray imageBuffer iimageBuffer uimageBuffer struct","attribute varying noperspective subroutine common partition active asm class union enum typedef template this resource goto inline noinline public static extern external interface long short half fixed unsigned superp double input output hvec2 hvec3 hvec4 fvec2 fvec3 fvec4 dvec2 dvec3 dvec4 dmat2 dmat3 dmat4 dmat2x2 dmat2x3 dmat2x4 dmat3x2 dmat3x3 dmat3x4 dmat4x2 dmat4x3 dmat4x4 filter sizeof cast namespace using sampler1D sampler1DShadow sampler1DArray sampler1DArrayShadow isampler1D isampler1DArray usampler1D usampler1DArray sampler2DRect sampler2DRectShadow isampler2DRect usampler2DRect sampler3DRect image1D iimage1D uimage1D image1DArray iimage1DArray uimage1DArray image2DRect iimage2DRect uimage2DRect image2DMS iimage2DMS uimage2DMS image2DMSArray iimage2DMSArray uimage2DMSArray","alias break case const continue continuing default diagnostic discard else enable false fn for if let loop override requires return struct switch true var while","abstract active alignas alignof as asm async attribute auto await become cast catch class coherent common compile concept consteval constexpr constinit crate debugger decltype delete demote do enum explicit export extends extern external fallthrough filter final finally friend from fxgroup get goto groupshared highp impl implements import inline instanceof interface layout lowp macro match mediump meta mod module move mut mutable namespace new nil noexcept noinline nointerpolation noncoherent noperspective null nullptr of operator package packoffset partition pass patch pixelfragment precise precision premerge priv protected pub public readonly ref regardless register require resource restrict self set shared sizeof smooth snorm static std subroutine super target template this throw trait try type typedef typeid typename typeof union unless unorm unsafe unsized use using varying virtual volatile wgsl where with writeonly yield"].join(" ").split(" "));function wa(e,t){if(!Oh.test(e))throw new Error(`${t}: '${e}' can't name a fragment output. Start it with a lowercase letter and use only letters and digits, such as "velocity" or "objectId".`);if(Nh.has(e))throw new Error(`${t}: '${e}' can't name a fragment output, because WGSL or GLSL reserves the word. Pick another name, such as one with a prefix.`)}const me=Object.freeze(["color"]);function Sa(e){const t=Object.create(null),s=Object.create(null);for(const r of e)if(r.outputs)for(const[i,n]of Object.entries(r.outputs)){const o=t[i];if(o===void 0)wa(i,`Bit '${r.name}'`),t[i]=n,s[i]=r.name;else if(o!==n)throw new Error(`[collectFragmentOutputs] Output "${i}" is "${o}" in bit "${s[i]}" and "${n}" in bit "${r.name}". Bits that share an output must agree on its type.`)}return t}let $h=0;const fn=new WeakMap;var ee=class{bitsGpu;bitsGl;template;overrides;outputLocations;includeGlobal;includeCamera;keyGpu;keyGl;constructor(e){this.bitsGpu=e.bitsGpu??[],this.bitsGl=e.bitsGl??[],this.template=e.template,this.overrides=e.overrides,this.outputLocations=e.outputLocations??me,this.includeGlobal=e.includeGlobal,this.includeCamera=e.includeCamera,this._updateKeys()}update(e){return this.bitsGpu=e.bitsGpu??[],this.bitsGl=e.bitsGl??[],this.template=e.template,this.overrides=e.overrides,this.outputLocations=e.outputLocations??me,this.includeGlobal=e.includeGlobal,this.includeCamera=e.includeCamera,this._updateKeys(),this}_updateKeys(){for(let s=0;s<this.bitsGpu.length;s++)Te(this.bitsGpu[s]);for(let s=0;s<this.bitsGl.length;s++)Te(this.bitsGl[s]);let e=this.bitsGpu.map(s=>s.name).join("|"),t=this.bitsGl.map(s=>s.name).join("|");if(this.overrides){const s=Object.entries(this.overrides).map(([r,i])=>`${r}=${i}`).join(",");e+=`[${s}]`,t+=`[${s}]`}if(this.outputLocations!==me){let s=fn.get(this.outputLocations);s===void 0&&(s=`|out:${this.outputLocations.join(",")}`,fn.set(this.outputLocations,s)),e+=s,t+=s}if(this.template){const s=this.template._uid??=$h++;e+=`|tpl:${s}`,t+=`|tpl:${s}`}this.keyGpu=e,this.keyGl=t}};function Ta(e){return{shaderDescriptor:e.shaderDescriptor===void 0?void 0:e.shaderDescriptor instanceof ee?e.shaderDescriptor:new ee(e.shaderDescriptor),state:e.state,topology:e.topology}}var Ai=class{shader;mergedShader=null;state;topology;batchKey=0;lastGeometryUid=-1;lastMaterialUid=-1;constructor(e,t,s){this.shader=e,this.state=t,this.topology=s}isStaleFor(e){return this.shader._destroyed||this.lastGeometryUid!==e.geometry.uid||this.lastMaterialUid!==e.material.uid}claimBuiltFrom(e){this.lastGeometryUid=e.geometry.uid,this.lastMaterialUid=e.material.uid}};function Ca(e,t){e.blendMode=t.blendMode,e.polygonOffset=t.polygonOffset,e.data=t.data}const Da=4294967296,pn=4095,Uh=4096,Hh=1<<24,jh=65535,qh=2**40,Wh=255,Ba=2**48,Kh=15,Yh=Ba*16,Xh=8,mn=new Map;let Zh=0;function Qh(e){let t=mn.get(e);return t===void 0&&(t=Zh++,mn.set(e,t)),t}const gn=[];function ss(e,t){const s=Math.floor(e/Da);let r=gn[s];return r||(r=gn[s]=new zt,Ca(r,t)),r}function Jh(e,t,s){const r=Qh(s),i=e.geometry,n=i._geometryAtlasAllocation;t.batchKey=r*Da+i.uid;const o=n?n.atlas.uid<<Xh|i.uid&255:i.uid,a=e.material;e._sortKey=(a.alphaMode==="mask"?Yh:0)+Math.min(a._textures.length,Kh)*Ba+(r&Wh)*qh+(a._textureSetId&jh)*Hh+(o&pn)*Uh+(a.uid&pn)}const _n=Object.keys({opaque:!0,transmission:!0,transparent:!0}),yn=new WeakSet;function Ia(e){if(yn.has(e))return;const{name:t,bits:s}=e;if(wa(t,"SceneOutput"),t==="color")throw new Error("SceneOutput: 'color' is the scene colour's own output. Give the output another name.");for(const r in s){const i=s[r],n=i.outputs?.[t];if(!n)throw new Error(`SceneOutput '${t}': bit '${i.name}' for the ${r} pass doesn't declare it. Add \`${t}\` to the bit's \`outputs\`.`);if(r==="transparent"&&n!=="vec4<f32>"&&!e.format.includes("int"))throw new Error(`SceneOutput '${t}': bit '${i.name}' for the transparent pass writes it as ${n}. A blended surface blends what it writes, and WebGPU's blend reads the alpha, so write a float output as vec4<f32>, or give the output an integer format, which never blends.`)}yn.add(e)}function Ma(e,t){if(e===t)return!0;if(e.name!==t.name||e.format!==t.format)return!1;const s=e.clearValue,r=t.clearValue;if(s!==r&&(!s||!r||s[0]!==r[0]||s[1]!==r[1]||s[2]!==r[2]||s[3]!==r[3]))return!1;for(let i=0;i<_n.length;i++){const n=_n[i];if(e.bits?.[n]?.name!==t.bits?.[n]?.name)return!1}return!0}function td(e,t=[]){const s=[],r=(i,n)=>{Ia(i);const o=s.find(a=>a.name===i.name);if(!(o&&Ma(o,i))){if(o)throw new Error(`${n} uses a scene output named '${i.name}', and another pass uses a different one with that name. Share one definition between them, or rename one.`);s.push(i)}};for(let i=0;i<e.length;i++){const n=e[i],o=n.enabled?n.requiredOutputs:void 0;if(o)for(let a=0;a<o.length;a++)r(o[a],n.constructor.name)}for(let i=0;i<t.length;i++)r(t[i],"createDefaultGraph3D's `sceneOutputs`");return s.sort((i,n)=>i.name<n.name?-1:i.name>n.name?1:0)}function ed(e,t){const s=[];for(let r=0;r<e.length;r++){const i=e[r].bits?.[t];i&&s.push(i)}return s}function Pa(e,t,s){if(!t||s)return;const r=t.materialBits;for(let i=0;i<r.length;i++)e.push(r[i]);return t.outputLocations}const $={NONE:0,SHADOW:1,OPAQUE:2,TRANSPARENT:4,BACKGROUND:8,TRANSMISSION:16,BLENDED_REFRACTION:32,MATERIAL_PASS_MASK:54};var re=class{name;description;bit=0;pipe;descriptor;camera;_updatesViewKey=!0;attachedOutputs;materialBits;outputLocations;constructor(e){this.name=e.name,this.description=e.description,this.bit=Qt.getOrAllocate(e.name,e.bit),this.descriptor=e.descriptor?Ta(e.descriptor):void 0,this.camera=e.camera??null,this.attachedOutputs=e.attachedOutputs??[],this.materialBits=ed(this.attachedOutputs,this.name),this.outputLocations=this.attachedOutputs.length>0?["color",...this.attachedOutputs.map(t=>t.name)]:me,this.pipe=e.renderer.renderPipes.view3d}_writeTarget(e){e.writeColor(e.targetColor);for(let t=0;t<this.attachedOutputs.length;t++)e.writeColor(e.getSceneOutput(this.attachedOutputs[t]));e.writeDepth(e.targetDepth)}setup(e){}prepare(e){}render(e){}onRenderableDirty(e,t,s){const r=this.bit,i=t.drawLists[r],n=e.material;s||!this._updatesViewKey?i.drawDirtyId++:(i.move(e),t._editsPending=!0);const o=n._passes[r],a=this.descriptor,c=o&&o.shaderDescriptor||a&&a.shaderDescriptor;if(c){const u=e._passCache[r];if(!u||u.isStaleFor(e)){const h=this.pipe.renderer.material3d.compileShader(c,e,t),d=o&&o.state||a&&a.state||n.state,f=o&&o.topology||a&&a.topology||n.topology||e.geometry.topology;u?(u.shader=h,u.mergedShader=null,u.state=d,u.topology=f,u.claimBuiltFrom(e)):(e._passCache[r]=new Ai(h,d,f)).claimBuiltFrom(e)}}const l=e._passCache[r];l&&(Jh(e,l,this.pipe.renderer.material3d.computeBatchKey(e,r)),this._updatesViewKey&&i.view.updateKey(e.uid,e._sortKey))}destroy(){}},wt=class Aa{center;radius=0;type="sphere";constructor(t,s=-1){this.center=t!==void 0?t:new F,this.radius=s}set(t,s){return this.center.copyFrom(t),this.radius=s,this}setFromBox(t){if(t.isEmpty())return this.makeEmpty();const{min:s,max:r}=t;this.center.set((s.x+r.x)*.5,(s.y+r.y)*.5,(s.z+r.z)*.5);const i=r.x-s.x,n=r.y-s.y,o=r.z-s.z;return this.radius=.5*Math.sqrt(i*i+n*n+o*o),this}copyFrom(t){return this.center.copyFrom(t.center),this.radius=t.radius,this}copyTo(t){return t.center.copyFrom(this.center),t.radius=this.radius,t}clone(){return new Aa().copyFrom(this)}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}isEmpty(){return this.radius<0}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}distanceToPoint(t){return this.center.distanceTo(t)-this.radius}containsPoint(t){return this.center.distanceToSquared(t)<=this.radius*this.radius}intersectsBox(t){return t.intersectsSphere(this)}intersectsSphere(t){if(this.radius<0||t.radius<0)return!1;const s=this.radius+t.radius;return this.center.distanceToSquared(t.center)<=s*s}intersectsPlane(t){return this.radius<0?!1:Math.abs(t.distanceToPoint(this.center))<=this.radius}intersectsRay(t){return t.intersectsSphere(this)}applyMatrix4(t,s=this){return s!==this&&s.copyFrom(this),s.isEmpty()||(s.center.applyAffineMatrix4(t),s.radius=s.radius*t.getMaxScaleOnAxis()),s}getBounds(t){return t||=new Q,this.isEmpty()?t.makeEmpty():(t.min.set(this.center.x-this.radius,this.center.y-this.radius,this.center.z-this.radius),t.max.set(this.center.x+this.radius,this.center.y+this.radius,this.center.z+this.radius),t)}toString(){return`[@pixi/3d/math:Sphere center=(${this.center.x}, ${this.center.y}, ${this.center.z}) radius=${this.radius}]`}},ts=class{items=[];_indexKey;constructor(e){this._indexKey=e}add(e){e[this._indexKey]=this.items.length,this.items.push(e)}remove(e){const t=e[this._indexKey];if(t>-1){const s=this.items.length-1,r=this.items[s];this.items[t]=r,r[this._indexKey]=t,this.items.length=s,e[this._indexKey]=-1}}clear(){for(let e=0;e<this.items.length;e++)this.items[e][this._indexKey]=-1;this.items.length=0}};function Fa(e){if(e)return ArrayBuffer.isView(e)?{data:e}:{data:e.buffer.data,format:e.format}}function za(e,t,s,r,i=!1){const n=Fa(e);if(!n)return;if(n.format)return{data:n.data,size:hr(n.format).size,format:n.format};if(!r&&!(n.data instanceof Float32Array))throw new Error(`[Geometry3D] ${t} got ${n.data.constructor.name} data, which could be normalized or raw integers. Pass a Float32Array, or an Attribute whose format says which.`);const o=sd(n.data,s,r!=="int",i);return{data:o.data,size:o.size,format:id(o.data,o.size,o.normalized)}}function ka(e){const t=e.constructor,s=e.length/3,r=new t(s*4);for(let i=0;i<s;i++){const n=i*3,o=i*4;r[o]=e[n],r[o+1]=e[n+1],r[o+2]=e[n+2]}return r}function sd(e,t,s,r){if(r&&e instanceof Float32Array){const i=e.length/t,n=t===3?4:t,o=new Int16Array(i*n);for(let a=0;a<i;a++){const c=a*t,l=a*n;for(let u=0;u<t;u++){const h=e[c+u];o[l+u]=(h<-1?-1:h>1?1:h)*32767}}return{data:o,size:n,normalized:!0}}return t===3&&!(e instanceof Float32Array)?{data:ka(e),size:4,normalized:s}:{data:e,size:t,normalized:s}}function rd(e){let t=1/0,s=1/0,r=1/0,i=-1/0,n=-1/0,o=-1/0;for(let a=0;a<e.length;a+=3){const c=e[a],l=e[a+1],u=e[a+2];c<t&&(t=c),l<s&&(s=l),u<r&&(r=u),c>i&&(i=c),l>n&&(n=l),u>o&&(o=u)}return new Q(new F(t,s,r),new F(i,n,o))}function id(e,t,s){if(e instanceof Float32Array)return t===1?"float32":t===2?"float32x2":t===3?"float32x3":"float32x4";const r=t===3?"x4":`x${t}`;if(s){if(e instanceof Int8Array)return`snorm8${r}`;if(e instanceof Uint8Array)return`unorm8${r}`;if(e instanceof Int16Array)return`snorm16${r}`;if(e instanceof Uint16Array)return`unorm16${r}`}else{if(e instanceof Int8Array)return`sint8${r}`;if(e instanceof Uint8Array)return`uint8${r}`;if(e instanceof Int16Array)return`sint16${r}`;if(e instanceof Uint16Array)return`uint16${r}`;if(e instanceof Int32Array)return`sint32${r}`;if(e instanceof Uint32Array)return`uint32${r}`}return"float32x4"}function nd(e,t){const s=[],r=(d,f,p,m,_)=>{const g=za(d,f,p,m,_);g&&s.push({data:g.data,attribute:f,size:g.size,bytesPerElement:g.data.BYTES_PER_ELEMENT,format:g.format})};r(e.positions,"aPosition",3),r(e.uvs,"aUV",2),r(e.normals,"aNormal",3,"norm",e.quantizeNormals??!0),r(e.tangents,"aTangent",4,"norm",e.quantizeTangents??!0),r(e.joints,"aJoints",4,"int"),r(e.weights,"aWeights",4,"norm"),r(e.colors,"aColor",4,"norm"),r(e.colors1,"aColor1",4,"norm");let i=0;const n=[];for(let d=0;d<s.length;d++){const f=s[d];i=er(i),n.push(i),i+=f.size*f.bytesPerElement}i=er(i);let o;for(let d=0;d<s.length;d++)if(s[d].attribute==="aPosition"){o=s[d];break}const a=o.data.length/o.size,c=i*a,l=new ArrayBuffer(c),u={},h=new Se({data:new Uint8Array(l),label:"interleaved-mesh-buffer",shrinkToFit:t,usage:G.VERTEX|G.COPY_DST});for(let d=0;d<s.length;d++){const f=s[d],{data:p,attribute:m,size:_,bytesPerElement:g}=f,b=n[d],y=p.constructor,v=new y(l),x=i/g,w=b/g;if(_===2)for(let T=0;T<a;T++){const B=T*x+w,S=T*2;v[B]=p[S],v[B+1]=p[S+1]}else if(_===3)for(let T=0;T<a;T++){const B=T*x+w,S=T*3;v[B]=p[S],v[B+1]=p[S+1],v[B+2]=p[S+2]}else if(_===4)for(let T=0;T<a;T++){const B=T*x+w,S=T*4;v[B]=p[S],v[B+1]=p[S+1],v[B+2]=p[S+2],v[B+3]=p[S+3]}else for(let T=0;T<a;T++){const B=T*x+w,S=T*_;for(let C=0;C<_;C++)v[B+C]=p[S+C]}u[m]={buffer:h,format:f.format,stride:i,offset:b}}return u}function Ra(e){for(const t in e){const s=e[t];if(s.instance)continue;const r=s.stride;if(r)return s.buffer.data.byteLength/r}return 0}function od(e,t,s){if(!e){const r=Ra(t);if(r===0)return;e=r>65536?new Uint32Array(r):new Uint16Array(r);for(let i=0;i<r;i++)e[i]=i}return e instanceof Uint16Array&&e.byteLength%4!==0&&(e=new Uint32Array(e)),new Se({data:e,label:"index-mesh-buffer",shrinkToFit:s,usage:G.INDEX|G.COPY_DST})}function er(e){return e+3&-4}var Y=class Vs extends cs{static defaultOptions={topology:"triangle-list",shrinkBuffersToFit:!1,interleave:!1,quantizeNormals:!0,quantizeTangents:!0};static _empty=null;static get EMPTY(){return Vs._empty??=(()=>{const t=new Vs({attributes:{}});return t.destroy=na,t})()}bounds3D;boundsSphere;get vertexCount(){return Ra(this.attributes)}_geometryAtlasAllocation=null;_atlasVacated=!1;_meshes=new ts("_geometryMeshIndex");_geometryDataIndex=-1;_captureTick=-1;_geometryDataStore=null;dynamic;morphTargetCount=0;_morphDeltaBase=-1;_morphDeltaFloats=0;_morphStore=null;hasMorphNormals;_morphBoundsExpansion=0;_morphTargets=null;_attributeKey=null;_destroyed=!1;get attributeKey(){if(this._attributeKey)return this._attributeKey;const t=this.attributes,s=Object.keys(t).sort();let r="";for(let i=0;i<s.length;i++){const n=s[i],o=t[n];o.instance||(r+=`${n}:${o.format}|`)}return this._attributeKey=r,r}constructor(t){t={...Vs.defaultOptions,...t};const{positions:s,uvs:r,normals:i,tangents:n,joints:o,weights:a,colors:c,colors1:l}=t,u=t.shrinkBuffersToFit;let h={};if(t.attributes)h=t.attributes;else if(t.interleave)h=nd(t,u);else{const d=(f,p,m,_,g)=>{const b=za(f,p,m,_,g);if(!b)return;const y=new Se({data:b.data,label:`attribute-mesh-${p.toLowerCase().substring(1)}`,shrinkToFit:u,usage:G.VERTEX|G.COPY_DST});h[p]={buffer:y,format:b.format,stride:b.size*b.data.BYTES_PER_ELEMENT,offset:0}};d(s,"aPosition",3),d(r,"aUV",2),d(i,"aNormal",3,"norm",t.quantizeNormals??!0),d(n,"aTangent",4,"norm",t.quantizeTangents??!0),d(o,"aJoints",4,"int"),d(a,"aWeights",4,"norm"),d(c,"aColor",4,"norm"),d(l,"aColor1",4,"norm")}if(super({attributes:h,indexBuffer:t.indices instanceof Se?t.indices:od(t.indices,h,u),indexCount:t.indexCount,topology:t.topology}),this._morphTargets=t.morphTargets??null,this.morphTargetCount=t.morphTargets?.length??0,this.hasMorphNormals=this.morphTargetCount>0&&t.morphTargets.every(d=>!!d.normals),this.dynamic=t.dynamic??!1,t.bounds3D)this.bounds3D=t.bounds3D;else if(s){const{data:d,format:f}=Fa(s);if(f&&!f.startsWith("float32"))throw new Error(`[Geometry3D] ${f} positions need bounds3D: only float positions are scanned for it.`);this.bounds3D=rd(d)}else this.bounds3D=new Q;this.boundsSphere=new wt().setFromBox(this.bounds3D)}destroy(t){this._destroyed||(this._geometryAtlasAllocation?.atlas.remove(this),this._geometryDataStore?.remove(this),this._geometryDataStore=null,this._morphStore?.freeDeltas(this),super.unload(),this._meshes.clear(),this._destroyed=!0,super.destroy(t))}unload(){if(this._destroyed)return;const t=this._geometryAtlasAllocation;t?.atlas.remove(this);const s=this.buffers;for(let i=0;i<s.length;i++)s[i].unload();if(super.unload(),t===null&&!this.dynamic)return;const r=this._meshes.items;for(let i=0;i<r.length;i++)r[i]._markBatchDirty()}get positions(){return this.attributes.aPosition.buffer.data}set positions(t){this.attributes.aPosition.buffer.data=t}get uvs(){return this.attributes.aUV?.buffer.data}set uvs(t){this.attributes.aUV&&(this.attributes.aUV.buffer.data=t)}get normals(){return this.attributes.aNormal?.buffer.data}set normals(t){this.attributes.aNormal&&(this.attributes.aNormal.buffer.data=t)}get tangents(){return this.attributes.aTangent?.buffer.data}set tangents(t){this.attributes.aTangent&&(this.attributes.aTangent.buffer.data=t)}get indices(){return this.indexBuffer.data}set indices(t){this.indexBuffer.data=t}};function xn(e){return e.geometry instanceof Y}function La(e,t){return t===null?null:typeof t=="string"?t==="box"?xn(e)?e.geometry.bounds3D:ba(e,new Q,!1):t==="geometry"?xn(e)?e.geometry:(V("hitVolume: 'geometry' requires a Mesh3D — plain Container3D has no geometry; ignoring hitVolume"),null):(V(`hitVolume: unsupported string '${String(t)}'. Expected 'box' or 'geometry'; ignoring hitVolume`),null):t instanceof Q?t:t instanceof wt?t.radius<0?(V("hitVolume: Sphere has a negative radius (empty) — ignoring hitVolume. Did you omit the radius argument?"),null):t:t instanceof Y||typeof t.raycast=="function"&&typeof t.boundingRadiusSq=="number"?t:(V("hitVolume: expected Box, Sphere, Geometry3D, an IHitVolume3D, string shorthand, or null; ignoring hitVolume"),null)}const bn=new Map;let ad=0;function vn(e){let t=2166136261,s=2654435769;for(let n=0;n<e.length;n++){const o=e[n].source.uid;t=Math.imul(t^o,16777619),s=Math.imul(s+o,2246822507),s^=s>>>13}const r=(s>>>11)*4294967296+(t>>>0);let i=bn.get(r);return i===void 0&&(i=ad++,bn.set(r,i)),i}function cd(e){const t=Object.keys(e).map((a,c)=>{const l=oa[e[a]];return{name:a,align:l?.align??0,size:l?.size??0,index:c}});t.sort((a,c)=>c.align-a.align||c.size-a.size||a.index-c.index);const s=t.filter(a=>a.align>=8),r=t.filter(a=>a.align>0&&a.align<8),i=t.filter(a=>a.align===0),n={};let o=0;for(const a of s)if(n[a.name]=e[a.name],a.align===16&&a.size===12&&o<r.length){const c=r[o++];n[c.name]=e[c.name]}for(let a=o;a<r.length;a++)n[r[a].name]=e[r[a].name];for(const a of i)n[a.name]=e[a.name];return n}function hs(e){return typeof e=="string"?e:e.type}function ld(e){return typeof e=="string"?"both":e.visibility??"both"}function ud(e){return typeof e=="object"&&typeof e.type!="string"}function*Re(e,t){for(const[s,r]of Object.entries(e))if(ud(r))for(const[i,n]of Object.entries(r))yield{name:i,spec:n,uniformGroup:s};else yield{name:s,spec:r,uniformGroup:t}}function rs(e){return e.charAt(0).toUpperCase()+e.slice(1)}const Fi=new Set(Object.keys({"texture_2d<f32>":!0,"texture_2d<u32>":!0,"texture_2d<i32>":!0,"texture_2d_array<f32>":!0,"texture_3d<f32>":!0,"texture_cube<f32>":!0,"texture_cube_array<f32>":!0,texture_depth_2d:!0,texture_depth_2d_array:!0,texture_depth_cube:!0,texture_depth_cube_array:!0,sampler:!0,sampler_comparison:!0}));function mr(e){return/^storage<.*>$/.test(e)}function hd(e){const t=e.match(/^storage<(\w+(?:<\w+>)?)>$/);return t?t[1]:null}function gr(e){return/^uniform<.*>$/.test(e)}function Ea(e){const t=e.match(/^uniform<(\w+)>$/);return t?t[1]:null}const dd=new Set(["f32","vec2<f32>","vec3<f32>","vec4<f32>","mat2x2<f32>","u32","i32"]);function _r(e){const t={};for(const s of e){const r=s.bindings?.material;if(r)for(const{name:i,spec:n}of Re(r,"material")){const o=hs(n);if(Fi.has(o)||mr(o)||gr(o))continue;if(!dd.has(o))throw new Error(`[mergeMaterialStruct] Material field "${i}" in bit "${s.name}" is "${o}". Material fields must be f32, u32, i32, a vec2, vec3 or vec4 of f32, or mat2x2<f32>.`);const a=t[i];a===void 0?t[i]=o:a!==o&&V(`[mergeMaterialStruct] Material field "${i}" redefined by bit "${s.name}" with a different type: "${a}" → "${o}". Keeping original.`)}}return cd(t)}function Va(e){return JSON.stringify(e)}const yr=new L({source:new Ae({resource:new Uint8Array([128,128,255,255]),width:1,height:1,alphaMode:"premultiply-alpha-on-upload",label:"NORMAL"}),label:"NORMAL"}),is=new Set([L.WHITE,L.EMPTY,yr]),Ot=bt.from({faces:{left:L.EMPTY,right:L.EMPTY,top:L.EMPTY,bottom:L.EMPTY,front:L.EMPTY,back:L.EMPTY},label:"pixijs-3d-empty-skybox"}),Xt=new L({source:new Ae({resource:new Uint32Array(4),width:1,height:1,format:"rgba32uint",scaleMode:"nearest",alphaMode:"no-premultiply-alpha",label:"UINT_EMPTY"}),label:"UINT_EMPTY"}),zi=new L({source:new dr({width:1,height:1,format:"depth32float",scaleMode:"nearest",viewDimension:"2d-array",autoGenerateMipmaps:!1,arrayLayerCount:4,compare:"less",label:"DEPTH_EMPTY"}),label:"DEPTH_EMPTY"}),fd=new L({source:new dr({width:1,height:1,format:"depth24plus-stencil8",scaleMode:"nearest",viewDimension:"2d",autoGenerateMipmaps:!1,label:"DEPTH_2D_EMPTY"}),label:"DEPTH_2D_EMPTY"}),ki=new aa(fd.source,{aspect:"depth-only"}),fi=new Set;Fe.register({clear:()=>fi.clear()});function pt(e,...t){fi.has(e)||(fi.add(e),V(...t))}const xr=4096,Ss=xr*4,Ri=4095,Ga=Math.log2(xr);function se(e){return e<=Ss||e%Ss===0?e:e+Ss-e%Ss}function ns(e){const t=e/4,s=Math.min(t,xr);return{width:s,height:Math.ceil(t/s)}}function pi(e){const{width:t,height:s}=ns(e.length);return new Ae({resource:new Uint32Array(e.buffer),width:t,height:s,format:"rgba32uint",scaleMode:"nearest",alphaMode:"no-premultiply-alpha"})}function Oa(e,t,s){s-t>=4096&&(t&=-4096,s=s+Ri&-4096),e.update(t,s)}function Ce(e,t,s){Oa(e,Math.floor(t/4),Math.ceil(s/4))}function Pt(e){return`ivec2((${e}) & ${Ri}, (${e}) >> ${Ga})`}function pd(e){return`vec2<i32>((${e}) & ${Ri}, (${e}) >> ${Ga})`}function Li(e){const t=[];let s=0;for(var r in e){const i=e[r],n=oa[i];n&&(s=Math.ceil(s/n.align)*n.align,t.push({name:r,type:i,offset:s,size:n.size,components:n.size/4}),s+=n.size)}return{elements:t,size:s}}const wn=new Map,Sn=16;function Tn(e,t){const s=wn.get(t);if(s)return s;const r=Li(e),i=Math.max(1,Math.ceil(r.size/Sn))*Sn;class n{_f32;_u32;_material;_views=Object.create(null);constructor(l){this._material=l;const u=new ArrayBuffer(i);this._f32=new Float32Array(u),this._u32=new Uint32Array(u)}}const o=n.prototype;for(const c of r.elements){const l=c.offset/4,{components:u}=c;if(u===1){const h=c.type==="u32"||c.type==="i32";Object.defineProperty(o,c.name,{enumerable:!0,get(){return(h?this._u32:this._f32)[l]},set(d){const f=h?this._u32:this._f32;f[l]!==(h?d:Math.fround(d))&&(f[l]=d,this._material.update())}})}else{const h=l+u,d=c.name;Object.defineProperty(o,d,{enumerable:!0,get(){return this._views[d]??=this._f32.subarray(l,h)},set(f){(this._views[d]??=this._f32.subarray(l,h)).set(f),this._material.update()}})}}const a=n;return wn.set(t,a),a}const Cn=new Map;function md(e){const t=e.join(`
`);let s=Cn.get(t);if(s)return s;class r{_material;constructor(n){this._material=n,Object.seal(this)}}return e.forEach((i,n)=>{Object.defineProperty(r.prototype,i,{get(){return this._material._textures[n]},set(o){this._material._setTextureSlot(n,o)},enumerable:!0,configurable:!1})}),s=r,Cn.set(t,s),s}function gd(e){const t=e,s=t.resources,r=e._resourceKeys;for(let i=0;i<r.length;i++){const n=r[i],o=s[n];if(!o)continue;if(o.destroyed){s[n]=null,t._rekey(n,-1);continue}const a=o._resourceId;t._keyedIds[n]!==a&&t._rekey(n,a)}}function Na(e){return{structSnapshot:Va(_r(e)),textureNames:ge(e)}}function $a(e,t){const s=e.structSnapshot;if(s!==t._materialStructSnapshot)throw new Error(`[validateMaterialStruct] Compiled Material struct does not match the material's construction-time layout.
  compiled:     ${s}
  construction: ${t._materialStructSnapshot}
Material-group struct fields may only come from construction-pinned bits — a per-mesh/per-view bit is declaring \`bindings.material\` fields, or a custom getPrimaryDescriptor diverges from its constructor.`)}function ge(e){const t=[];for(const s of e)if(s.textures)for(const r of s.textures)t.push(r);return t}function Ua(e,t){const s=e.textureNames;for(let r=0;r<s.length;r++)if(t._slotByName[s[r]]!==r)throw new Error(`[validateMaterialTextureSlots] Shader texture slots do not match the material's derived layout. Shader order: [${s.join(", ")}]; material slots: ${JSON.stringify(t._slotByName)}. Every texture-bearing bit must be part of the material's texture derivation.`);if(s.length!==t._textures.length)throw new Error(`[validateMaterialTextureSlots] Material allocates ${t._textures.length} texture slot(s) but the shader declares ${s.length} ([${s.join(", ")}]). Slots and bit declarations must derive together.`)}function Ei(){const e=new zt;return e.depthTest=!0,e.blend=!1,e.culling=!0,e}let _d=0;const Dn=new Float32Array([1,0,0,1]),yd="unknown";function Bn(e){if(e.rotate!==0)return!1;if(e.noFrame)return!0;const t=e.frame;return t.x===0&&t.y===0&&t.width===e.source.width&&t.height===e.source.height}function _e(e){return Math.pow(e,2.2)}function te(e){return Math.pow(e,1/2.2)}function At(e,t,s,r=1){e[t]=_e(s.red)*r,e[t+1]=_e(s.green)*r,e[t+2]=_e(s.blue)*r}function Ha(e,t,s,r){e[t]+=_e(s.red)*r,e[t+1]+=_e(s.green)*r,e[t+2]+=_e(s.blue)*r}function In(e){return typeof e=="object"&&e!==null&&Object.getPrototypeOf(e)===Object.prototype}const xd=new Set(["baseColor","displayBaseColor","alphaCutoff","uvTransformRow0","uvOffset"]);var sr=class Gs{static _empty=null;static get EMPTY(){return Gs._empty??=(()=>{const t=new Gs;return t.destroy=na,t})()}uid=_d++;state;destroyed=!1;topology;_textures=[];_captureTick=-1;_slotByName=Object.create(null);_bindGroup=null;_mergedBindGroup=null;_textureSetId=0;_baseColorLinear=new Float32Array([1,1,1]);_baseColorTint=16777215;_alpha=1;_alphaCutoff=.5;_alphaMode="opaque";_passBit=$.OPAQUE;_meshes=new ts("_materialMeshIndex");_materialIndex=-1;_lastTextureDirtyId=-1;_uniformResource=null;_descriptorDirtyId=0;doubleSided;_skipsToneCurve=!1;colorSpace="linear";fog;flatShading;vertexColors=!1;lit=!0;label;_uvTransformRow0;_uvOffset;_uvTransformExplicit;_uvTransform;_initialUvTransform;_materialStructSnapshot="{}";data;textures;_uploadQueue=null;_storeQueued=!1;update(){this._uploadQueue?.enqueueDirty(this)}_variantDirty=!0;_passes={};extraBits;_descriptorOptions;_descriptor;constructor(t={}){if(t.baseColor!==void 0&&(this.baseColor=t.baseColor),this._alpha=t.alpha??1,this._alphaCutoff=t.alphaCutoff??.5,this.state=Ei(),this.alphaMode=t.alphaMode??"opaque",this.doubleSided=t.doubleSided??!1,this.state.culling=!this.doubleSided,this.flatShading=t.flatShading??!1,this.fog=t.fog??!0,this.label=t.label,this.vertexColors=t.vertexColors??!1,this.extraBits=t.extraBits??[],this._uvTransformExplicit=!!t.uvTransform,this._initialUvTransform=t.uvTransform,t.descriptor){const s=this._descriptorOptions=t.descriptor,r=this.extraBits;this._descriptor=new ee(r.length===0?s:{...s,bitsGpu:[...s.bitsGpu??[],...r],bitsGl:[...s.bitsGl??[],...r]}),this._deriveLayoutFromBits(this._descriptor.bitsGpu,{baseColor:t.baseColorTexture,...t.textures});const i=ge(this._descriptor.bitsGl).join("|"),n=ge(this._descriptor.bitsGpu).join("|");if(i!==n)throw new Error(`[BaseMaterial3D] descriptor.bitsGl declares textures [${i}] but bitsGpu declares [${n}]. Both backends bind from the same derived slots, so the sequences must match.`)}if(t.passes)for(const s in t.passes){const r=t.passes[s];if(!r)continue;const i=Qt.getOrAllocate(s);r!==!0&&(this._passes[i]=Ta(r)),this._passBit|=i}this.topology=t.topology,this.data??=new(Tn({},"{}"))(this)}_getBindGroup(){let t=this._bindGroup;const s=this._textures;if(t||(t=this._bindGroup=new gt,this._refreshTextureBindingsOf(t)),this._materialStructSnapshot!=="{}"){const r=this._uploadQueue;if(!r)throw new Error("[BaseMaterial3D] _getBindGroup on a material no store has registered; a mesh drawing it registers it first");const i=s.length*2,n=r.uniformResource(this);t.getResource(i)!==n&&t.setResourceUnwatched(n,i)}return t}_getMergedBindGroup(){let t=this._mergedBindGroup;return t||(t=this._mergedBindGroup=new gt,this._refreshTextureBindingsOf(t)),t}_deriveLayoutFromBits(t,s={}){const r=this._textures;r.length=0,this._slotByName=Object.create(null);const i=_r(t);this._materialStructSnapshot=Va(i),this.data=new(Tn(i,this._materialStructSnapshot))(this);const n=this.data.baseColor;n&&(n.set(this._baseColorLinear),n[3]=this._alpha);const o=this.data.displayBaseColor;if(o){for(let c=0;c<3;c++)o[c]=te(this._baseColorLinear[c]);o[3]=this._alpha}typeof this.data.alphaCutoff=="number"&&(this.data.alphaCutoff=this._alphaCutoff),this.data.uvTransformRow0!==void 0&&(this._uvTransformRow0=this.data.uvTransformRow0,this._uvOffset=this.data.uvOffset,this._uvTransformRow0.set(Dn),this._initialUvTransform&&(this.uvTransform=this._initialUvTransform,this._initialUvTransform=void 0));const a=[];for(const c of t)if(c.textures)for(const l of c.textures){if(this._slotByName[l]!==void 0)throw new Error(`[BaseMaterial3D] Duplicate texture '${l}' — bit "${c.name}" redeclares a name another bit in this material already claimed.`);this._slotByName[l]=r.length,r.push(s[l]??L.WHITE),a.push(l)}this.textures=new(md(a))(this),this._textureSetId=vn(r),this._deriveUvFrame()}_setTextureSlot(t,s){const r=this._textures[t];r!==s&&(this._textures[t]=s,r?.source!==s.source&&(this._textureSetId=vn(this._textures),this._releaseBindGroup(),this._markDescriptorDirty()),t===this._slotByName.baseColor?this._deriveUvFrame():this._uvTransformRow0&&!Bn(s)&&!this._frameMatchesTransform(s)&&pt("pixijs-3d-uv-frame-secondary","[@pixi/3d] A framed texture landed in a non-baseColor slot but the material UV transform (derived from the baseColor slot, or set explicitly) doesn't match its frame. The shared transform cannot serve per-slot frames — pack secondary maps to match the baseColor frame."))}getPrimaryDescriptor(t){return this._descriptor}enablePass(t){const s=this._passBit;this._passBit|=Qt.getOrAllocate(t),this._passBit!==s&&this._markDescriptorDirty()}disablePass(t){const s=Qt.get(t);if(s===void 0||(this._passBit&s)===0)return;this._passBit&=~s;const r=this._meshes.items;for(let i=0;i<r.length;i++)r[i]._queueMeshUpdate()}_markDescriptorDirty(){this._descriptorDirtyId++;const t=this._meshes.items;for(let s=0;s<t.length;s++)t[s]._markBatchDirty()}_invalidateDescriptor(){this._variantDirty=!0,this._markDescriptorDirty()}get alphaMode(){return this._alphaMode}set alphaMode(t){if(this._alphaMode===t)return;this._alphaMode=t;const s=t==="blend";this.state.blend=s,this.state.depthMask=!s,this._passBit=this._passBit&-7|(s?$.TRANSPARENT:$.OPAQUE),this.update(),this._invalidateDescriptor()}get baseColor(){return this._baseColorTint}set baseColor(t){const s=vt.shared.setValue(t);this._baseColorTint=s.toNumber(),At(this._baseColorLinear,0,s);const r=this.data?.baseColor;if(r){r.set(this._baseColorLinear);const i=this.data.displayBaseColor;i&&s.toRgbArray(i),this.update()}}get alpha(){return this._alpha}set alpha(t){if(this._alpha===t)return;this._alpha=t;const s=this.data?.baseColor;if(s){s[3]=t;const r=this.data.displayBaseColor;r&&(r[3]=t),this.update()}}get alphaCutoff(){return this._alphaCutoff}set alphaCutoff(t){this._alphaCutoff!==t&&(this._alphaCutoff=t,typeof this.data?.alphaCutoff=="number"&&(this.data.alphaCutoff=t))}get uvTransform(){return this._uvTransform}set uvTransform(t){if(!this._uvTransformRow0){t&&V("BaseMaterial3D: uvTransform is inert — this material's descriptor bits declare no uvTransform fields (include uvTransformBit to enable it).");return}if(!t){this._uvTransformExplicit=!1,this._uvTransform=void 0,this._uvTransformRow0.set(Dn),this._uvOffset.fill(0),this.update(),this._deriveUvFrame();return}this._uvTransformExplicit=!0,this._uvTransform??=new fr,this._uvTransform.copyFrom(t),this._uvTransformRow0[0]=t.a,this._uvTransformRow0[1]=t.b,this._uvTransformRow0[2]=t.c,this._uvTransformRow0[3]=t.d,this._uvOffset[0]=t.tx,this._uvOffset[1]=t.ty,this.update()}_deriveUvFrame(){const t=this._uvTransformRow0,s=this._uvOffset;if(!t||!s)return;const r=this._slotByName.baseColor,i=r===void 0?void 0:this._textures[r],n=i!==void 0&&!Bn(i);if(this._uvTransformExplicit){n&&pt("pixijs-3d-uv-frame-explicit","[@pixi/3d] A framed baseColor texture was assigned but the material has an explicit uvTransform, which wins — the frame is not applied. Clear material.uvTransform to derive from the texture frame.");return}let o=1,a=0,c=0,l=1,u=0,h=0;if(n){i.trim&&pt("pixijs-3d-uv-frame-trimmed","[@pixi/3d] The baseColor texture is trimmed. Trims describe where a sprite quad shrank and cannot map onto arbitrary mesh UVs — the trim is ignored; only the frame applies. Pack 3D textures without trimming.");const d=i.uvs;o=Math.fround(d.x1-d.x0),a=Math.fround(d.x3-d.x0),c=Math.fround(d.y1-d.y0),l=Math.fround(d.y3-d.y0),u=Math.fround(d.x0),h=Math.fround(d.y0)}t[0]===o&&t[1]===a&&t[2]===c&&t[3]===l&&s[0]===u&&s[1]===h||(t[0]=o,t[1]=a,t[2]=c,t[3]=l,s[0]=u,s[1]=h,this.update())}_frameMatchesTransform(t){const s=this._uvTransformRow0,r=this._uvOffset,i=t.uvs;return s[0]===Math.fround(i.x1-i.x0)&&s[1]===Math.fround(i.x3-i.x0)&&s[2]===Math.fround(i.y1-i.y0)&&s[3]===Math.fround(i.y3-i.y0)&&r[0]===Math.fround(i.x0)&&r[1]===Math.fround(i.y0)}clone(t){const s=this._toOptions(),r=it(t??{});for(const[f,p]of Object.entries(r)){const m=s[f];s[f]=f!=="descriptor"&&In(p)&&In(m)?{...m,...it(p)}:p}const i=this.extraBits,n=r.extraBits?.filter(f=>!i.some(p=>p.name===f.name))??[];s.extraBits=[...i,...n];const o=new this.constructor(s),a=o.data;if(this._toOptions===Gs.prototype._toOptions){for(const p of Object.keys(Object.getPrototypeOf(this.data)))!xd.has(p)&&p in a&&(a[p]=this.data[p]);const f=r.textures??{};for(const p in this._slotByName){const m=o._slotByName[p],_=p==="baseColor"?r.baseColorTexture??f.baseColor:f[p];m!==void 0&&_===void 0&&o._setTextureSlot(m,this._textures[this._slotByName[p]])}}else for(const f of i)for(const p in f.bindings?.material)a[p]=this.data[p];const c=o.state,{blend:l,depthMask:u,culling:h,blendMode:d}=c;return Ca(c,this.state),"alphaMode"in r&&(c.blend=l,c.depthMask=u),"doubleSided"in r&&(c.culling=h),"blendMode"in r&&(c.blendMode=d),o.colorSpace=this.colorSpace,o.lit=this.lit,o}_toOptions(){const t={};for(let r=this._passBit&-55;r;r&=r-1){const i=r&-r,n=Qt.nameOf(i);n&&(t[n]=this._passes[i]??!0)}const s={};for(const r of ge(this.extraBits))s[r]=this._textures[this._slotByName[r]];return{label:this.label,descriptor:this._descriptorOptions,baseColor:this.baseColor,alpha:this.alpha,baseColorTexture:this._textures[this._slotByName.baseColor],textures:s,alphaMode:this.alphaMode,alphaCutoff:this.alphaCutoff,doubleSided:this.doubleSided,flatShading:this.flatShading,fog:this.fog,vertexColors:this.vertexColors,topology:this.topology,passes:t,uvTransform:this._uvTransformExplicit?this.uvTransform:void 0}}unload(){if(this.destroyed)return;this._releaseBindGroup(),this._markDescriptorDirty();const t=new Set;for(const s of this._textures){if(!s||is.has(s))continue;const r=s.source;!r||t.has(r)||(t.add(r),r.uploadMethodId!==yd&&r.unload())}}destroy(t){if(!this.destroyed){if(this.destroyed=!0,this._releaseBindGroup(),Ut(t,"texture")){const s=Ut(t,"textureSource")?new Set:void 0;for(const r of this._textures)if(!(!r||is.has(r)))if(s){const i=r.source;r.destroy(!1),i&&!s.has(i)&&(s.add(i),i.destroy())}else r.destroy(!1)}this._uploadQueue?.remove(this),this._uploadQueue=null,this._storeQueued=!1,this._meshes.clear(),this._uniformResource?.destroy(!1),this._uniformResource=null,this.data=null,this.textures=null,this._textures=null,this._slotByName=null,this._descriptor=void 0,this._passes=null,this._uvTransformRow0=void 0,this._uvOffset=void 0,this._descriptorOptions=null}}_refreshTextureBindings(){this._bindGroup&&this._refreshTextureBindingsOf(this._bindGroup),this._mergedBindGroup&&this._refreshTextureBindingsOf(this._mergedBindGroup)}_refreshTextureBindingsOf(t){const s=this._textures;for(let r=0;r<s.length;r++){const i=s[r].source;t.setResourceUnwatched(i,r*2),i.style&&t.setResourceUnwatched(i.style,r*2+1)}gd(t)}_releaseBindGroup(){this._bindGroup=null,this._mergedBindGroup=null}},Mn=class{weights;_weightIndex=0;_slot=-1;_slotSize=0;_store=null;constructor(e){this.weights=e}};const Vr=new wt;var ye=class ja extends tt{static defaultOptions={castShadow:!0,receiveShadow:!0,billboardMode:"none"};_geometry;_material;_placeholderMask=0;_billboardMode;_worldBoundsSphere=null;_worldBoundsCacheId=-1;skeleton;receiveShadow;_morph;_enabledPassBits=0;_disabledPassBits=0;_passCache=Object.create(null);_storeIndex=-1;_lastBonePitIndex=-1;_sortKey=0;_batchDirty=!0;didRenderableUpdate=!1;_geometryMeshIndex=-1;_materialMeshIndex=-1;_lastRenderPass=0;_lastDescriptorDirtyId=-1;_lastWorldVisible=1;_skinnedMeshIndex=-1;_morphedMeshIndex=-1;_allMeshIndex=-1;constructor(t={}){const{geometry:s=Y.EMPTY,material:r=sr.EMPTY,skeleton:i,castShadow:n,receiveShadow:o,billboardMode:a,weights:c,hitVolume:l,width:u,height:h,depth:d,parent:f,...p}={...ja.defaultOptions,...it(t)};super({label:"Mesh3D",...p}),this._geometry=s,this._material=r,this._updatePlaceholderMask(),this.skeleton=i,n&&(this._enabledPassBits=$.SHADOW),this.receiveShadow=o,this._billboardMode=a,s.morphTargetCount>0&&(this._morph=new Mn(c??new Float32Array(s.morphTargetCount))),l!==void 0&&(this.hitVolume=l),u!==void 0&&(this.width=u),h!==void 0&&(this.height=h),d!==void 0&&(this.depth=d),f?.addChild(this)}get weights(){return this._morph?.weights}set weights(t){this._morph&&t&&(this._morph.weights=t)}get geometry(){return this._geometry}set geometry(t){this._geometry!==t&&(this._view3d&&(this._geometry._meshes.remove(this),t._meshes.add(this)),this._geometry=t,this._markBatchDirty(),this._markStoreDirty(),this._worldBoundsCacheId=-1,this._updatePlaceholderMask(),t.morphTargetCount!==(this._morph?.weights.length??0)&&this._replaceMorph(),typeof this._hitVolumeInput=="string"&&(this._hitVolumeResolved=La(this,this._hitVolumeInput)))}_replaceMorph(){const t=this._morph;t?._store?.freeSlot(t);const s=this._geometry.morphTargetCount,r=s>0?new Mn(new Float32Array(s)):void 0;this._morph=r;const i=this._view3d;i&&(t&&!r?i._morphedMeshes.remove(this):!t&&r&&i._morphedMeshes.add(this))}_getDefaultHitVolume(){return this._geometry.bounds3D}get material(){return this._material}set material(t){this._material!==t&&(this._view3d&&(this._material._meshes.remove(this),t._meshes.add(this)),this._material=t,this._markBatchDirty(),this._markStoreDirty(),this._lastDescriptorDirtyId=-1,this._updatePlaceholderMask())}_updatePlaceholderMask(){this._placeholderMask=this._geometry===Y.EMPTY||this._material===sr.EMPTY?0:-1}_markBatchDirty(){this._batchDirty=!0,this._queueMeshUpdate()}_markStoreDirty(){this._storeDirty=!0,this._queueMeshUpdate()}_queueMeshUpdate(){this.didRenderableUpdate||!this._view3d||(this.didRenderableUpdate=!0,this._view3d._onRenderableUpdate(this))}get castShadow(){return(this._enabledPassBits&$.SHADOW)!==0}set castShadow(t){t?this._enablePassBit($.SHADOW):this._disablePassBit($.SHADOW)}enablePass(t){this._enablePassBit(Qt.getOrAllocate(t))}disablePass(t){const s=Qt.get(t);s!==void 0&&this._disablePassBit(s)}_enablePassBit(t){this._enabledPassBits&t||(this._enabledPassBits|=t,this._disabledPassBits&=~t,this._markBatchDirty())}_disablePassBit(t){this._disabledPassBits&t||(this._enabledPassBits&=~t,this._disabledPassBits|=t,this._queueMeshUpdate())}get billboardMode(){return this._billboardMode}set billboardMode(t){this._billboardMode!==t&&(this._billboardMode=t,this._markBatchDirty())}get renderPassMask(){const t=this._material._passBit,s=(this._enabledPassBits|t)&~this._disabledPassBits&this._placeholderMask;return t&($.TRANSPARENT|$.TRANSMISSION)?s&-2:s}get boundingSphere(){const t=this._worldBoundsSphere||=new wt;if(this._worldBoundsCacheId!==this._worldTransformId){this._worldBoundsCacheId=this._worldTransformId;const s=this._geometry;s.dynamic?t.makeEmpty():this._morph&&s._morphBoundsExpansion>0?(Vr.copyFrom(s.boundsSphere),Vr.radius+=s._morphBoundsExpansion,Vr.applyMatrix4(this.worldTransform,t)):s.boundsSphere.applyMatrix4(this.worldTransform,t)}return t}invalidate(){this._markBatchDirty()}unload(){this.destroyed||(super.unload(),this._geometry.unload(),this._markBatchDirty(),this._markStoreDirty())}_storeWorldTransform(){const t=this._storeIndex;if(t<0){this._markStoreDirty();return}const s=this._view3d._sceneBatch.storeBuffer,r=this.worldTransform;if(s.writeWorldTransform(t,r.elements64),s.writesSpheres){const i=this._geometry;s.writeBoundingSphere(t,r.elements,0,i,this._morph?i._morphBoundsExpansion:0)}}_storeWorldVisible(){if(this._worldVisible===this._lastWorldVisible)return;this._lastWorldVisible=this._worldVisible;const t=this._view3d._sceneBatch;this._storeIndex<0?this._markStoreDirty():t.storeBuffer.writeVisibility(this._storeIndex,this._worldVisible),t._visibilityDirtyId++}destroy(t){this.destroyed||(super.destroy(t),this._passCache=Object.create(null),this._storeIndex=-1,this._allMeshIndex=-1,this._geometry._meshes.remove(this),this._material._meshes.remove(this),this._skinnedMeshIndex=-1,this._morphedMeshIndex=-1,Ut(t,"geometry")&&this._destroyGeometry(),Ut(t,"material")&&this._material.destroy(t),this._geometry=null,this._material=null)}_destroyGeometry(){this._geometry.destroy(!0)}},bd=class Os{animation;player;time=0;animationSpeed=1;loop=!0;weight=1;onComplete=null;onLoop=null;_playing=!1;_completed=!1;_looped=!1;_trackIndices;_accumulators=[];static _scratchBuffer=new Float32Array(4);constructor(t,s){this.player=t,this.animation=s,this._trackIndices=new Int32Array(s.tracks.length);for(let r=0;r<s.tracks.length;r++)s.tracks[r].valueSize>Os._scratchBuffer.length&&(Os._scratchBuffer=new Float32Array(s.tracks[r].valueSize))}get playing(){return this._playing}play(){return this._playing||this.player.destroyed?this:(this._playing=!0,this.player._activate(this),this)}stop(){return this._playing?(this._playing=!1,this.player._deactivate(),this):this}gotoAndPlay(t){return this.time=t,this.play()}gotoAndStop(t){return this.player.destroyed?this:(this.stop(),this.time=t,this._applyPose(),this)}_update(t){if(!this._playing)return;const s=this.animation.duration;let r=this.time+t*this.animationSpeed;(r>=s||r<0)&&(this.loop?s>0?(r%=s,r<0&&(r+=s),this._looped=!0):r=0:(r=r<0?0:s,this._completed=!0,this.stop())),this.time=r;const i=this.weight;if(i===0)return;const n=Os._scratchBuffer,o=this.animation.tracks,a=this._accumulators,c=this._trackIndices;if(a.length!==0)for(let l=0;l<o.length;l++){const u=o[l],h=a[l];if(!h)continue;const d=c[l];if(!h.dirty)c[l]=u.evaluate(this.time,d,h.values),h.weight=i,h.dirty=!0;else{c[l]=u.evaluate(this.time,d,n);const f=h.weight+i;f>0&&u.blendInto(h.values,n,i/f),h.weight=f}}}_emitCallbacks(){this._looped&&(this._looped=!1,this.onLoop?.()),this._completed&&(this._completed=!1,this.onComplete?.())}_applyPose(){this.player._bind(this);const t=this.animation.tracks,s=this._accumulators,r=this._trackIndices;for(let i=0;i<t.length;i++){const n=s[i];r[i]=t[i].evaluate(this.time,r[i],n.values),n.binding.apply(n.values)}}},qt=class{},vd=class extends qt{_target;constructor(e){super(),this._target=e}apply(e){const t=this._target,s=e.length;for(let r=0;r<s;r++)t[r]=e[r]}},wd=class extends qt{_target;_key;constructor(e,t){super(),this._target=e,this._key=t}apply(e){this._target[this._key]=e[0]}},Sd=class extends qt{_target;constructor(e){super(),this._target=e}apply(e){const t=e[0],s=e[1],r=e[2],i=e[3],n=t*t+s*s+r*r+i*i;if(n===0){this._target.set(0,0,0,1);return}const o=1/Math.sqrt(n);this._target.set(t*o,s*o,r*o,i*o)}},Td=class extends qt{_skel;_offset3;constructor(e,t){super(),this._skel=e,this._offset3=t}apply(e){const t=this._offset3,s=this._skel.localPosition;s[t]=e[0],s[t+1]=e[1],s[t+2]=e[2],this._skel.dirty=!0}},Cd=class extends qt{_skel;_offset4;constructor(e,t){super(),this._skel=e,this._offset4=t}apply(e){const t=this._offset4,s=this._skel.localRotation,r=e[0],i=e[1],n=e[2],o=e[3],a=r*r+i*i+n*n+o*o,c=a>0?1/Math.sqrt(a):0;s[t]=r*c,s[t+1]=i*c,s[t+2]=n*c,s[t+3]=c===0?1:o*c,this._skel.dirty=!0}},Dd=class extends qt{_skel;_offset3;constructor(e,t){super(),this._skel=e,this._offset3=t}apply(e){const t=this._offset3,s=this._skel.localScale;s[t]=e[0],s[t+1]=e[1],s[t+2]=e[2],this._skel.dirty=!0}},Bd=class extends qt{_target;constructor(e){super(),this._target=e}apply(e){this._target.set(e[0],e[1],e[2])}},Pn=class extends qt{apply(){}};function Id(e){if(e.skeleton&&e.boneIndex!==void 0&&e.boneIndex!==-1){const i=e.boneIndex;switch(e.channel){case"position":return new Td(e.skeleton,i*3);case"quaternion":return new Cd(e.skeleton,i*4);case"scale":return new Dd(e.skeleton,i*3)}}const t=e.target;if(!t)return new Pn;const s=e.channel,r=t[s];return r instanceof F||r instanceof qe?new Bd(r):r instanceof mt||r instanceof _a?new Sd(r):typeof r=="number"?new wd(t,s):Md(r)?new vd(r):new Pn}function Md(e){return Array.isArray(e)||e instanceof Float32Array||e instanceof Float64Array}var Pd=class{binding;values;weight=0;dirty=!1;constructor(e,t){this.binding=e,this.values=new Float32Array(t)}},Ad=class qa{static defaultOptions={autoUpdate:!0,autoPlay:!1};target;_states=[];_stateCache=new Map;_animations=new Map;_animationLabels=null;_autoUpdate;_isConnectedToTicker=!1;_updating=!1;_destroyed=!1;_accumulators={};_accumulatorList=[];_nodeMap;_onTick=t=>{this.update(t)};constructor(t){const{target:s,animations:r,nodeMap:i,autoUpdate:n,autoPlay:o}={...qa.defaultOptions,...it(t)};this.target=s,this._nodeMap=i,this._autoUpdate=n,r&&this.addAnimations(r);const a=o===!0?this.animationLabels[0]:o;typeof a=="string"&&this.play(a)}get animationLabels(){return this._animationLabels??=Array.from(this._animations.keys())}addAnimations(t){Array.isArray(t)?t.forEach(s=>this._animations.set(s.label,s)):Object.entries(t).forEach(([s,r])=>this._animations.set(s,r)),this._animationLabels=null}getAnimation(t){return this._animations.get(t)}play(t){return this.getState(t).play()}stop(){const t=this._states,s=this._updating;this._updating=!0;for(let r=0;r<t.length;r++)t[r].stop();this._updating=s,s||this._removeStopped()}get playing(){const t=this._states;for(let s=0;s<t.length;s++)if(t[s].playing)return!0;return!1}getState(t){if(typeof t=="string"){const r=this._animations.get(t);if(!r)throw new Error(`[AnimationPlayer] Animation "${t}" is not registered.`);t=r}let s=this._stateCache.get(t);return s||(s=new bd(this,t),this._stateCache.set(t,s)),s}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,this._autoUpdate?this.playing&&this._connectTicker():this._disconnectTicker())}_activate(t){this._destroyed||(this._states.indexOf(t)===-1&&this._states.push(t),this._bind(t),this._autoUpdate&&this._connectTicker())}_bind(t){if(t._accumulators.length>0)return;const s=t.animation.tracks;for(let r=0;r<s.length;r++)t._accumulators[r]=this._getAccumulator(s[r])}_deactivate(){this._updating||this._removeStopped()}update(t){const s=t?t.deltaMS/1e3:.016666666666666666,r=this._states,i=r.length;this._updating=!0;for(let a=0;a<i;a++)r[a]._update(s);const n=this._accumulatorList,o=n.length;for(let a=0;a<o;a++){const c=n[a];c.dirty&&(c.binding.apply(c.values),c.dirty=!1,c.weight=0)}for(let a=0;a<i;a++)if(r[a]._emitCallbacks(),this._destroyed)return;this._updating=!1,this._removeStopped()}get destroyed(){return this._destroyed}destroy(){this._destroyed||(this._destroyed=!0,this._updating=!1,this._disconnectTicker(),this.stop(),this._stateCache.forEach(t=>{t.onComplete=null,t.onLoop=null}),this._states.length=0,this._stateCache.clear(),this._animations.clear(),this._animationLabels=null,this._accumulators={},this._accumulatorList.length=0)}_removeStopped(){const t=this._states;let s=0;for(let r=0;r<t.length;r++)t[r].playing&&(t[s++]=t[r]);t.length=s,s===0&&this._disconnectTicker()}_connectTicker(){this._isConnectedToTicker||(Qs.shared.add(this._onTick,void 0,ca.HIGH),this._isConnectedToTicker=!0)}_disconnectTicker(){this._isConnectedToTicker&&(Qs.shared.remove(this._onTick),this._isConnectedToTicker=!1)}_getAccumulator(t){const s=t.label;if(this._accumulators[s])return this._accumulators[s];const r=s.split("."),i=r.pop(),n=r.join(".");let o,a,c=-1;if(this._nodeMap){const h=parseInt(n,10);if(!isNaN(h)){const d=this._nodeMap[h];d&&(d instanceof tt?o=d:(a=d.skeleton,c=d.boneIndex))}}if(!o&&!a){const h=Wa(this.target,n);o=h?.node,a=h?.skeleton,c=h?.boneIndex??-1}const l=Id({target:o,channel:i,skeleton:a,boneIndex:c}),u=new Pd(l,t.valueSize);return this._accumulators[s]=u,this._accumulatorList.push(u),u}};function Wa(e,t){if(e.label===t)return{node:e};if(e instanceof ye&&e.skeleton)try{return{skeleton:e.skeleton,boneIndex:e.skeleton.indexOf(t)}}catch{}for(const s of e.children){const r=Wa(s,t);if(r)return r}}function Fd(e,t,s){let r=0,i=s;for(;i-r>1;){const n=r+i>>1;e[n]<=t?r=n:i=n}return r}var Vi=class{label;times;values;interpolation;valueSize=0;constructor(e){this.label=e.label,this.times=e.times instanceof Float32Array?e.times:new Float32Array(e.times),this.values=e.values instanceof Float32Array?e.values:new Float32Array(e.values),this.interpolation=e.interpolation||"LINEAR",this.valueSize=e.valueSize??1}blendInto(e,t,s){const r=this.valueSize;for(let i=0;i<r;i++)e[i]+=(t[i]-e[i])*s}evaluate(e,t,s){const r=this.times,i=this.values,n=r.length,o=this.valueSize;if(e<=r[0]){if(this.interpolation==="CUBICSPLINE"){const h=o;for(let d=0;d<o;d++)s[d]=i[h+d]}else for(let h=0;h<o;h++)s[h]=i[h];return 0}if(e>=r[n-1]){if(this.interpolation==="CUBICSPLINE"){const h=(n-1)*3*o+o;for(let d=0;d<o;d++)s[d]=i[h+d]}else{const h=(n-1)*o;for(let d=0;d<o;d++)s[d]=i[h+d]}return n-2}for(r[t]>e&&(t=Fd(r,e,t));t<n-1&&r[t+1]<=e;)t++;const a=t+1;if(this.interpolation==="STEP"){const h=t*o;for(let d=0;d<o;d++)s[d]=i[h+d];return t}const c=r[t],l=r[a]-c,u=(e-c)/l;return this.interpolate(t,a,u,l,s),t}interpolate(e,t,s,r,i){const n=this.values,o=this.valueSize;if(this.interpolation==="CUBICSPLINE"){const a=o*3,c=e*a,l=t*a,u=s*s,h=u*s,d=3*u-2*h,f=h-u,p=1-d,m=f-u+s;for(let _=0;_<o;_++){const g=n[c+o+_],b=n[c+o*2+_]*r,y=n[l+_]*r,v=n[l+o+_];i[_]=p*g+m*b+d*v+f*y}}else{const a=e*o,c=t*o;for(let l=0;l<o;l++){const u=n[a+l],h=n[c+l];i[l]=u+(h-u)*s}}}},zd=class extends Vi{constructor(e){super({...e,valueSize:4})}blendInto(e,t,s){const r=e[0],i=e[1],n=e[2],o=e[3];let a=t[0],c=t[1],l=t[2],u=t[3];r*a+i*c+n*l+o*u<0&&(a=-a,c=-c,l=-l,u=-u),e[0]=r+(a-r)*s,e[1]=i+(c-i)*s,e[2]=n+(l-n)*s,e[3]=o+(u-o)*s}interpolate(e,t,s,r,i){if(this.interpolation==="CUBICSPLINE"){super.interpolate(e,t,s,r,i);const n=i[0],o=i[1],a=i[2],c=i[3],l=1/Math.sqrt(n*n+o*o+a*a+c*c);i[0]*=l,i[1]*=l,i[2]*=l,i[3]*=l}else mt.slerpFlat(i,0,this.values,e*4,this.values,t*4,s)}},mi=class extends Vi{constructor(e){super({...e,valueSize:3})}blendInto(e,t,s){e[0]+=(t[0]-e[0])*s,e[1]+=(t[1]-e[1])*s,e[2]+=(t[2]-e[2])*s}interpolate(e,t,s,r,i){if(this.interpolation==="CUBICSPLINE"){super.interpolate(e,t,s,r,i);return}const n=this.values,o=e*3,a=t*3,c=n[o],l=n[o+1],u=n[o+2];i[0]=c+(n[a]-c)*s,i[1]=l+(n[a+1]-l)*s,i[2]=u+(n[a+2]-u)*s}};const An=["right","left","top","bottom","front","back"],kd={extension:{type:nt.LoadParser,name:"loadCubemap"},name:"loadCubemap",id:"cubemap",test(e){return pr(e,".cubemap")},async load(e,t,s){const r=await(await fetch(e)).json(),i=e.substring(0,e.lastIndexOf("/")+1),n=await Promise.all(An.map(async c=>{const l=i+r[c];return[c,await s.load({src:l,parser:"texture"})]})),o=Object.fromEntries(n),a=la.basename(e,".cubemap");return bt.from({faces:o,label:a})},async unload(e,t,s){const r=e.source.faces,i=An.map(n=>r[n]._sourceOrigin);e.destroy(!0),await s.unload(i)}},Ka={POSITION:"positions",NORMAL:"normals",TEXCOORD_0:"uvs",JOINTS_0:"joints",WEIGHTS_0:"weights",TANGENT:"tangents",COLOR_0:"colors",COLOR_1:"colors1"};function Ya(e,t){if(t!==3)return e;const s=e.constructor,r=e.length/3,i=new s(r*4),n=e instanceof Float32Array?1:e instanceof Uint8Array?255:65535;for(let o=0;o<r;o++){const a=o*3,c=o*4;i[c]=e[a],i[c+1]=e[a+1],i[c+2]=e[a+2],i[c+3]=n}return i}const Fn={jsUrl:"https://www.gstatic.com/draco/versioned/decoders/1.5.7/draco_wasm_wrapper.js",wasmUrl:"https://www.gstatic.com/draco/versioned/decoders/1.5.7/draco_decoder.wasm"},Rd="(function(){let e,t;async function n(e,t){let n=new URL(e,self.location.origin).href,r=new URL(t,self.location.origin).href;importScripts(n);let i=await fetch(r).then(e=>{if(!e.ok)throw Error(`Failed to fetch Draco WASM: ${e.status} ${e.statusText}`);return e.arrayBuffer()});return await self.DracoDecoderModule({wasmBinary:i})}let r={5120:{ctor:Int8Array,bytes:1,dtKey:`DT_INT8`},5121:{ctor:Uint8Array,bytes:1,dtKey:`DT_UINT8`},5122:{ctor:Int16Array,bytes:2,dtKey:`DT_INT16`},5123:{ctor:Uint16Array,bytes:2,dtKey:`DT_UINT16`},5125:{ctor:Uint32Array,bytes:4,dtKey:`DT_UINT32`},5126:{ctor:Float32Array,bytes:4,dtKey:`DT_FLOAT32`}};async function i(n,i){if(!e)throw Error(`Draco decoder not initialized`);let a=await e;t||=new a.Decoder;let o=t,s=new a.DecoderBuffer,c=new a.Mesh,l=0;try{s.Init(new Int8Array(n),n.byteLength);let e=o.DecodeBufferToMesh(s,c);if(!e.ok())throw Error(`Draco decode failed: ${e.error_msg()}`);let t=c.num_faces()*3,u=c.num_points(),d=u<=65535,f=d?2:4;l=a._malloc(t*f),d?o.GetTrianglesUInt16Array(c,t*2,l):o.GetTrianglesUInt32Array(c,t*4,l);let p=new(d?Uint16Array:Uint32Array)(a.HEAPU8.buffer,l,t).slice();a._free(l),l=0;let m={},h=[p.buffer],g=Object.keys(i);for(let e=0;e<g.length;e++){let t=g[e],{dracoId:n,componentType:s}=i[t],d=r[s];if(!d)throw Error(`Unsupported Draco componentType: ${s}`);let f=o.GetAttributeByUniqueId(c,n);if(!f)throw Error(`Draco attribute not found for uniqueId ${n}`);let p=u*f.num_components(),_=p*d.bytes;l=a._malloc(_),o.GetAttributeDataArrayForAllPoints(c,f,a[d.dtKey],_,l);let v=new d.ctor(a.HEAPU8.buffer,l,p).slice();a._free(l),l=0,m[t]=v,h.push(v.buffer)}return{indices:p,attributes:m,transferables:h}}finally{l&&a._free(l),a.destroy(c),a.destroy(s)}}async function a(t){let r=t.data;if(r.type===`init`){e=n(r.jsUrl,r.wasmUrl);return}if(r.type===`decode`)try{let{indices:e,attributes:t,transferables:n}=await i(r.bufferViewBytes,r.attributeIds);self.postMessage({id:r.id,success:!0,indices:e,attributes:t},n)}catch(e){let t=e instanceof Error?e.message:String(e);self.postMessage({id:r.id,success:!1,error:t})}}self.onmessage=a})();";let Ld;function Ed(){return Ld??=URL.createObjectURL(new Blob([Rd],{type:"text/javascript;charset=utf-8"}))}let Mt,Vd=0;const rr={},xe={};function zn(e){for(const t in xe)xe[t](new Error(`Draco worker: ${e}`)),delete rr[t],delete xe[t];Mt?.terminate(),Mt=void 0}function Gd(){return Mt||(Mt=new Worker(Ed()),Mt.onmessage=e=>{const{id:t,success:s,indices:r,attributes:i,error:n}=e.data;s&&r&&i?rr[t]?.({indices:r,attributes:i}):xe[t]?.(new Error(n??"Draco decode failed")),delete rr[t],delete xe[t]},Mt.onerror=e=>zn(e.message||"uncaught error"),Mt.onmessageerror=()=>zn("message deserialization failed"),Mt.postMessage({type:"init",jsUrl:Fn.jsUrl,wasmUrl:Fn.wasmUrl})),Mt}function Od(e,t){const s=Gd(),r=Vd++;return new Promise((i,n)=>{rr[r]=i,xe[r]=n,s.postMessage({type:"decode",id:r,bufferViewBytes:e,attributeIds:t},[e])})}async function Nd(e,t,s,r){const i=e.bufferViews[r.bufferView],n=t[i.buffer],o=i.byteOffset??0,a=n.slice(o,o+i.byteLength),c={},l=Object.keys(r.attributes);for(let d=0;d<l.length;d++){const f=l[d],p=s.attributes[f];if(p===void 0)continue;const m=e.accessors[p];c[f]={dracoId:r.attributes[f],componentType:m.componentType}}const u=await Od(a,c),h={indices:u.indices};for(let d=0;d<l.length;d++){const f=l[d];if(!u.attributes[f])continue;const p=Ka[f];if(p){const m=u.attributes[f];h[p]=p==="colors"||p==="colors1"?Ya(m,e.accessors[s.attributes[f]].type==="VEC3"?3:4):m}else pt(`pixijs-3d-custom-attribute-${f}`,`[@pixi/3d] custom attribute ${f} skipped`)}return h}let Gr;function $d(){return Gr||(Gr=(async()=>{const{MeshoptDecoder:e}=await di(async()=>{const{MeshoptDecoder:s}=await import("./meshopt_decoder-Dz7S8YZg.js");return{MeshoptDecoder:s}},[],import.meta.url);await e.ready;const t=Math.max(1,Math.min((navigator.hardwareConcurrency??4)-1,4));return e.useWorkers(t),e})()),Gr}async function Ud(e,t){const s=e.bufferViews;if(!s)return;const r=await $d();await Promise.all(s.map(async i=>{const n=i.extensions?.EXT_meshopt_compression??i.extensions?.KHR_meshopt_compression;if(!n)return;const o=t[n.buffer],a=new Uint8Array(o,n.byteOffset??0,n.byteLength),c=await r.decodeGltfBufferAsync(n.count,n.byteStride,a,n.mode,n.filter??"NONE"),l=t.length;t.push(c.buffer),i.buffer=l,i.byteOffset=0,i.byteLength=n.count*n.byteStride,delete i.extensions?.EXT_meshopt_compression,delete i.extensions?.KHR_meshopt_compression}))}async function Xa(e,t){if(!(e.extensionsUsed?.includes("EXT_meshopt_compression")||e.extensionsUsed?.includes("KHR_meshopt_compression")))return;await Ud(e,t);const s=e.bufferViews;if(!s){t.length=0;return}const r=new Map,i=[];for(let n=0;n<s.length;n++){const o=s[n].buffer;r.has(o)||(r.set(o,i.length),i.push(t[o]))}for(let n=0;n<s.length;n++)s[n].buffer=r.get(s[n].buffer);t.length=0;for(let n=0;n<i.length;n++)t.push(i[n])}var Za=class{textures=[];materials=[];geometries=[];texture={};material={};geometry={};animations={};scene={};destroyed=!1;_descriptor;_imageUrls=[];constructor(e){this._descriptor=e,e.scenes&&e.scenes.forEach(t=>{t.name&&(this.scene[t.name]=t)})}destroy(){if(!this.destroyed){this.destroyed=!0;for(const e of this.geometries)if(e)for(const t of e)t.destroy(!0);for(const e of this.materials)e?.destroy();for(const e of this.textures)e&&!e.destroyed&&!is.has(e)&&e.destroy(!0);this.geometries=null,this.materials=null,this.textures=null,this._imageUrls=null,this.geometry=null,this.material=null,this.texture=null,this.animations=null,this.scene=null}}};const Qa=5120,Ja=5121,tc=5122,ec=5123,sc=5126,Hd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4},jd={[sc]:{raw:"float32",normalized:"float32"},[Qa]:{raw:"sint8",normalized:"snorm8"},[Ja]:{raw:"uint8",normalized:"unorm8"},[tc]:{raw:"sint16",normalized:"snorm16"},[ec]:{raw:"uint16",normalized:"unorm16"}},rc={[Qa]:1/127,[Ja]:1/255,[tc]:1/32767,[ec]:1/65535};function qd(e){const t=Hd[e.type];if(!t||t===1)throw new Error(`[accessorToVertexFormat] Unsupported accessor type: ${e.type}`);const s=jd[e.componentType];if(!s)throw new Error(`[accessorToVertexFormat] Unsupported componentType: ${e.componentType}`);const r=e.componentType===sc,i=t===3?r?"x3":"x4":`x${t}`;return`${e.normalized?s.normalized:s.raw}${i}`}const gi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Wd={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4},ic={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};function De(e,t,s,r=!1){const i=e.accessors[s];if(i.sparse)return Kd(e,t,s);const n=e.bufferViews[i.bufferView],o=t[n.buffer],a=i.componentType,c=gi[a],l=ic[i.type],u=(n.byteOffset??0)+(i.byteOffset??0),h=Wd[a],d=l*h,f=n.byteStride??d,p=i.count;if(f===d){const v=new c(o,u,p*l);return r?v.slice():v}const m=new c(o),_=u/h,g=f/h,b=new c(p*l);let y=0;for(let v=0;v<p;v++){const x=_+v*g;for(let w=0;w<l;w++)b[y++]=m[x+w]}return b}function Kd(e,t,s){const r=e.accessors[s],i=r.sparse,n=r.componentType,o=gi[n],a=ic[r.type],c=r.count*a,l=new o(c);if(r.bufferView!==void 0){const m=e.bufferViews[r.bufferView],_=(m.byteOffset??0)+(r.byteOffset??0);l.set(new o(t[m.buffer],_,c))}const u=e.bufferViews[i.indices.bufferView],h=gi[i.indices.componentType],d=new h(t[u.buffer],(u.byteOffset??0)+(i.indices.byteOffset??0),i.count),f=e.bufferViews[i.values.bufferView],p=new o(t[f.buffer],(f.byteOffset??0)+(i.values.byteOffset??0),i.count*a);if(a===3)for(let m=0;m<i.count;m++){const _=d[m]*3,g=m*3;l[_]=p[g],l[_+1]=p[g+1],l[_+2]=p[g+2]}else for(let m=0;m<i.count;m++){const _=d[m]*a,g=m*a;for(let b=0;b<a;b++)l[_+b]=p[g+b]}return l}const Yd={translation:mi,rotation:zd,scale:mi},Xd={translation:"position",rotation:"quaternion",scale:"scale",weights:"weights"};function Zd(e,t,s){e.animations&&e.animations.forEach((r,i)=>{const n=[];r.channels.forEach(a=>{const c=r.samplers[a.sampler],l=a.target,u=Qd(l,c,e,t);u&&n.push(u)});const o=r.name||`anim_${i}`;s.animations[o]=new Sh({label:o,tracks:n})})}function kn(e,t,s){const r=De(e,t,s);if(r instanceof Float32Array)return r;const i=e.accessors[s],n=r,o=new Float32Array(n.length);if(i.normalized===!0){const a=rc[i.componentType]??1;if(i.componentType===5120||i.componentType===5122)for(let c=0;c<n.length;c++){const l=n[c]*a;o[c]=l<-1?-1:l}else for(let c=0;c<n.length;c++)o[c]=n[c]*a}else o.set(n);return o}function Qd(e,t,s,r){const i=kn(s,r,t.input),n=kn(s,r,t.output),o=`${e.node.toString()}.${Xd[e.path]??e.path}`,a=t.interpolation??"LINEAR";if(e.path==="weights"){const c=i.length>0?n.length/i.length:1,l=a==="CUBICSPLINE"?c/3:c;return new Vi({label:o,times:i,values:n,interpolation:a,valueSize:l})}return new(Yd[e.path]??mi)({label:o,times:i,values:n,interpolation:a})}function Jd(e,t){if(!e.cameras){t.cameras=[];return}t.cameras=e.cameras.map(s=>{if(s.type==="perspective"){const i=s.perspective;return{fov:i.yfov*Ze,near:i.znear,far:i.zfar,mode:0}}const r=s.orthographic;return{orthographicSize:r.xmag,near:r.znear,far:r.zfar,mode:1}})}const _i={name:"alphaMask",bindings:{material:{alphaCutoff:"f32"}},gpu:{fragment:{material:`
  if (alpha < material.alphaCutoff) {
    discard;
  }
  alpha = 1.0;
`}},gl:{fragment:{material:`
  if (alpha < material.alphaCutoff) discard;
  alpha = 1.0;
`}}},es={name:"uvTransform",bindings:{material:{uvOffset:"vec2<f32>",uvTransformRow0:"vec4<f32>"}},gpu:{vertex:{end:`
  let m = material.uvTransformRow0;
  uv = vec2<f32>(m.x * uv.x + m.y * uv.y,
                 m.z * uv.x + m.w * uv.y) + material.uvOffset;
`}},gl:{vertex:{end:`
  vec4 m = material.uvTransformRow0;
  uv = vec2(m.x * uv.x + m.y * uv.y,
            m.z * uv.x + m.w * uv.y) + material.uvOffset;
`}}},Rn={name:"flatMaterial",textures:["baseColor"],bindings:{material:{baseColor:"vec4<f32>",displayBaseColor:"vec4<f32>",alphaCutoff:"f32"}},gpu:{fragment:{material:`
  var baseColor = inputTint(material.baseColor, material.displayBaseColor);

  let baseTex = sampleBaseColor(input.vUV);
  baseColor *= vec4<f32>(decodeColor(baseTex.rgb / max(baseTex.a, 0.001)), baseTex.a);

  albedo *= baseColor.rgb;
  alpha *= baseColor.a;
`}},gl:{fragment:{material:`
  vec4 baseColor = inputTint(material.baseColor, material.displayBaseColor);

  vec4 baseTex = sampleBaseColor(vUV);
  baseColor *= vec4(decodeColor(baseTex.rgb / max(baseTex.a, 0.001)), baseTex.a);

  albedo *= baseColor.rgb;
  alpha *= baseColor.a;
`}}};var tf=class extends sr{colorSpace="display";lit=!1;constructor(e={}){super(e),this._descriptor=new ee({});const t=[Rn,es,...this.extraBits];this._deriveLayoutFromBits(t,{baseColor:e.baseColorTexture,...e.textures})}getPrimaryDescriptor(e){if(!this._variantDirty)return this._descriptor;const t=[Rn,es];for(let s=0;s<this.extraBits.length;s++)t.push(this.extraBits[s]);return this._alphaMode==="mask"&&t.push(_i),this._descriptor.update({bitsGpu:t,bitsGl:t}),this._variantDirty=!1,this._descriptor}};const Gi={name:"derivativeTangentFrame",gpu:{header:`
fn calculateTBN(surfaceNormal: vec3<f32>, position: vec3<f32>, texCoord: vec2<f32>) -> mat3x3<f32> {
  let dp1 = dpdx(position);
  let dp2 = dpdy(position);
  let duv1 = dpdx(texCoord);
  let duv2 = dpdy(texCoord);

  let dp2perp = cross(dp2, surfaceNormal);
  let dp1perp = cross(surfaceNormal, dp1);
  let tangent = dp2perp * duv1.x + dp1perp * duv2.x;
  let bitangent = -(dp2perp * duv1.y + dp1perp * duv2.y);

  let invmax = inverseSqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
  let scale = select(invmax, -invmax, dot(dp1, dp2perp) < 0.0);
  return mat3x3<f32>(tangent * scale, bitangent * scale, surfaceNormal);
}
`},gl:{fragment:{header:`
mat3 calculateTBN(highp vec3 surfaceNormal, highp vec3 position, highp vec2 texCoord) {
  highp vec3 dp1 = dFdx(position);
  highp vec3 dp2 = dFdy(position);
  highp vec2 duv1 = dFdx(texCoord);
  highp vec2 duv2 = dFdy(texCoord);

  highp vec3 dp2perp = cross(dp2, surfaceNormal);
  highp vec3 dp1perp = cross(surfaceNormal, dp1);
  highp vec3 tangent = dp2perp * duv1.x + dp1perp * duv2.x;
  highp vec3 bitangent = -(dp2perp * duv1.y + dp1perp * duv2.y);

  highp float invmax = inversesqrt(max(dot(tangent, tangent), dot(bitangent, bitangent)));
  highp float scale = dot(dp1, dp2perp) < 0.0 ? -invmax : invmax;
  return mat3(tangent * scale, bitangent * scale, surfaceNormal);
}
`}}},Ht={name:"mathConstants",gpu:{header:`
const PI: f32 = 3.14159265359;
const INV_PI: f32 = 0.31830988618;
`},gl:{header:`
const float PI = 3.14159265359;
const float INV_PI = 0.31830988618;
`}};function br(e,t){const s=`anisotropy${e?":texture":""}${t?":tangent":""}`,r=e?`
  let anisoSample = sampleAnisotropy(input.vUV);
  let anisoDirRaw = anisoSample.rg * 2.0 - 1.0;
  let anisoTexStrength = anisoSample.b;
`:`
  let anisoDirRaw = vec2<f32>(1.0, 0.0);
  let anisoTexStrength = 1.0;
`,i=e?`
  vec4 anisoSample = sampleAnisotropy(vUV);
  vec2 anisoDirRaw = anisoSample.rg * 2.0 - 1.0;
  float anisoTexStrength = anisoSample.b;
`:`
  vec2 anisoDirRaw = vec2(1.0, 0.0);
  float anisoTexStrength = 1.0;
`,n=t?`
  let anisoTw = normalize(input.vAnisoTangent);
  let anisoBw = normalize(input.vAnisoBitangent);
  let anisoT = normalize(anisoDir.x * anisoTw + anisoDir.y * anisoBw);
`:`
  let anisoTBN = calculateTBN(anisoGeoN, input.vPosition, input.vUV);
  let anisoT = normalize(anisoTBN * vec3<f32>(anisoDir, 0.0));
`,o=t?`
  vec3 anisoTw = normalize(vAnisoTangent);
  vec3 anisoBw = normalize(vAnisoBitangent);
  vec3 anisoT = normalize(anisoDir.x * anisoTw + anisoDir.y * anisoBw);
`:`
  mat3 anisoTBN = calculateTBN(anisoGeoN, vPosition, vUV);
  vec3 anisoT = normalize(anisoTBN * vec3(anisoDir, 0.0));
`,a={name:s,requires:t?[Ht]:[Ht,Gi],textures:e?["anisotropy"]:[],bindings:{material:{anisotropyParams:"vec4<f32>"}},gpu:{fragment:{material:`
${r}
  let anisoRot = material.anisotropyParams.y;
  let anisoC = cos(anisoRot);
  let anisoS = sin(anisoRot);
  let anisoDir = vec2<f32>(
    anisoDirRaw.x * anisoC - anisoDirRaw.y * anisoS,
    anisoDirRaw.x * anisoS + anisoDirRaw.y * anisoC,
  );
  let anisoStrength = clamp(material.anisotropyParams.x * anisoTexStrength, 0.0, 1.0);

  let anisoGeoN = normalize(select(-input.vNormal, input.vNormal, input.frontFacing));
${n}
  let anisoB = normalize(cross(anisoGeoN, anisoT));

  let anisoBentCross = cross(cross(anisoB, viewDir), anisoB);
  let anisoBentLenSq = dot(anisoBentCross, anisoBentCross);
  var anisoBentN = normal;
  if (anisoBentLenSq > 1e-8) {
    anisoBentN = anisoBentCross * inverseSqrt(anisoBentLenSq);
  }
  let anisoBend = 1.0 - anisoStrength * (1.0 - roughness);
  let anisoBend4 = anisoBend * anisoBend * anisoBend * anisoBend;
  specularNormal = normalize(mix(anisoBentN, normal, anisoBend4));
`,lobePreLighting:`
  let anisoAlphaB = a;
  let anisoAlphaT = mix(a, 1.0, anisoStrength * anisoStrength);
  let anisoTdotV = dot(anisoT, viewDir);
  let anisoBdotV = dot(anisoB, viewDir);
`,lobePerLight:`
    {
      let anisoTdotL = dot(anisoT, lightDir);
      let anisoBdotL = dot(anisoB, lightDir);
      let anisoTdotH = dot(anisoT, halfVector);
      let anisoBdotH = dot(anisoB, halfVector);

      let anisoA2 = anisoAlphaT * anisoAlphaB;
      let anisoFv = vec3<f32>(anisoAlphaB * anisoTdotH, anisoAlphaT * anisoBdotH, anisoA2 * nDotH);
      let anisoW2 = anisoA2 / dot(anisoFv, anisoFv);
      let anisoD = anisoA2 * anisoW2 * anisoW2 * INV_PI;

      let anisoGGXV = nDotL * length(vec3<f32>(anisoAlphaT * anisoTdotV, anisoAlphaB * anisoBdotV, nDotV));
      let anisoGGXL = nDotV * length(vec3<f32>(anisoAlphaT * anisoTdotL, anisoAlphaB * anisoBdotL, nDotL));
      let anisoVis = 0.5 / max(anisoGGXV + anisoGGXL, 1e-5);

      let anisoSpec = anisoD * fresnel * anisoVis;
      directLight += (anisoSpec - specular) * radiance * nDotL * shadow;
    }
`}},gl:{fragment:{material:`
${i}
  float anisoRot = material.anisotropyParams.y;
  float anisoC = cos(anisoRot);
  float anisoS = sin(anisoRot);
  vec2 anisoDir = vec2(
    anisoDirRaw.x * anisoC - anisoDirRaw.y * anisoS,
    anisoDirRaw.x * anisoS + anisoDirRaw.y * anisoC
  );
  float anisoStrength = clamp(material.anisotropyParams.x * anisoTexStrength, 0.0, 1.0);

  vec3 anisoGeoN = normalize(gl_FrontFacing ? vNormal : -vNormal);
${o}
  vec3 anisoB = normalize(cross(anisoGeoN, anisoT));

  vec3 anisoBentCross = cross(cross(anisoB, viewDir), anisoB);
  float anisoBentLenSq = dot(anisoBentCross, anisoBentCross);
  vec3 anisoBentN = anisoBentLenSq > 1e-8 ? anisoBentCross * inversesqrt(anisoBentLenSq) : normal;
  float anisoBend = 1.0 - anisoStrength * (1.0 - roughness);
  float anisoBend4 = anisoBend * anisoBend * anisoBend * anisoBend;
  specularNormal = normalize(mix(anisoBentN, normal, anisoBend4));
`,lobePreLighting:`
  float anisoAlphaB = a;
  float anisoAlphaT = mix(a, 1.0, anisoStrength * anisoStrength);
  float anisoTdotV = dot(anisoT, viewDir);
  float anisoBdotV = dot(anisoB, viewDir);
`,lobePerLight:`
    {
      float anisoTdotL = dot(anisoT, lightDir);
      float anisoBdotL = dot(anisoB, lightDir);
      float anisoTdotH = dot(anisoT, halfVector);
      float anisoBdotH = dot(anisoB, halfVector);

      float anisoA2 = anisoAlphaT * anisoAlphaB;
      vec3 anisoFv = vec3(anisoAlphaB * anisoTdotH, anisoAlphaT * anisoBdotH, anisoA2 * nDotH);
      float anisoW2 = anisoA2 / dot(anisoFv, anisoFv);
      float anisoD = anisoA2 * anisoW2 * anisoW2 * INV_PI;

      float anisoGGXV = nDotL * length(vec3(anisoAlphaT * anisoTdotV, anisoAlphaB * anisoBdotV, nDotV));
      float anisoGGXL = nDotV * length(vec3(anisoAlphaT * anisoTdotL, anisoAlphaB * anisoBdotL, nDotL));
      float anisoVis = 0.5 / max(anisoGGXV + anisoGGXL, 1e-5);

      vec3 anisoSpec = anisoD * fresnel * anisoVis;
      directLight += (anisoSpec - specular) * radiance * nDotL * shadow;
    }
`}}};return t&&(a.attributes={aTangent:"float32x4"},a.interStage={vAnisoTangent:"vec3<f32>",vAnisoBitangent:"vec3<f32>"},a.gpu.vertex={input:"  tangent = input.aTangent.xyz;",end:`
  let anisoWorldT = normalize(modelMatrix3 * tangent);
  output.vAnisoTangent = anisoWorldT;
  output.vAnisoBitangent = cross(worldNormal, anisoWorldT) * input.aTangent.w;
`},a.gl.vertex={input:"  tangent = aTangent.xyz;",end:`
  vec3 anisoWorldT = normalize(modelMatrix3 * tangent);
  vAnisoTangent = anisoWorldT;
  vAnisoBitangent = cross(worldNormal, anisoWorldT) * aTangent.w;
`}),a}const nc=br(!1,!1),oc=br(!0,!1),ef=br(!1,!0),sf=br(!0,!0);function ac(e){return e===nc?ef:e===oc?sf:e}const rf={name:"emissive",textures:["emissive"],bindings:{material:{emissive:"vec3<f32>",emissiveStrength:"f32"}},gpu:{fragment:{material:`
  emissive = material.emissive * material.emissiveStrength;
  let emissiveTex = sampleEmissive(input.vUV).rgb;
  emissive *= pow(emissiveTex, vec3<f32>(2.2));
`}},gl:{fragment:{material:`
  emissive = material.emissive * material.emissiveStrength;
  vec3 emissiveTex = sampleEmissive(vUV).rgb;
  emissive *= pow(emissiveTex, vec3(2.2));
`}}};function ie(e){const t=Object.entries(e),s=t.filter(([,i])=>i.kind==="colour");class r{_material;_data;_colours=Object.create(null);_tints=Object.create(null);constructor(n){this._material=n,this._data=n.data;for(const[o,a]of s){const c=this._data[a.field].subarray(0,3);this._colours[o]=c,this._tints[o]=vt.shared.setValue([te(c[0]),te(c[1]),te(c[2])]).toNumber()}}}for(const[i,n]of t){let o;switch(n.kind){case"lane":{const{field:a,lane:c}=n;o={get(){return this._data[a][c]},set(l){const u=this._data[a];u[c]!==Math.fround(l)&&(u[c]=l,this._material.update())}};break}case"scalar":{const{field:a}=n;o={get(){return this._data[a]},set(c){this._data[a]=c}};break}case"colour":o={get(){return this._tints[i]},set(a){const c=vt.shared.setValue(a);this._tints[i]=c.toNumber(),At(this._colours[i],0,c),this._material.update()}};break;case"texture":{const{slot:a}=n;o={get(){return this._material.textures[a]}},n.readonly||(o.set=function(c){this._material.textures[a]=c});break}}o.enumerable=!0,o.configurable=!1,Object.defineProperty(r.prototype,i,o)}return r}function Kt(e){const t={};for(const s of Object.keys(Object.getPrototypeOf(e)))t[s]=e[s];return t}const nf=ie({color:{kind:"colour",field:"emissive"},strength:{kind:"scalar",field:"emissiveStrength"},texture:{kind:"texture",slot:"emissive"}}),Ln="normalize(select(-input.vNormal, input.vNormal, input.frontFacing))",En="normalize(gl_FrontFacing ? vNormal : -vNormal)";function cc(e){const t=e?`
  let ccTangentNormal = sampleClearcoatNormal(input.vUV).rgb * 2.0 - 1.0;
  let ccScaledNormal = vec3<f32>(
    ccTangentNormal.xy * material.clearcoatParams.z,
    ccTangentNormal.z,
  );
  let ccTBN = calculateTBN(${Ln}, input.vPosition, input.vUV);
  let ccNormal = normalize(ccTBN * ccScaledNormal);
`:`
  let ccNormal = ${Ln};
`,s=e?`
  vec3 ccTangentNormal = sampleClearcoatNormal(vUV).rgb * 2.0 - 1.0;
  vec3 ccScaledNormal = vec3(ccTangentNormal.xy * material.clearcoatParams.z, ccTangentNormal.z);
  mat3 ccTBN = calculateTBN(${En}, vPosition, vUV);
  vec3 ccNormal = normalize(ccTBN * ccScaledNormal);
`:`
  vec3 ccNormal = ${En};
`;return{name:e?"clearcoat:normalMap":"clearcoat",requires:e?[Ht,Gi]:[Ht],textures:e?["clearcoat","clearcoatRoughness","clearcoatNormal"]:["clearcoat","clearcoatRoughness"],bindings:{material:{clearcoatParams:"vec4<f32>"}},gpu:{header:`const CLEARCOAT_F0: f32 = 0.04;
`,fragment:{lobePreLighting:`
  let ccFactor = material.clearcoatParams.x * sampleClearcoat(input.vUV).r;
  let ccRoughnessRaw = material.clearcoatParams.y * sampleClearcoatRoughness(input.vUV).g;
  let ccRoughnessIBL = clamp(ccRoughnessRaw, 0.0, 1.0);
  let ccRoughness = min(max(ccRoughnessIBL, 0.04) + geometricRoughness, 1.0);
${t}
  let ccA = ccRoughness * ccRoughness;
  let ccA2 = ccA * ccA;
  let ccA2InvPi = ccA2 * INV_PI;
  let ccOneMinusA = 1.0 - ccA;
  let ccNDotV = max(dot(ccNormal, viewDir), 0.0);
  let ccVisV = ccNDotV * ccOneMinusA + ccA;

  var clearcoatLight = vec3<f32>(0.0);
`,lobePerLight:`
    {
      let ccHalfVector = normalize(viewDir + lightDir);
      let ccNDotL = max(dot(ccNormal, lightDir), 0.0);
      if (ccNDotL > 0.0) {
        let ccNDotH = max(dot(ccNormal, ccHalfVector), 0.0);
        let ccDDenom = (ccNDotH * ccNDotH * (ccA2 - 1.0) + 1.0);
        let ccD = ccA2InvPi / (ccDDenom * ccDDenom);
        let ccVis = 0.5 / (ccNDotL * ccVisV + ccNDotV * (ccNDotL * ccOneMinusA + ccA));
        let ccHDotV = max(dot(ccHalfVector, viewDir), 0.0);
        let ccFc5 = exp2((-5.55473 * ccHDotV - 6.98316) * ccHDotV);
        let ccF = CLEARCOAT_F0 + (1.0 - CLEARCOAT_F0) * ccFc5;
        clearcoatLight += ccD * ccF * ccVis * light.color * attenuation * ccNDotL * shadow;
      }
    }
`,lobePostLighting:`
  let ccFcv5 = exp2((-5.55473 * ccNDotV - 6.98316) * ccNDotV);

  let ccR = reflect(-viewDir, ccNormal);
  let ccPrefiltered = sampleEnvironment(ccR, ccRoughnessIBL);
  let ccBrdf = textureSampleLevel(uBrdfLutTexture, uBrdfLutSampler, vec2<f32>(ccNDotV, ccRoughnessIBL), 0.0).rg;
  let clearcoatIBL = ccPrefiltered * (CLEARCOAT_F0 * ccBrdf.x + ccBrdf.y);

  let ccFv = CLEARCOAT_F0 + (1.0 - CLEARCOAT_F0) * ccFcv5;
  let ccAttenuation = 1.0 - ccFactor * ccFv;
  finalColor = finalColor * ccAttenuation + (clearcoatLight + clearcoatIBL) * ccFactor;
`}},gl:{fragment:{header:`
#define CLEARCOAT_F0 0.04
`,lobePreLighting:`
  float ccFactor = material.clearcoatParams.x * sampleClearcoat(vUV).r;
  float ccRoughnessRaw = material.clearcoatParams.y * sampleClearcoatRoughness(vUV).g;
  float ccRoughnessIBL = clamp(ccRoughnessRaw, 0.0, 1.0);
  float ccRoughness = min(max(ccRoughnessIBL, 0.04) + geometricRoughness, 1.0);
${s}
  float ccA = ccRoughness * ccRoughness;
  float ccA2 = ccA * ccA;
  float ccA2InvPi = ccA2 * INV_PI;
  float ccOneMinusA = 1.0 - ccA;
  float ccNDotV = max(dot(ccNormal, viewDir), 0.0);
  float ccVisV = ccNDotV * ccOneMinusA + ccA;

  vec3 clearcoatLight = vec3(0.0);
`,lobePerLight:`
    {
      vec3 ccHalfVector = normalize(viewDir + lightDir);
      float ccNDotL = max(dot(ccNormal, lightDir), 0.0);
      if (ccNDotL > 0.0) {
        float ccNDotH = max(dot(ccNormal, ccHalfVector), 0.0);
        float ccDDenom = (ccNDotH * ccNDotH * (ccA2 - 1.0) + 1.0);
        float ccD = ccA2InvPi / (ccDDenom * ccDDenom);
        float ccVis = 0.5 / (ccNDotL * ccVisV + ccNDotV * (ccNDotL * ccOneMinusA + ccA));
        float ccHDotV = max(dot(ccHalfVector, viewDir), 0.0);
        float ccFc5 = exp2((-5.55473 * ccHDotV - 6.98316) * ccHDotV);
        float ccF = CLEARCOAT_F0 + (1.0 - CLEARCOAT_F0) * ccFc5;
        clearcoatLight += ccD * ccF * ccVis * light.color * attenuation * ccNDotL * shadow;
      }
    }
`,lobePostLighting:`
  float ccFcv5 = exp2((-5.55473 * ccNDotV - 6.98316) * ccNDotV);

  vec3 ccR = reflect(-viewDir, ccNormal);
  vec3 ccPrefiltered = sampleEnvironment(ccR, ccRoughnessIBL);
  vec2 ccBrdf = texture(uBrdfLutTexture, vec2(ccNDotV, ccRoughnessIBL)).rg;
  vec3 clearcoatIBL = ccPrefiltered * (CLEARCOAT_F0 * ccBrdf.x + ccBrdf.y);

  float ccFv = CLEARCOAT_F0 + (1.0 - CLEARCOAT_F0) * ccFcv5;
  float ccAttenuation = 1.0 - ccFactor * ccFv;
  finalColor = finalColor * ccAttenuation + (clearcoatLight + clearcoatIBL) * ccFactor;
`}}}}const of=cc(!1),af=cc(!0),Vn={name:"ibl",bindings:{global:{uBrdfLutTexture:"texture_2d<f32>"}},gpu:{fragment:{lighting:`
  {
    let NdotV_ibl = max(dot(normal, viewDir), 0.0);
    let R_ibl = reflect(-viewDir, specularNormal);

    let radiance = sampleEnvironment(R_ibl, roughness);
    let irradiance = sampleEnvironment(normal, 1.0);

    let f_ab = textureSampleLevel(uBrdfLutTexture, uBrdfLutSampler, vec2<f32>(NdotV_ibl, roughness), 0.0).rg;

    let Fr = max(vec3<f32>(f90 - f90 * roughness), fresnelF0) - fresnelF0;
    let k_S = fresnelF0 + Fr * exp2((-5.55473 * NdotV_ibl - 6.98316) * NdotV_ibl);
    let FssEss = k_S * f_ab.x + f90 * f_ab.y;

    let Ems = 1.0 - (f_ab.x + f_ab.y);
    let F_avg = fresnelF0 + (f90 - fresnelF0) / 21.0;
    let Fms = FssEss * F_avg / (1.0 - F_avg * Ems + 1e-5);
    let FmsEms = Fms * Ems;

    let k_D = albedo * (1.0 - FssEss - FmsEms) * (1.0 - metallic);

    ambient += FssEss * radiance + (FmsEms + k_D) * irradiance;
  }
`}},gl:{fragment:{lighting:`
  {
    float NdotV_ibl = max(dot(normal, viewDir), 0.0);
    vec3 R_ibl = reflect(-viewDir, specularNormal);

    vec3 radiance = sampleEnvironment(R_ibl, roughness);
    vec3 irradiance = sampleEnvironment(normal, 1.0);

    vec2 f_ab = texture(uBrdfLutTexture, vec2(NdotV_ibl, roughness)).rg;

    vec3 Fr = max(vec3(f90 - f90 * roughness), fresnelF0) - fresnelF0;
    vec3 k_S = fresnelF0 + Fr * exp2((-5.55473 * NdotV_ibl - 6.98316) * NdotV_ibl);
    vec3 FssEss = k_S * f_ab.x + f90 * f_ab.y;

    float Ems = 1.0 - (f_ab.x + f_ab.y);
    vec3 F_avg = fresnelF0 + (f90 - fresnelF0) / 21.0;
    vec3 Fms = FssEss * F_avg / (1.0 - F_avg * Ems + 1e-5);
    vec3 FmsEms = Fms * Ems;

    vec3 k_D = albedo * (1.0 - FssEss - FmsEms) * (1.0 - metallic);

    ambient += FssEss * radiance + (FmsEms + k_D) * irradiance;
  }
`}}},cf={name:"iridescence",requires:[Ht],textures:["iridescence"],bindings:{material:{transmissionVolume:"vec4<f32>",attenuationColorIrid:"vec4<f32>",iridescenceThickness:"f32",iridescenceThicknessMinimum:"f32"}},gpu:{header:`
const XYZ_TO_REC709 = mat3x3<f32>(
   3.2404542, -0.9692660,  0.0556434,
  -1.5371385,  1.8760108, -0.2040259,
  -0.4985314,  0.0415560,  1.0572252,
);

fn evalSensitivity(OPD: f32, shift: vec3<f32>) -> vec3<f32> {
  let phase = 2.0 * PI * OPD * 1e-9;
  let val = vec3<f32>(5.4856e-13, 4.4201e-13, 5.2481e-13);
  let pos = vec3<f32>(1.6810e+06, 1.7953e+06, 2.2084e+06);
  let vr  = vec3<f32>(4.3278e+09, 9.3046e+09, 6.6121e+09);
  var xyz = val * sqrt(2.0 * PI * vr) * cos(pos * phase + shift) * exp(-vr * phase * phase);
  xyz.x += 9.7470e-14 * sqrt(2.0 * PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift.x) * exp(-4.5282e+09 * phase * phase);
  xyz /= 1.0685e-7;
  let srgb = XYZ_TO_REC709 * xyz;
  return srgb;
}

fn IorToFresnel0(transmittedIor: f32, incidentIor: f32) -> f32 {
  let r = (transmittedIor - incidentIor) / (transmittedIor + incidentIor);
  return r * r;
}

fn IorToFresnel0v(transmittedIor: vec3<f32>, incidentIor: f32) -> vec3<f32> {
  let r = (transmittedIor - vec3(incidentIor)) / (transmittedIor + vec3(incidentIor));
  return r * r;
}

fn Fresnel0ToIorV(f0: vec3<f32>) -> vec3<f32> {
  let sqrtF0 = sqrt(clamp(f0, vec3(0.0), vec3(0.9999)));
  return (vec3(1.0) + sqrtF0) / (vec3(1.0) - sqrtF0);
}

fn F_Schlick_scalar(f0: f32, f90: f32, VdotH: f32) -> f32 {
  let fc5 = exp2((-5.55473 * VdotH - 6.98316) * VdotH);
  return f0 + (f90 - f0) * fc5;
}

fn F_Schlick_v(f0: vec3<f32>, f90: f32, VdotH: f32) -> vec3<f32> {
  let fc5 = exp2((-5.55473 * VdotH - 6.98316) * VdotH);
  return f0 + (vec3(f90) - f0) * fc5;
}

fn evalIridescence(outsideIor: f32, iridescenceIor: f32, cosTheta: f32,
                    thinFilmThickness: f32, baseF0: vec3<f32>) -> vec3<f32> {
  let iridIor = mix(outsideIor, iridescenceIor, smoothstep(0.0, 0.03, thinFilmThickness));

  let sinTheta2Sq = (outsideIor * outsideIor) / (iridIor * iridIor)
                     * (1.0 - cosTheta * cosTheta);
  let cosTheta2Sq = 1.0 - sinTheta2Sq;
  if (cosTheta2Sq < 0.0) { return vec3<f32>(1.0); }
  let cosTheta2 = sqrt(cosTheta2Sq);

  let R12 = IorToFresnel0(iridIor, outsideIor);
  let R12s = F_Schlick_scalar(R12, 1.0, cosTheta);
  let T121 = 1.0 - R12s;
  var phi12: f32 = 0.0;
  if (iridIor < outsideIor) { phi12 = PI; }
  let phi21 = PI - phi12;

  let baseIor = Fresnel0ToIorV(baseF0);
  let R23 = IorToFresnel0v(baseIor, iridIor);
  let R23s = F_Schlick_v(R23, 1.0, cosTheta2);
  var phi23 = vec3<f32>(0.0);
  if (baseIor.x < iridIor) { phi23.x = PI; }
  if (baseIor.y < iridIor) { phi23.y = PI; }
  if (baseIor.z < iridIor) { phi23.z = PI; }

  let OPD = 2.0 * iridIor * thinFilmThickness * cosTheta2;
  let phi = vec3<f32>(phi21) + phi23;

  let R123 = clamp(R12s * R23s, vec3(1e-5), vec3(0.9999));
  let r123 = sqrt(R123);
  let Rs = (T121 * T121 * R23s) / (vec3(1.0) - R123);

  var I = vec3<f32>(R12s) + Rs;

  var Cm = Rs - vec3<f32>(T121);
  for (var m: i32 = 1; m <= 2; m = m + 1) {
    Cm *= r123;
    let mf = f32(m);
    let Sm = 2.0 * evalSensitivity(mf * OPD, mf * phi);
    I = I + Cm * Sm;
  }

  return max(I, vec3(0.0));
}
`,fragment:{material:`
  {
    let iridTex = sampleIridescence(input.vUV);
    let iridescenceFactor = material.transmissionVolume.w * iridTex.r;
    let iridescenceIor = material.attenuationColorIrid.w;
    let iridThickness = mix(
      material.iridescenceThicknessMinimum,
      material.iridescenceThickness,
      iridTex.g,
    );
    let iridNdotV = max(dot(normal, viewDir), 0.001);
    let iridF = evalIridescence(1.0, iridescenceIor, iridNdotV, iridThickness, fresnelF0);
    fresnelF0 = mix(fresnelF0, iridF, iridescenceFactor);
  }
`}},gl:{header:`
const mat3 XYZ_TO_REC709 = mat3(
   3.2404542, -0.9692660,  0.0556434,
  -1.5371385,  1.8760108, -0.2040259,
  -0.4985314,  0.0415560,  1.0572252
);

vec3 evalSensitivity(float OPD, vec3 shift) {
  float phase = 2.0 * PI * OPD * 1e-9;
  vec3 val = vec3(5.4856e-13, 4.4201e-13, 5.2481e-13);
  vec3 pos = vec3(1.6810e+06, 1.7953e+06, 2.2084e+06);
  vec3 vr  = vec3(4.3278e+09, 9.3046e+09, 6.6121e+09);
  vec3 xyz = val * sqrt(2.0 * PI * vr) * cos(pos * phase + shift) * exp(-vr * phase * phase);
  xyz.x += 9.7470e-14 * sqrt(2.0 * PI * 4.5282e+09) * cos(2.2399e+06 * phase + shift.x) * exp(-4.5282e+09 * phase * phase);
  xyz /= 1.0685e-7;
  vec3 srgb = XYZ_TO_REC709 * xyz;
  return srgb;
}

float IorToFresnel0(float transmittedIor, float incidentIor) {
  float r = (transmittedIor - incidentIor) / (transmittedIor + incidentIor);
  return r * r;
}

vec3 IorToFresnel0v(vec3 transmittedIor, float incidentIor) {
  vec3 r = (transmittedIor - vec3(incidentIor)) / (transmittedIor + vec3(incidentIor));
  return r * r;
}

vec3 Fresnel0ToIorV(vec3 f0) {
  vec3 sqrtF0 = sqrt(clamp(f0, 0.0, 0.9999));
  return (vec3(1.0) + sqrtF0) / (vec3(1.0) - sqrtF0);
}

float F_Schlick_scalar(float f0, float f90, float VdotH) {
  float fc5 = exp2((-5.55473 * VdotH - 6.98316) * VdotH);
  return f0 + (f90 - f0) * fc5;
}

vec3 F_Schlick_v(vec3 f0, float f90, float VdotH) {
  float fc5 = exp2((-5.55473 * VdotH - 6.98316) * VdotH);
  return f0 + (vec3(f90) - f0) * fc5;
}

vec3 evalIridescence(float outsideIor, float iridescenceIor, float cosTheta,
                      float thinFilmThickness, vec3 baseF0) {
  float iridIor = mix(outsideIor, iridescenceIor, smoothstep(0.0, 0.03, thinFilmThickness));

  float sinTheta2Sq = (outsideIor * outsideIor) / (iridIor * iridIor)
                       * (1.0 - cosTheta * cosTheta);
  float cosTheta2Sq = 1.0 - sinTheta2Sq;
  if (cosTheta2Sq < 0.0) { return vec3(1.0); }
  float cosTheta2 = sqrt(cosTheta2Sq);

  float R12 = IorToFresnel0(iridIor, outsideIor);
  float R12s = F_Schlick_scalar(R12, 1.0, cosTheta);
  float T121 = 1.0 - R12s;
  float phi12 = 0.0;
  if (iridIor < outsideIor) { phi12 = PI; }
  float phi21 = PI - phi12;

  vec3 baseIor = Fresnel0ToIorV(baseF0);
  vec3 R23 = IorToFresnel0v(baseIor, iridIor);
  vec3 R23s = F_Schlick_v(R23, 1.0, cosTheta2);
  vec3 phi23 = vec3(0.0);
  if (baseIor.x < iridIor) phi23.x = PI;
  if (baseIor.y < iridIor) phi23.y = PI;
  if (baseIor.z < iridIor) phi23.z = PI;

  float OPD = 2.0 * iridIor * thinFilmThickness * cosTheta2;
  vec3 phi = vec3(phi21) + phi23;

  vec3 R123 = clamp(R12s * R23s, 1e-5, 0.9999);
  vec3 r123 = sqrt(R123);
  vec3 Rs = (T121 * T121 * R23s) / (vec3(1.0) - R123);

  vec3 I = vec3(R12s) + Rs;

  vec3 Cm = Rs - vec3(T121);
  for (int m = 1; m <= 2; m++) {
    Cm *= r123;
    float mf = float(m);
    vec3 Sm = 2.0 * evalSensitivity(mf * OPD, mf * phi);
    I += Cm * Sm;
  }

  return max(I, vec3(0.0));
}
`,fragment:{material:`
  {
    vec4 iridTex = sampleIridescence(vUV);
    float iridescenceFactor = material.transmissionVolume.w * iridTex.r;
    float iridescenceIor = material.attenuationColorIrid.w;
    float iridThickness = mix(
      material.iridescenceThicknessMinimum,
      material.iridescenceThickness,
      iridTex.g
    );

    float iridNdotV = max(dot(normal, viewDir), 0.001);
    vec3 iridF = evalIridescence(1.0, iridescenceIor, iridNdotV, iridThickness, fresnelF0);
    fresnelF0 = mix(fresnelF0, iridF, iridescenceFactor);
  }
`}}},lc=Math.ceil(36),uc=Math.ceil(8),ht=new Float32Array(108);function Gn(e,t,s,r){for(let i=0;i<s;i++){const n=2*i/(s-1)-1,o=e[t]-n*e[3],a=e[t+4]-n*e[7],c=e[t+8]-n*e[11],l=1/Math.sqrt(o*o+a*a+c*c),u=r+i*4;ht[u]=o*l,ht[u+1]=a*l,ht[u+2]=c*l,ht[u+3]=(e[t+12]-n*e[15])*l}}function lf(e,t,s,r,i,n,o){const a=r.elements,c=68,l=i.elements,u=Math.hypot(l[2],l[6],l[10]);let h=0,d=0,f=1/0,p=-1/0;e.fill(0),Gn(a,0,17,0),Gn(a,1,10,c);const m=Math.sqrt(a[3]*a[3]+a[7]*a[7]+a[11]*a[11]);for(let b=0;b<s;b++){const y=b*16,v=1<<b,x=Math.sqrt(t[y+7]);if(t[y+3]===0||x<=0||!Number.isFinite(x)){h|=v;continue}const w=t[y],T=t[y+1],B=t[y+2];if(a[3]*w+a[7]*T+a[11]*B+a[15]<=-x*m)continue;let S=0,C=15;for(let A=0;A<=16;A++){const z=A*4,k=ht[z]*w+ht[z+1]*T+ht[z+2]*B+ht[z+3];k>=x?S=Math.max(S,A):k<=-x&&(C=Math.min(C,A-1))}if(S>C)continue;let D=0,I=8;for(let A=0;A<=9;A++){const z=c+A*4,k=ht[z]*w+ht[z+1]*T+ht[z+2]*B+ht[z+3];k>=x?D=Math.max(D,A):k<=-x&&(I=Math.min(I,A-1))}if(D>I)continue;d|=v;const M=-(l[2]*w+l[6]*T+l[10]*B+l[14]),P=x*u;f=Math.min(f,M-P),p=Math.max(p,M+P);for(let A=D;A<=I;A++){const z=A*16;for(let k=S;k<=C;k++)e[z+k]|=v}}if(h!==0)for(let y=0;y<144;y++)e[y]|=h;if(n.fill(h),o.fill(0),d===0)return;m>0&&(f=Math.max(f,0));const _=32/Math.max(p-f,1e-6);o[0]=-l[2]*_,o[1]=-l[6]*_,o[2]=-l[10]*_,o[3]=(-l[14]-f)*_;const g=Math.hypot(o[0],o[1],o[2]);for(let b=0;b<s;b++){const y=1<<b;if((d&y)===0)continue;const v=b*16,x=t[v]*o[0],w=t[v+1]*o[1],T=t[v+2]*o[2],B=x+w+T+o[3],S=Math.sqrt(t[v+7])*g,C=(Math.abs(x)+Math.abs(w)+Math.abs(T)+Math.abs(o[3])+S)*1e-6+1e-5,D=Math.max(0,Math.min(31,Math.floor(B-S-C))),I=Math.max(0,Math.min(31,Math.floor(B+S+C)));for(let M=D;M<=I;M++)n[M]|=y}}var uf=class{masks=new Int32Array(144).fill(-1);depthMasks=new Int32Array(32).fill(-1);depthPlane=new Float32Array(4);tileTransform=new Float32Array(4);_session=null;prepare(e,t,s){if(this._session===e)return!1;this._session=e;const r=e.view3d._lightDataList;return lf(this.masks,r.data,r.count,t,s,this.depthMasks,this.depthPlane),!0}setViewport(e,t){const s=this.tileTransform,r=Math.fround(16/e.width),i=Math.fround((t?-9:9)/e.height),n=Math.fround(-e.x*r),o=Math.fround((t?9:0)-e.y*i);return s[0]===r&&s[1]===i&&s[2]===n&&s[3]===o?!1:(s[0]=r,s[1]=i,s[2]=n,s[3]=o,!0)}invalidate(){this._session=null}destroy(){this.invalidate()}};const hf=`
#ifndef PIXIJS_3D_GET_LIGHT_DEFINED
#define PIXIJS_3D_GET_LIGHT_DEFINED
Light getLight(int index) {
  int offset = index * 4;
  vec4 d0 = uLightData[offset + 0];
  vec4 d1 = uLightData[offset + 1];
  vec4 d2 = uLightData[offset + 2];
  vec4 d3 = uLightData[offset + 3];

  Light l;
  l.position = d0.xyz;
  l.type = d0.w;
  l.color = d1.xyz;
  l.rangeSq = d1.w;
  l.direction = d2.xyz;
  l.coneCos = d2.w;
  l.innerConeCos = d3.x;
  l.shadowDataIndex = d3.y;
  l.radiusPow4 = d3.w;
  return l;
}
#endif
`;function df(e){const t=`
{
${e.preLighting?.gpu??""}
{{fragmentLobePreLighting}}

  let lightTile = clamp(
    vec2<i32>(input.position.xy * camera.uLightTileTransform.xy + camera.uLightTileTransform.zw),
    vec2<i32>(0),
    vec2<i32>(15, 8)
  );
  let lightTileIndex = lightTile.y * 16 + lightTile.x;
  let lightDepthIndex = i32(clamp(
    dot(camera.uLightDepthPlane, vec4<f32>(input.vPosition, 1.0)), 0.0, 31.0
  ));
  var lightMask = u32(camera.uLightTiles[lightTileIndex >> 2][lightTileIndex & 3]) &
    u32(camera.uLightDepthMasks[lightDepthIndex >> 2][lightDepthIndex & 3]);

  for (var n: i32 = 0; n < 32; n++) {
    if (lightMask == 0u) { break; }
    let i = i32(firstTrailingBit(lightMask));
    lightMask &= lightMask - 1u;

    let lightOffset = i * 4;
    let light0 = global.uLightData[lightOffset];
    let light1 = global.uLightData[lightOffset + 1];
    let light2 = global.uLightData[lightOffset + 2];
    let light3 = global.uLightData[lightOffset + 3];
    let light = Light(light0.xyz, light0.w, light1.xyz, light1.w, light2.xyz, light2.w, light3.x, light3.y, light3.z, light3.w);

    var lightDir: vec3<f32>;
    var attenuation: f32 = 1.0;

    if (light.kind == LIGHT_DIRECTIONAL) {
      lightDir = -light.direction;
    } else {
      let toLight = light.position - input.vPosition;
      let distanceSq = dot(toLight, toLight);

      if (light.rangeSq > 0.0) {
        if (distanceSq >= light.rangeSq) { continue; }

        let distRatio = distanceSq / light.rangeSq;
        let windowFalloff = saturate(1.0 - distRatio * distRatio);
        attenuation = windowFalloff * windowFalloff * inverseSqrt(distanceSq * distanceSq + light.radiusPow4);
      } else {
        attenuation = inverseSqrt(distanceSq * distanceSq + light.radiusPow4);
      }

      lightDir = toLight * inverseSqrt(distanceSq);

      if (light.kind == LIGHT_SPOT) {
        let spotCos = dot(-lightDir, light.direction);
        let spotAtten = saturate((spotCos - light.coneCos) / max(light.innerConeCos - light.coneCos, 1e-6));
        attenuation *= spotAtten * spotAtten;
      }
    }

    if (attenuation <= 0.0) { continue; }

    let nDotL = max(dot(normal, lightDir), 0.0);
    if (nDotL <= 0.0) { continue; }

    let shadow = calculateShadow(light.shadowDataIndex, light.cascadeCount, input.vPosition, normal, nDotL);

${e.perLight.gpu??""}
{{fragmentLobePerLight}}
  }

${e.postLighting?.gpu??""}
{{fragmentLobePostLighting}}
}
`,s=`
{
${e.preLighting?.gl??""}
{{lobePreLighting}}

  ivec2 lightTile = clamp(
    ivec2(gl_FragCoord.xy * uLightTileTransform.xy + uLightTileTransform.zw),
    ivec2(0),
    ivec2(15, 8)
  );
  int lightTileIndex = lightTile.y * 16 + lightTile.x;
  int lightDepthIndex = int(clamp(
    dot(uLightDepthPlane, vec4(vPosition, 1.0)), 0.0, 31.0
  ));
  uint lightMask = uint(uLightTiles[lightTileIndex >> 2][lightTileIndex & 3]) &
    uint(uLightDepthMasks[lightDepthIndex >> 2][lightDepthIndex & 3]);

  for (int n = 0; n < 32; n++) {
    if (lightMask == 0u) break;
    uint lowestBit = lightMask & (0u - lightMask);
    int i = int(floatBitsToUint(float(lowestBit)) >> 23u) - 127;
    lightMask &= lightMask - 1u;

    Light light = getLight(i);

    vec3 lightDir;
    float attenuation = 1.0;

    if (light.type == LIGHT_DIRECTIONAL) {
      lightDir = -light.direction;
    } else {
      vec3 toLight = light.position - vPosition;
      float distanceSq = dot(toLight, toLight);

      if (light.rangeSq > 0.0) {
        if (distanceSq >= light.rangeSq) continue;

        float distRatio = distanceSq / light.rangeSq;
        float windowFalloff = clamp(1.0 - distRatio * distRatio, 0.0, 1.0);
        attenuation = windowFalloff * windowFalloff * inversesqrt(distanceSq * distanceSq + light.radiusPow4);
      } else {
        attenuation = inversesqrt(distanceSq * distanceSq + light.radiusPow4);
      }

      lightDir = toLight * inversesqrt(distanceSq);

      if (light.type == LIGHT_SPOT) {
        float spotCos = dot(-lightDir, light.direction);
        float spotAtten = clamp((spotCos - light.coneCos) / max(light.innerConeCos - light.coneCos, 1e-6), 0.0, 1.0);
        attenuation *= spotAtten * spotAtten;
      }
    }

    if (attenuation <= 0.0) continue;

    float nDotL = max(dot(normal, lightDir), 0.0);
    if (nDotL <= 0.0) continue;

    float shadow = calculateShadow(light, vPosition, normal, nDotL);

${e.perLight.gl??""}
{{lobePerLight}}
  }

${e.postLighting?.gl??""}
{{lobePostLighting}}
}
`;return{name:e.name,requires:e.requires,structs:e.structs,bindings:e.bindings,textures:e.textures,gpu:{header:e.header?.gpu,fragment:{lighting:t}},gl:{header:`${hf}
${e.header?.gl??""}`,fragment:{lighting:s}}}}const On=df({name:"pbrLighting",requires:[Ht],preLighting:{gpu:`
  directLight = vec3<f32>(0.0);

  ambient += global.uGlobalLightParams.xyz * albedo * (1.0 - metallic) * INV_PI;

  let nDotV = max(dot(normal, viewDir), 0.0);
  let a = roughness * roughness;
  let a2 = a * a;
  let a2_inv_pi = a2 * INV_PI;
  let oneMinusA = 1.0 - a;
  let visV = nDotV * oneMinusA + a;
  let albedoOverPI = albedo * INV_PI;
`,gl:`
  directLight = vec3(0.0);

  ambient += uGlobalLightParams.xyz * albedo * (1.0 - metallic) * INV_PI;

  float nDotV = max(dot(normal, viewDir), 0.0);
  float a = roughness * roughness;
  float a2 = a * a;
  float a2_inv_pi = a2 * INV_PI;
  float oneMinusA = 1.0 - a;
  float visV = nDotV * oneMinusA + a;
  vec3 albedoOverPI = albedo * INV_PI;
`},perLight:{gpu:`
    let halfVector = normalize(viewDir + lightDir);
    let hDotV = max(dot(halfVector, viewDir), 0.0);

    let nDotH = max(dot(normal, halfVector), 0.0);
    let dDenom = (nDotH * nDotH * (a2 - 1.0) + 1.0);
    let distribution = a2_inv_pi / (dDenom * dDenom);

    let vis = 0.5 / max(nDotL * visV + nDotV * (nDotL * oneMinusA + a), 1e-6);

    let fc5 = exp2((-5.55473 * hDotV - 6.98316) * hDotV);
    let fresnel = fresnelF0 + (vec3<f32>(f90) - fresnelF0) * fc5;

    let specular = distribution * fresnel * vis;
    let diffuseWeight = (vec3<f32>(1.0) - fresnel) * (1.0 - metallic);

    let radiance = light.color * attenuation;
    directLight += (diffuseWeight * albedoOverPI + specular) * radiance * nDotL * shadow;
`,gl:`
    vec3 halfVector = normalize(viewDir + lightDir);
    float hDotV = max(dot(halfVector, viewDir), 0.0);

    float nDotH = max(dot(normal, halfVector), 0.0);
    float dDenom = (nDotH * nDotH * (a2 - 1.0) + 1.0);
    float distribution = a2_inv_pi / (dDenom * dDenom);

    float vis = 0.5 / max(nDotL * visV + nDotV * (nDotL * oneMinusA + a), 1e-6);

    float fc5 = exp2((-5.55473 * hDotV - 6.98316) * hDotV);
    vec3 fresnel = fresnelF0 + (vec3(f90) - fresnelF0) * fc5;

    vec3 specular = distribution * fresnel * vis;
    vec3 diffuseWeight = (vec3(1.0) - fresnel) * (1.0 - metallic);

    vec3 radiance = light.color * attenuation;
    directLight += (diffuseWeight * albedoOverPI + specular) * radiance * nDotL * shadow;
`},postLighting:{gpu:`
  finalColor = (ambient * occlusion) + directLight + emissive;
`,gl:`
  finalColor = (ambient * occlusion) + directLight + emissive;
`}}),Or={name:"pbrMaterial",textures:["baseColor","metallicRoughness","occlusion","normal"],bindings:{material:{baseColor:"vec4<f32>",alphaCutoff:"f32",pbrParams:"vec4<f32>",transmissionVolume:"vec4<f32>",attenuationColorIrid:"vec4<f32>",normalScale:"f32"}},gpu:{fragment:{material:`
  var viewDir: vec3<f32>;
  var metallic: f32 = 0.0;
  var roughness: f32 = 1.0;
  var fresnelF0: vec3<f32>;
  var f90: f32 = 1.0;
  var emissive: vec3<f32> = vec3<f32>(0.0);
  var occlusion: f32 = 1.0;
  var directLight: vec3<f32> = vec3<f32>(0.0);
  var ambient: vec3<f32> = vec3<f32>(0.0);

  var baseColor = material.baseColor;
  metallic = material.pbrParams.x;
  roughness = material.pbrParams.y;
  occlusion = material.pbrParams.z;

  let ior = material.pbrParams.w;
  let iorRatio = (ior - 1.0) / (ior + 1.0);
  fresnelF0 = vec3<f32>(iorRatio * iorRatio);

  var baseTex = sampleBaseColor(input.vUV);
  let baseTexLinear = baseTex.rgb / max(baseTex.a, 0.001);
  baseTex = vec4<f32>(pow(baseTexLinear, vec3<f32>(2.2)), baseTex.a);
  baseColor *= baseTex;

  let mrTex = sampleMetallicRoughness(input.vUV);
  metallic *= mrTex.b;
  roughness *= mrTex.g;

  occlusion *= sampleOcclusion(input.vUV).r;

  let dNdx = abs(dpdx(normal));
  let dNdy = abs(dpdy(normal));
  let dN = max(dNdx, dNdy);
  let geometricRoughness = max(max(dN.x, dN.y), dN.z);
  roughness = clamp(max(roughness, 0.045) + geometricRoughness, 0.0, 1.0);

  albedo *= baseColor.rgb;
  alpha *= baseColor.a;

  viewDir = normalize(camera.uCameraPosition.xyz - input.vPosition);
  fresnelF0 = mix(fresnelF0, albedo, metallic);

  var specularNormal = normal;
`}},gl:{fragment:{material:`
  vec3 viewDir;
  float metallic = 0.0;
  float roughness = 1.0;
  vec3 fresnelF0;
  float f90 = 1.0;
  vec3 emissive = vec3(0.0);
  float occlusion = 1.0;
  vec3 directLight = vec3(0.0);
  vec3 ambient = vec3(0.0);

  vec4 baseColor = material.baseColor;
  metallic = material.pbrParams.x;
  roughness = material.pbrParams.y;
  occlusion = material.pbrParams.z;

  float ior = material.pbrParams.w;
  float iorRatio = (ior - 1.0) / (ior + 1.0);
  fresnelF0 = vec3(iorRatio * iorRatio);

  vec4 baseTex = sampleBaseColor(vUV);
  vec3 baseTexLinear = baseTex.rgb / max(baseTex.a, 0.001);
  baseTex.rgb = pow(baseTexLinear, vec3(2.2));
  baseColor *= baseTex;

  vec4 mrTex = sampleMetallicRoughness(vUV);
  metallic *= mrTex.b;
  roughness *= mrTex.g;

  occlusion *= sampleOcclusion(vUV).r;

  vec3 dNdx = abs(dFdx(normal));
  vec3 dNdy = abs(dFdy(normal));
  vec3 dN = max(dNdx, dNdy);
  float geometricRoughness = max(max(dN.x, dN.y), dN.z);
  roughness = clamp(max(roughness, 0.045) + geometricRoughness, 0.0, 1.0);

  albedo *= baseColor.rgb;
  alpha *= baseColor.a;

  viewDir = normalize(uCameraPosition.xyz - vPosition);
  fresnelF0 = mix(fresnelF0, albedo, metallic);

  vec3 specularNormal = normal;
`}}},ff={name:"sheen",requires:[Ht],textures:["sheen"],bindings:{material:{sheenParams:"vec4<f32>"}},gpu:{header:`
fn charlieD(charlieScale: f32, invAlphaHalf: f32, NdotH: f32) -> f32 {
  let cos2h = NdotH * NdotH;
  let sin2h = max(1.0 - cos2h, 0.0078125);
  return charlieScale * pow(sin2h, invAlphaHalf);
}

fn ashikhminV(NdotL: f32, NdotV: f32) -> f32 {
  return 1.0 / (4.0 * (NdotL + NdotV - NdotL * NdotV) + 1e-5);
}

fn sheenE(NdotV: f32, sheenRoughness: f32) -> f32 {
  let r = sheenRoughness;
  let a = mix(21.5473, 25.3245, r);
  let b = mix(3.82987, 3.32435, r);
  let c = mix(0.19823, 0.16801, r);
  let d = mix(-1.97760, -1.27393, r);
  let e = mix(-4.32054, -4.85967, r);
  return a / (1.0 + b * pow(NdotV, c)) + d * NdotV + e;
}
`,fragment:{lobePreLighting:`
  let sheenTex = sampleSheen(input.vUV);
  let sheenTexStraight = sheenTex.rgb / max(sheenTex.a, 0.001);
  let sheenTexColor = pow(sheenTexStraight, vec3<f32>(2.2));
  let sheenColor = material.sheenParams.rgb * sheenTexColor;

  let sheenRoughnessIBL = clamp(material.sheenParams.a * sheenTex.a, 0.0, 1.0);
  let sheenRoughness = max(sheenRoughnessIBL, 0.07);
  let sheenAlpha = sheenRoughness * sheenRoughness;
  let sheenInvAlpha = 1.0 / sheenAlpha;
  let sheenInvAlphaHalf = sheenInvAlpha * 0.5;
  let sheenCharlieScale = (2.0 + sheenInvAlpha) * INV_PI * 0.5;
  let sheenMax = max(sheenColor.r, max(sheenColor.g, sheenColor.b));

  var sheenLight = vec3<f32>(0.0);
`,lobePerLight:`
    {
      let shD = charlieD(sheenCharlieScale, sheenInvAlphaHalf, nDotH);
      let shV = ashikhminV(nDotL, nDotV);
      sheenLight += sheenColor * shD * shV * nDotL * light.color * attenuation * shadow;
    }
`,lobePostLighting:`
  let shR = reflect(-viewDir, normal);
  let shPref = sampleEnvironment(shR, sheenRoughnessIBL);
  let shE = clamp(sheenE(nDotV, sheenRoughnessIBL), 0.0, 1.0);
  let sheenIBL = sheenColor * shPref * shE;
  let sheenAlbedoScale = 1.0 - sheenMax * shE;
  finalColor = finalColor * sheenAlbedoScale + sheenLight + sheenIBL;
`}},gl:{fragment:{header:`
float charlieD(float charlieScale, float invAlphaHalf, float NdotH) {
  float cos2h = NdotH * NdotH;
  float sin2h = max(1.0 - cos2h, 0.0078125);
  return charlieScale * pow(sin2h, invAlphaHalf);
}

float ashikhminV(float NdotL, float NdotV) {
  return 1.0 / (4.0 * (NdotL + NdotV - NdotL * NdotV) + 1e-5);
}

float sheenE(float NdotV, float sheenRoughness) {
  float r = sheenRoughness;
  float a = mix(21.5473, 25.3245, r);
  float b = mix(3.82987, 3.32435, r);
  float c = mix(0.19823, 0.16801, r);
  float d = mix(-1.97760, -1.27393, r);
  float e = mix(-4.32054, -4.85967, r);
  return a / (1.0 + b * pow(NdotV, c)) + d * NdotV + e;
}
`,lobePreLighting:`
  vec4 sheenTex = sampleSheen(vUV);
  vec3 sheenTexStraight = sheenTex.rgb / max(sheenTex.a, 0.001);
  vec3 sheenTexColor = pow(sheenTexStraight, vec3(2.2));
  vec3 sheenColor = material.sheenParams.rgb * sheenTexColor;

  float sheenRoughnessIBL = clamp(material.sheenParams.a * sheenTex.a, 0.0, 1.0);
  float sheenRoughness = max(sheenRoughnessIBL, 0.07);
  float sheenAlpha = sheenRoughness * sheenRoughness;
  float sheenInvAlpha = 1.0 / sheenAlpha;
  float sheenInvAlphaHalf = sheenInvAlpha * 0.5;
  float sheenCharlieScale = (2.0 + sheenInvAlpha) * INV_PI * 0.5;
  float sheenMax = max(sheenColor.r, max(sheenColor.g, sheenColor.b));

  vec3 sheenLight = vec3(0.0);
`,lobePerLight:`
    {
      float shD = charlieD(sheenCharlieScale, sheenInvAlphaHalf, nDotH);
      float shV = ashikhminV(nDotL, nDotV);
      sheenLight += sheenColor * shD * shV * nDotL * light.color * attenuation * shadow;
    }
`,lobePostLighting:`
  vec3 shR = reflect(-viewDir, normal);
  vec3 shPref = sampleEnvironment(shR, sheenRoughnessIBL);
  float shE = clamp(sheenE(nDotV, sheenRoughnessIBL), 0.0, 1.0);
  vec3 sheenIBL = sheenColor * shPref * shE;
  float sheenAlbedoScale = 1.0 - sheenMax * shE;
  finalColor = finalColor * sheenAlbedoScale + sheenLight + sheenIBL;
`}}},pf={name:"specular",textures:["specular"],bindings:{material:{specularParams:"vec4<f32>"}},gpu:{fragment:{material:`
  {
    let specTex = sampleSpecular(input.vUV);
    let specTexStraight = specTex.rgb / max(specTex.a, 0.001);
    let specTexColor = pow(specTexStraight, vec3<f32>(2.2));
    let specColor = material.specularParams.rgb * specTexColor;
    let specFactor = material.specularParams.w * specTex.a;

    let ior = material.pbrParams.w;
    let iorRatio = (ior - 1.0) / (ior + 1.0);
    let iorF0 = vec3<f32>(iorRatio * iorRatio);
    let dielectricF0 = min(iorF0 * specColor, vec3<f32>(1.0)) * specFactor;

    fresnelF0 = mix(dielectricF0, albedo, metallic);
    f90 = mix(specFactor, 1.0, metallic);
  }
`}},gl:{fragment:{material:`
  {
    vec4 specTex = sampleSpecular(vUV);
    vec3 specTexStraight = specTex.rgb / max(specTex.a, 0.001);
    vec3 specTexColor = pow(specTexStraight, vec3(2.2));
    vec3 specColor = material.specularParams.rgb * specTexColor;
    float specFactor = material.specularParams.w * specTex.a;

    float ior = material.pbrParams.w;
    float iorRatio = (ior - 1.0) / (ior + 1.0);
    vec3 iorF0 = vec3(iorRatio * iorRatio);
    vec3 dielectricF0 = min(iorF0 * specColor, vec3(1.0)) * specFactor;

    fresnelF0 = mix(dielectricF0, albedo, metallic);
    f90 = mix(specFactor, 1.0, metallic);
  }
`}}},mf={name:"screenSpaceFuncs",gpu:{header:`
fn screenUVFromWorld(worldPos: vec3<f32>) -> vec2<f32> {
  let clip = camera.uViewProjectionMatrix * vec4<f32>(worldPos, 1.0);
  let ndc = clip.xy / clip.w;
  let uv = vec2<f32>(ndc.x * 0.5 + 0.5, 1.0 - (ndc.y * 0.5 + 0.5)) * camera.uViewportUVScale;
  return clamp(uv, vec2<f32>(0.0), camera.uViewportUVScale);
}

fn sampleScreenCopy(tex: texture_2d<f32>, samp: sampler, worldPos: vec3<f32>, lod: f32) -> vec4<f32> {
  let texDims = vec2<f32>(textureDimensions(tex));
  let inset = min(exp2(lod) * 0.5 / texDims, camera.uViewportUVScale * 0.5);
  let uv = clamp(screenUVFromWorld(worldPos), inset, camera.uViewportUVScale - inset);
  return textureSampleLevel(tex, samp, uv, lod);
}
`},gl:{header:`
vec2 screenUVFromWorld(vec3 worldPos) {
  vec4 clip = uViewProjectionMatrix * vec4(worldPos, 1.0);
  vec2 uv = (clip.xy / clip.w * 0.5 + 0.5) * uViewportUVScale;
  return clamp(uv, vec2(0.0), uViewportUVScale);
}

vec4 sampleScreenCopy(sampler2D tex, vec3 worldPos, float lod) {
  vec2 texDims = vec2(textureSize(tex, 0));
  vec2 inset = min(exp2(lod) * 0.5 / texDims, uViewportUVScale * 0.5);
  vec2 uv = clamp(screenUVFromWorld(worldPos), inset, uViewportUVScale - inset);
  return textureLod(tex, uv, lod);
}
`}},gf={name:"transmission",requires:[mf],textures:["transmission","thickness"],interStage:{vModelScale:"vec3<f32>"},bindings:{material:{pbrParams:"vec4<f32>",transmissionVolume:"vec4<f32>",attenuationColorIrid:"vec4<f32>"}},gpu:{vertex:{end:`
  output.vModelScale = vec3<f32>(
    length(modelMatrix[0].xyz),
    length(modelMatrix[1].xyz),
    length(modelMatrix[2].xyz)
  );
`},fragment:{material:`
  {
    let transmissionFactor = material.transmissionVolume.x;
    let thicknessFactor = material.transmissionVolume.y;
    let ior = material.pbrParams.w;

    let txFactor = transmissionFactor * sampleTransmission(input.vUV).r;
    let thickness = thicknessFactor * sampleThickness(input.vUV).g;

    let colorTexDims = vec2<f32>(textureDimensions(uOpaqueColorTexture));

    let refractedDir = refract(-viewDir, normal, 1.0 / ior);
    let transmissionRay = normalize(refractedDir) * thickness * input.vModelScale;
    let exitPoint = input.vPosition + transmissionRay;

    let txRoughness = roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
    let txLod = log2(colorTexDims.x) * txRoughness;

    var transmittedColor = sampleScreenCopy(uOpaqueColorTexture, uBrdfLutSampler, exitPoint, txLod).rgb;

    transmittedColor = decodeToLinear(transmittedColor);

    let attenuationDistance = material.transmissionVolume.z;
    if (thickness > 0.0 && attenuationDistance < 1e9) {
      let attenuationColor = material.attenuationColorIrid.rgb;
      let attCoeff = -log(max(attenuationColor, vec3(1e-6))) / attenuationDistance;
      transmittedColor *= exp(-attCoeff * length(transmissionRay));
    }

    let txIorRatio = (ior - 1.0) / (ior + 1.0);
    let txF0 = txIorRatio * txIorRatio;
    let txNdotV = max(dot(normal, viewDir), 0.0);
    let txFc5 = exp2((-5.55473 * txNdotV - 6.98316) * txNdotV);
    let txF = f90 * (txF0 + (1.0 - txF0) * txFc5);
    let effectiveTx = txFactor * (1.0 - txF);

    emissive += transmittedColor * albedo * effectiveTx;
    albedo *= (1.0 - txFactor);
  }
`}},gl:{vertex:{end:`
  vModelScale = vec3(
    length(modelMatrix[0].xyz),
    length(modelMatrix[1].xyz),
    length(modelMatrix[2].xyz)
  );
`},fragment:{material:`
  {
    float transmissionFactor = material.transmissionVolume.x;
    float thicknessFactor = material.transmissionVolume.y;
    float ior = material.pbrParams.w;

    float txFactor = transmissionFactor * sampleTransmission(vUV).r;
    float thickness = thicknessFactor * sampleThickness(vUV).g;

    vec2 colorTexDims = vec2(textureSize(uOpaqueColorTexture, 0));

    vec3 refractedDir = refract(-viewDir, normal, 1.0 / ior);
    vec3 transmissionRay = normalize(refractedDir) * thickness * vModelScale;
    vec3 exitPoint = vPosition + transmissionRay;

    float txRoughness = roughness * clamp(ior * 2.0 - 2.0, 0.0, 1.0);
    float txLod = log2(colorTexDims.x) * txRoughness;

    vec3 transmittedColor = sampleScreenCopy(uOpaqueColorTexture, exitPoint, txLod).rgb;

    transmittedColor = decodeToLinear(transmittedColor);

    float attenuationDistance = material.transmissionVolume.z;
    if (thickness > 0.0 && attenuationDistance < 1e9) {
      vec3 attenuationColor = material.attenuationColorIrid.rgb;
      vec3 attCoeff = -log(max(attenuationColor, vec3(1e-6))) / attenuationDistance;
      transmittedColor *= exp(-attCoeff * length(transmissionRay));
    }

    float txIorRatio = (ior - 1.0) / (ior + 1.0);
    float txF0 = txIorRatio * txIorRatio;
    float txNdotV = max(dot(normal, viewDir), 0.0);
    float txFc5 = exp2((-5.55473 * txNdotV - 6.98316) * txNdotV);
    float txF = f90 * (txF0 + (1.0 - txF0) * txFc5);
    float effectiveTx = txFactor * (1.0 - txF);

    emissive += transmittedColor * albedo * effectiveTx;
    albedo *= (1.0 - txFactor);
  }
`}}},_f=ie({factor:{kind:"lane",field:"specularParams",lane:3},color:{kind:"colour",field:"specularParams"},texture:{kind:"texture",slot:"specular"}}),yf=ie({factor:{kind:"lane",field:"transmissionVolume",lane:3},ior:{kind:"lane",field:"attenuationColorIrid",lane:3},thicknessMinimum:{kind:"scalar",field:"iridescenceThicknessMinimum"},thicknessMaximum:{kind:"scalar",field:"iridescenceThickness"},texture:{kind:"texture",slot:"iridescence"}}),xf=ie({factor:{kind:"lane",field:"transmissionVolume",lane:0},thickness:{kind:"lane",field:"transmissionVolume",lane:1},attenuationDistance:{kind:"lane",field:"transmissionVolume",lane:2},attenuationColor:{kind:"colour",field:"attenuationColorIrid"},texture:{kind:"texture",slot:"transmission"},thicknessTexture:{kind:"texture",slot:"thickness"}}),bf=ie({factor:{kind:"lane",field:"clearcoatParams",lane:0},roughness:{kind:"lane",field:"clearcoatParams",lane:1},normalScale:{kind:"lane",field:"clearcoatParams",lane:2},texture:{kind:"texture",slot:"clearcoat"},roughnessTexture:{kind:"texture",slot:"clearcoatRoughness"},normalTexture:{kind:"texture",slot:"clearcoatNormal",readonly:!0}}),vf=ie({color:{kind:"colour",field:"sheenParams"},roughness:{kind:"lane",field:"sheenParams",lane:3},texture:{kind:"texture",slot:"sheen"}}),wf=ie({strength:{kind:"lane",field:"anisotropyParams",lane:0},rotation:{kind:"lane",field:"anisotropyParams",lane:1},texture:{kind:"texture",slot:"anisotropy",readonly:!0}});var hc=class extends sr{emissive;specular;iridescence;transmission;clearcoat;sheen;anisotropy;_featureBits=[];constructor(e={}){const{emissive:t,specular:s,iridescence:r,transmission:i,clearcoat:n,sheen:o,anisotropy:a}=e;super({...e,alphaMode:e.alphaMode??"opaque",doubleSided:e.doubleSided??!1}),i&&(this._passBit=this._passBit&-55|$.TRANSMISSION);const c={baseColor:e.baseColorTexture,metallicRoughness:e.metallicRoughnessTexture,occlusion:e.occlusionTexture,normal:e.normalTexture??yr,...e.textures};t&&(c.emissive=t.texture,this._featureBits.push(rf)),s&&(c.specular=s.colorTexture??s.texture,this._featureBits.push(pf)),r&&(c.iridescence=r.texture??r.thicknessTexture,this._featureBits.push(cf)),i&&(c.transmission=i.texture,c.thickness=i.thicknessTexture,this._featureBits.push(gf)),n&&(c.clearcoat=n.texture,c.clearcoatRoughness=n.roughnessTexture,n.normalTexture?(c.clearcoatNormal=n.normalTexture,this._featureBits.push(af)):this._featureBits.push(of)),o&&(c.sheen=o.texture??o.roughnessTexture,this._featureBits.push(ff)),a&&(a.texture?(c.anisotropy=a.texture,this._featureBits.push(oc)):this._featureBits.push(nc)),this._deriveLayoutFromBits([Or,es,...this._featureBits,...this.extraBits],c);const l=this.data;l.pbrParams[0]=e.metallic??0,l.pbrParams[1]=e.roughness??1,l.pbrParams[2]=e.occlusionStrength??1,l.pbrParams[3]=e.ior??1.5,l.normalScale=e.normalScale??1,l.transmissionVolume[2]=1e10;const u=l.attenuationColorIrid;if(At(u,0,vt.shared.setValue(16777215)),u[3]=1.3,t){const h=this.emissive=new nf(this);h.color=t.color??16777215,h.strength=t.strength??1}if(s){const h=this.specular=new _f(this);h.color=s.color??16777215,h.factor=s.factor??1}if(r){const h=this.iridescence=new yf(this);h.factor=r.factor??1,h.ior=r.ior??1.3,h.thicknessMaximum=r.thicknessMaximum??400,h.thicknessMinimum=r.thicknessMinimum??0}if(i){const h=this.transmission=new xf(this);h.factor=i.factor??1,h.thickness=i.thickness??0,h.attenuationDistance=i.attenuationDistance??1e10,h.attenuationColor=i.attenuationColor??16777215}if(n){const h=this.clearcoat=new bf(this);h.factor=n.factor??1,h.roughness=n.roughness??0,h.normalScale=n.normalScale??1}if(o){const h=this.sheen=new vf(this);h.color=o.color??16777215,h.roughness=o.roughness??0}if(a){const h=this.anisotropy=new wf(this);h.strength=a.strength??1,h.rotation=a.rotation??0}}_descriptorByEnvKey=Object.create(null);getPrimaryDescriptor(e){this._variantDirty&&(this._descriptorByEnvKey=Object.create(null),this._variantDirty=!1);const t=e._envBit,s=t.name;let r=this._descriptorByEnvKey[s];if(r)return r;const i=[Or,t],n=[Or,t];return e.environment!==null&&(i.push(Vn),n.push(Vn)),i.push(On),n.push(On),i.push(es),n.push(es),i.push(...this._featureBits),n.push(...this._featureBits),i.push(...this.extraBits),n.push(...this.extraBits),this._alphaMode==="mask"&&(i.push(_i),n.push(_i)),r=new ee({}),r.update({bitsGpu:i,bitsGl:n}),this._descriptorByEnvKey[s]=r,r}_toOptions(){const{emissive:e,specular:t,iridescence:s,transmission:r,clearcoat:i,sheen:n,anisotropy:o,textures:a}=this;return{...super._toOptions(),metallic:this.metallic,roughness:this.roughness,occlusionStrength:this.occlusionStrength,ior:this.ior,normalScale:this.normalScale,normalTexture:a.normal,metallicRoughnessTexture:a.metallicRoughness,occlusionTexture:a.occlusion,emissive:e&&Kt(e),specular:t&&Kt(t),iridescence:s&&Kt(s),transmission:r&&Kt(r),clearcoat:i&&Kt(i),sheen:n&&Kt(n),anisotropy:o&&Kt(o)}}get metallic(){return this.data.pbrParams[0]}set metallic(e){this.data.pbrParams[0]!==Math.fround(e)&&(this.data.pbrParams[0]=e,this.update())}get roughness(){return this.data.pbrParams[1]}set roughness(e){this.data.pbrParams[1]!==Math.fround(e)&&(this.data.pbrParams[1]=e,this.update())}get occlusionStrength(){return this.data.pbrParams[2]}set occlusionStrength(e){this.data.pbrParams[2]!==Math.fround(e)&&(this.data.pbrParams[2]=e,this.update())}get ior(){return this.data.pbrParams[3]}set ior(e){this.data.pbrParams[3]!==Math.fround(e)&&(this.data.pbrParams[3]=e,this.update())}get normalScale(){return this.data.normalScale}set normalScale(e){this.data.normalScale=e}destroy(e){if(this.destroyed)return;super.destroy(e),this._descriptorByEnvKey=null,this._featureBits=null;const t=this;t.emissive=void 0,t.specular=void 0,t.iridescence=void 0,t.transmission=void 0,t.clearcoat=void 0,t.sheen=void 0,t.anisotropy=void 0}};function Sf(e){const t=e.pbrMetallicRoughness,s=e.extensions,r=[t?.baseColorTexture,t?.metallicRoughnessTexture,e.normalTexture,e.occlusionTexture,e.emissiveTexture,s?.KHR_materials_transmission?.transmissionTexture,s?.KHR_materials_volume?.thicknessTexture,s?.KHR_materials_clearcoat?.clearcoatTexture,s?.KHR_materials_clearcoat?.clearcoatRoughnessTexture,s?.KHR_materials_clearcoat?.clearcoatNormalTexture,s?.KHR_materials_sheen?.sheenColorTexture,s?.KHR_materials_sheen?.sheenRoughnessTexture,s?.KHR_materials_specular?.specularTexture,s?.KHR_materials_specular?.specularColorTexture,s?.KHR_materials_iridescence?.iridescenceTexture,s?.KHR_materials_iridescence?.iridescenceThicknessTexture,s?.KHR_materials_anisotropy?.anisotropyTexture];for(const i of r){const n=i?.extensions?.KHR_texture_transform;if(n)return n}}const Ts=new Set;function et(e,t,s){if(!t)return;const r=t.texCoord??0;if(r!==0){const n=`binding:${e}:${r}`;Ts.has(n)||(Ts.add(n),V(`[@pixi/3d] ${e} on material "${s}" uses texCoord=${r}; multi-UV-set support is not yet implemented and the texture will sample from UV0 (may apply to other materials in this asset).`))}const i=t.extensions?.KHR_texture_transform?.texCoord;if(i!==void 0&&i!==r){const n=`transform:${e}:${i}`;Ts.has(n)||(Ts.add(n),V(`[@pixi/3d] KHR_texture_transform on ${e} (material "${s}") overrides texCoord (binding=${r}, transform=${i}); per-binding texCoord overrides are not supported and the binding's texCoord will be used instead.`))}}function Tf(e){const t=e.name??"<unnamed>",s=e.pbrMetallicRoughness;et("baseColorTexture",s?.baseColorTexture,t),et("metallicRoughnessTexture",s?.metallicRoughnessTexture,t),et("normalTexture",e.normalTexture,t),et("occlusionTexture",e.occlusionTexture,t),et("emissiveTexture",e.emissiveTexture,t),et("transmissionTexture",e.extensions?.KHR_materials_transmission?.transmissionTexture,t),et("thicknessTexture",e.extensions?.KHR_materials_volume?.thicknessTexture,t),et("clearcoatTexture",e.extensions?.KHR_materials_clearcoat?.clearcoatTexture,t),et("clearcoatRoughnessTexture",e.extensions?.KHR_materials_clearcoat?.clearcoatRoughnessTexture,t),et("clearcoatNormalTexture",e.extensions?.KHR_materials_clearcoat?.clearcoatNormalTexture,t),et("sheenColorTexture",e.extensions?.KHR_materials_sheen?.sheenColorTexture,t),et("sheenRoughnessTexture",e.extensions?.KHR_materials_sheen?.sheenRoughnessTexture,t),et("specularTexture",e.extensions?.KHR_materials_specular?.specularTexture,t),et("specularColorTexture",e.extensions?.KHR_materials_specular?.specularColorTexture,t),et("anisotropyTexture",e.extensions?.KHR_materials_anisotropy?.anisotropyTexture,t)}function Cf(e){const t=e.name??"<unnamed>";et("baseColorTexture",e.pbrMetallicRoughness?.baseColorTexture,t)}function dc(e){const[t,s]=e.offset??[0,0],[r,i]=e.scale??[1,1],n=e.rotation??0,o=Math.cos(n),a=Math.sin(n);return new fr(r*o,r*a,-i*a,i*o,t,s)}function fc(e){return e.alphaMode==="BLEND"?"blend":e.alphaMode==="MASK"?"mask":"opaque"}function Zt(e){return[te(e[0]),te(e[1]),te(e[2])]}function Df(e,t){Cf(e);const s={alphaMode:fc(e),alphaCutoff:e.alphaCutoff,doubleSided:e.doubleSided??!1,vertexColors:!0},r=e.pbrMetallicRoughness;r?.baseColorFactor!==void 0&&(s.baseColor=Zt(r.baseColorFactor),s.alpha=r.baseColorFactor[3]),r?.baseColorTexture!==void 0&&(s.baseColorTexture=t.textures[r.baseColorTexture.index]);const i=r?.baseColorTexture?.extensions?.KHR_texture_transform;return i&&(s.uvTransform=dc(i)),new tf(s)}function Bf(e,t){Tf(e);const s={alphaMode:fc(e),alphaCutoff:e.alphaCutoff,doubleSided:e.doubleSided??!1,metallic:1,roughness:1,vertexColors:!0};if(e.normalTexture!==void 0&&(s.normalTexture=t.textures[e.normalTexture.index],e.normalTexture.scale!==void 0&&(s.normalScale=e.normalTexture.scale)),e.emissiveFactor||e.emissiveTexture){const h={color:Zt(e.emissiveFactor??[0,0,0]),strength:e.extensions?.KHR_materials_emissive_strength?.emissiveStrength??1};e.emissiveTexture&&(h.texture=t.textures[e.emissiveTexture.index]),s.emissive=h}if(e.occlusionTexture&&(s.occlusionTexture=t.textures[e.occlusionTexture.index],e.occlusionTexture.strength!==void 0&&(s.occlusionStrength=e.occlusionTexture.strength)),e.pbrMetallicRoughness){const h=e.pbrMetallicRoughness;h.baseColorFactor!==void 0&&(s.baseColor=Zt(h.baseColorFactor),s.alpha=h.baseColorFactor[3]),h.metallicFactor!==void 0&&(s.metallic=h.metallicFactor),h.roughnessFactor!==void 0&&(s.roughness=h.roughnessFactor),h.baseColorTexture!==void 0&&(s.baseColorTexture=t.textures[h.baseColorTexture.index]),h.metallicRoughnessTexture!==void 0&&(s.metallicRoughnessTexture=t.textures[h.metallicRoughnessTexture.index])}const r=Sf(e);r&&(s.uvTransform=dc(r));const i=e.extensions?.KHR_materials_transmission;if(i){const h={factor:i.transmissionFactor??0};i.transmissionTexture&&(h.texture=t.textures[i.transmissionTexture.index]);const d=e.extensions?.KHR_materials_volume;d&&(h.thickness=d.thicknessFactor??0,h.attenuationDistance=d.attenuationDistance??1/0,h.attenuationColor=Zt(d.attenuationColor??[1,1,1]),d.thicknessTexture&&(h.thicknessTexture=t.textures[d.thicknessTexture.index])),s.transmission=h,((h.factor??0)>0||h.texture!==void 0)&&s.alphaMode!=="opaque"&&(V(`[@pixi/3d] Material "${e.name??"<unnamed>"}" combines KHR_materials_transmission with alphaMode="${e.alphaMode??"OPAQUE"}"; the glTF spec leaves this undefined. Coercing alphaMode to OPAQUE so the transmission pass handles transparency.`),s.alphaMode="opaque")}const n=e.extensions?.KHR_materials_ior;n&&(s.ior=n.ior??1.5);const o=e.extensions?.KHR_materials_iridescence;if(o){const h={factor:o.iridescenceFactor??0,ior:o.iridescenceIor??1.3,thicknessMinimum:o.iridescenceThicknessMinimum??100,thicknessMaximum:o.iridescenceThicknessMaximum??400},d=o.iridescenceTexture?.index,f=o.iridescenceThicknessTexture?.index;d!==void 0&&(h.texture=t.textures[d]),f!==void 0&&(h.thicknessTexture=t.textures[f]),s.iridescence=h,d!==void 0&&f!==void 0&&d!==f&&V(`[@pixi/3d] KHR_materials_iridescence on material "${e.name??"<unnamed>"}" references two different textures for iridescenceTexture (R=factor) and iridescenceThicknessTexture (G=thickness); PixiJS 3D packs both into one slot (R+G). The factor texture will be used and iridescence thickness will be sampled from its G channel. Repack into a single image with factor in R and thickness in G for the intended look.`)}const a=e.extensions?.KHR_materials_clearcoat;if(a){const h={factor:a.clearcoatFactor??0,roughness:a.clearcoatRoughnessFactor??0};a.clearcoatTexture&&(h.texture=t.textures[a.clearcoatTexture.index]),a.clearcoatRoughnessTexture&&(h.roughnessTexture=t.textures[a.clearcoatRoughnessTexture.index]),a.clearcoatNormalTexture&&(h.normalTexture=t.textures[a.clearcoatNormalTexture.index],a.clearcoatNormalTexture.scale!==void 0&&(h.normalScale=a.clearcoatNormalTexture.scale)),s.clearcoat=h}const c=e.extensions?.KHR_materials_sheen;if(c){const h={color:Zt(c.sheenColorFactor??[0,0,0]),roughness:c.sheenRoughnessFactor??0},d=c.sheenColorTexture?.index,f=c.sheenRoughnessTexture?.index;d!==void 0&&(h.texture=t.textures[d]),f!==void 0&&(h.roughnessTexture=t.textures[f]),s.sheen=h,d!==void 0&&f!==void 0&&d!==f&&V(`[@pixi/3d] KHR_materials_sheen on material "${e.name??"<unnamed>"}" references two different textures for sheenColor and sheenRoughness; PixiJS 3D packs both into one slot (RGB+A). The colour texture will be used and sheen roughness will be sampled from its alpha channel (usually 1.0 on an sRGB colour texture, effectively giving factor-only roughness). Repack into a single RGBA image with roughness in alpha for the intended look.`)}const l=e.extensions?.KHR_materials_specular;if(l){const h={factor:l.specularFactor??1,color:Zt(l.specularColorFactor??[1,1,1])},d=l.specularColorTexture?.index,f=l.specularTexture?.index;d!==void 0&&(h.colorTexture=t.textures[d]),f!==void 0&&(h.texture=t.textures[f]),s.specular=h,d!==void 0&&f!==void 0&&d!==f&&V(`[@pixi/3d] KHR_materials_specular on material "${e.name??"<unnamed>"}" references two different textures for specularColor (RGB) and specular (A); PixiJS 3D packs both into one slot (RGB+A). The colour texture will be used and specular factor will be sampled from its alpha channel (usually 1.0 on an sRGB colour texture, effectively giving factor-only strength). Repack into a single RGBA image with factor in alpha for the intended look.`)}const u=e.extensions?.KHR_materials_anisotropy;if(u){const h={strength:u.anisotropyStrength??0,rotation:u.anisotropyRotation??0},d=u.anisotropyTexture?.index;d!==void 0&&(h.texture=t.textures[d]),s.anisotropy=h}return new hc(s)}function If(e,t){return e.extensions?.KHR_materials_unlit?Df(e,t):Bf(e,t)}function Mf(e,t){const s=e.materials??[];s.forEach((r,i)=>{const n=If(r,t);n.label=r.name,t.materials[i]=n,r.name&&(t.material[r.name]=n)}),e.meshes?.some(r=>r.primitives.some(i=>i.material===void 0))&&(t.materials[s.length]=new hc({metallic:1,roughness:1}))}const Pf={directional:0,point:1,spot:2};function Af(e,t){e.extensions?.KHR_lights_punctual?.lights&&(t.lights=e.extensions.KHR_lights_punctual.lights.map(s=>{const r=s.spot?.outerConeAngle??Math.PI/4,i=s.spot?.innerConeAngle??0;return{name:s.name,color:Zt(s.color??[1,1,1]),intensity:s.intensity,type:Pf[s.type],range:s.range??0,coneAngle:r*Ze,penumbra:r>0?Math.max(0,Math.min(1,1-i/r)):0}}))}const ir=5126,Ff={0:"point-list",1:"line-list",2:"line-strip",3:"line-strip",4:"triangle-list",5:"triangle-strip",6:"triangle-list"};async function zf(e,t,s){const r={},i=s.extensions?.KHR_draco_mesh_compression;if(i)Object.assign(r,await Nd(e,t,s,i));else{if(s.indices!==void 0){const a=De(e,t,s.indices);r.indices=a instanceof Uint8Array?new Uint16Array(a):a}for(const a in s.attributes){const c=Ka[a];if(c){const l=s.attributes[a],u=De(e,t,l),h=e.accessors?.[l];if((c==="colors"||c==="colors1")&&h){r[c]=Ya(u,h.type==="VEC3"?3:4);continue}r[c]=u}else pt(`pixijs-3d-custom-attribute-${a}`,`[@pixi/3d] custom attribute ${a} skipped`)}if(s.targets){const a=kf(e,t,s.targets);a&&(r.morphTargets=a)}}const n=s.attributes.TEXCOORD_0;n!==void 0&&e.accessors&&(r.uvs=Nn(r.uvs,e.accessors[n]));const o=s.attributes.POSITION;if(o!==void 0&&e.accessors){const a=e.accessors[o];r.positions=Nn(r.positions,a);const{min:c,max:l}=a;if(c&&l){const u=a.normalized?rc[a.componentType]:1;r.bounds3D=new Q(new F(c[0]*u,c[1]*u,c[2]*u),new F(l[0]*u,l[1]*u,l[2]*u))}else if(a.componentType!==ir)throw new Error(`[@pixi/3d] POSITION accessor ${o} stores integers but has no min and max, which glTF requires and the bounds come from.`)}return r.topology=Ff[s.mode??4],new Y(r)}function Nn(e,t){return t.componentType===ir||!ArrayBuffer.isView(e)?e:{buffer:new Se({data:t.type==="VEC3"?ka(e):e,usage:G.VERTEX|G.COPY_DST}),format:qd(t)}}function kf(e,t,s){const r=[];let i=0;for(let n=0;n<s.length;n++){const o=s[n].POSITION;if(o===void 0){V(`[@pixi/3d] morph target ${n} has no POSITION deltas; rendering base pose.`);return}const a=e.accessors?.[o];if(a&&a.componentType!==ir){V(`[@pixi/3d] morph target ${n} uses non-float POSITION deltas, which are not supported; rendering base pose.`);return}const c={positions:De(e,t,o,!0)},l=s[n].NORMAL;if(l!==void 0){const u=e.accessors?.[l];u&&u.componentType!==ir?V(`[@pixi/3d] morph target ${n} has non-float NORMAL deltas; morphing positions only.`):(c.normals=De(e,t,l,!0),i++)}r.push(c)}if(i>0&&i<r.length){V("[@pixi/3d] morph targets mix NORMAL deltas; morphing positions only.");for(const n of r)n.normals=void 0}return r.length>0?r:void 0}async function Rf(e,t,s){e.meshes&&await Promise.all(e.meshes.map(async(r,i)=>{const n=await Promise.all(r.primitives.map(a=>zf(e,t,a))),o=n[0]?.morphTargetCount??0;for(let a=1;a<n.length;a++)n[a].morphTargetCount!==o&&V(`[@pixi/3d] mesh ${i} primitive ${a} has ${n[a].morphTargetCount} morph targets, expected ${o} (all primitives of a mesh must match).`);s.geometries[i]=n,r.name&&n.length>0&&(s.geometry[r.name]=n[0])}))}function Lf(e,t){e.nodes&&(t.nodes=e.nodes.map((s,r)=>{const i=s.children??[],n={label:s.name||`node_${r}`,children:i};if(s.matrix&&s.matrix.length===16?(n.position=new Float32Array(3),n.rotation=new Float32Array(4),n.scale=new Float32Array(3),Ef(s.matrix,n.position,n.rotation,n.scale)):(s.translation&&(n.position=new Float32Array(s.translation)),s.scale&&(n.scale=new Float32Array(s.scale)),s.rotation&&(n.rotation=new Float32Array(s.rotation))),s.camera!==void 0&&(n.camera=s.camera),s.mesh!==void 0){n.geometry=s.mesh;const o=e.meshes?.[s.mesh];if(o){const a=e.materials?.length??0;n.materials=o.primitives.map(l=>l.material??a);const c=s.weights??o.weights;c&&(n.weights=c)}}return s.extensions&&(s.extensions.KHR_lights_punctual&&(n.light=s.extensions.KHR_lights_punctual.light),s.extensions.KHR_node_visibility?.visible===!1&&(n.visible=!1)),s.skin!==void 0&&(n.skin=s.skin),n}))}function Ef(e,t,s,r){const i=e;let n=Math.sqrt(i[0]*i[0]+i[1]*i[1]+i[2]*i[2]);const o=Math.sqrt(i[4]*i[4]+i[5]*i[5]+i[6]*i[6]),a=Math.sqrt(i[8]*i[8]+i[9]*i[9]+i[10]*i[10]);i[0]*(i[5]*i[10]-i[9]*i[6])-i[4]*(i[1]*i[10]-i[9]*i[2])+i[8]*(i[1]*i[6]-i[5]*i[2])<0&&(n=-n),t[0]=i[12],t[1]=i[13],t[2]=i[14];const c=1/n,l=1/o,u=1/a,h=i[0]*c,d=i[1]*c,f=i[2]*c,p=i[4]*l,m=i[5]*l,_=i[6]*l,g=i[8]*u,b=i[9]*u,y=i[10]*u,v=h+m+y;if(v>0){const x=.5/Math.sqrt(v+1);s[3]=.25/x,s[0]=(_-b)*x,s[1]=(g-f)*x,s[2]=(d-p)*x}else if(h>m&&h>y){const x=2*Math.sqrt(1+h-m-y);s[3]=(_-b)/x,s[0]=.25*x,s[1]=(p+d)/x,s[2]=(g+f)/x}else if(m>y){const x=2*Math.sqrt(1+m-h-y);s[3]=(g-f)/x,s[0]=(p+d)/x,s[1]=.25*x,s[2]=(b+_)/x}else{const x=2*Math.sqrt(1+y-h-m);s[3]=(d-p)/x,s[0]=(g+f)/x,s[1]=(b+_)/x,s[2]=.25*x}r[0]=n,r[1]=o,r[2]=a}function Vf(e,t){e.scenes&&(t.scenes=e.scenes.map(s=>({children:s.nodes,name:s.name})),e.scene!==void 0&&e.scene<t.scenes.length&&(t.defaultScene=e.scene))}const Rt=new E,Gf=new E,Of=new E,Oe=new F,Ne=new mt,Nr=new F,Nf=new F(1,1,1),$f=1e-6;function Uf(e,t,s){if(!e.skins){s.skins=[];return}const r=jf(e.nodes),i=new Map,n=[],o=[],a=e.skins.map(u=>({skinRaw:u,parentNode:qf(u.joints,r),nodes:[]})),c=u=>{if(u.nodes=Kf(u.skinRaw.joints,u.parentNode,r),!!s.nodes)for(const h of u.nodes){if(pc(e.nodes,h,i))continue;const d=s.nodes[h];d&&(d.isJoint=!0)}};a.forEach(c);let l=!0;for(;l;){l=!1;for(const u of a){const h=Wf(u.parentNode,r,e.nodes,s.nodes);h!==u.parentNode&&(u.parentNode=h,c(u),l=!0)}}for(const{skinRaw:u,parentNode:h,nodes:d}of a){const f=De(e,t,u.inverseBindMatrices),p=u.joints,m=new Map;d.forEach((w,T)=>m.set(w,T));const _=d.length,g=new Int16Array(_),b=new Int32Array(_);for(let w=0;w<_;w++){const T=d[w],B=r[T];b[w]=T;const S=m.get(B);g[w]=S!==void 0?S:-1}const y=new Int16Array(p.length);for(let w=0;w<p.length;w++)y[w]=m.get(p[w]);const v=d.map(w=>e.nodes?.[w]?.name||`node_${w}`),x=n.findIndex(w=>$n(w.skeletonNodes,b)&&$n(w.inverseBindMatrices,f));if(x!==-1){o.push(x);continue}o.push(n.length),n.push({name:u.name,inverseBindMatrices:f,skeletonParent:g,skeletonNodes:b,skeletonJoints:y,skeletonLabels:v,parentNode:h,bindShapeMatrix:Hf(p[0],h,r,s.nodes,f)})}if(s.skins=n,s.nodes)for(const u of s.nodes)u.skin!==void 0&&(u.skin=o[u.skin])}function Hf(e,t,s,r,i){if(e===void 0||!r)return;Rt.identity();for(let c=e;c!==-1&&c!==t;c=s[c]){const l=r[c];l&&(l.position?Oe.fromArray(l.position):Oe.set(0,0,0),l.rotation?Ne.fromArray(l.rotation):Ne.set(0,0,0,1),Rt.premultiply(Gf.compose(Oe,Ne,l.scale?Nr.fromArray(l.scale):Nf)))}Rt.multiply(Of.fromArray(i));const n=Rt.elements;let o=!0;for(let c=0;c<16&&o;c++)o=Math.abs(n[c]-(c%5===0?1:0))<$f;if(o)return;const a=Rt.determinant();if(!(a===0||!Number.isFinite(a)))return Rt.decompose(Oe,Ne,Nr),Rt.compose(Oe,Ne,Nr),new Float32Array(Rt.elements)}function $n(e,t){if(e===t)return!0;if(e.length!==t.length)return!1;for(let s=0;s<e.length;s++)if(e[s]!==t[s])return!1;return!0}function jf(e){const t=new Int32Array(e?.length||0).fill(-1);return e?.forEach((s,r)=>{s.children?.forEach(i=>{t[i]=r})}),t}function pc(e,t,s){const r=s.get(t);if(r!==void 0)return r;s.set(t,!1);const i=e?.[t];let n=i?.mesh!==void 0;if(!n&&i?.children){for(const o of i.children)if(pc(e,o,s)){n=!0;break}}return s.set(t,n),n}function qf(e,t){const s=new Set(e);let r;for(const i of e){const n=t[i];if(s.has(n))continue;const o=[];for(let a=n;a!==-1;a=t[a])o.push(a);if(r=r?r.filter(a=>o.includes(a)):o,!r.length)return-1}return r?.[0]??-1}function Wf(e,t,s,r){let i=e;for(let n=e;n!==-1;n=t[n]){const o=s?.[n];(o?.mesh!==void 0&&o.skin!==void 0||r?.[n]?.isJoint)&&(i=t[n])}return i}function Kf(e,t,s){const r=new Set;for(const o of e){let a=o;for(;a!==-1&&a!==t&&!r.has(a);)r.add(a),a=s[a]}const i=new Map,n=o=>{if(i.has(o))return i.get(o);let a=0,c=o;for(;c!==-1;)a++,c=s[c];return i.set(o,a),a};return Array.from(r).sort((o,a)=>n(o)-n(a))}const Yf={wrapS:10497,wrapT:10497,magFilter:9729,minFilter:9987};function Xf(e,t,s){e.textures&&e.textures.forEach((r,i)=>{const n=t[r.source],o={...Yf,...e.samplers?.[r.sampler]},a=n.source.style;a.addressModeU=Un(o.wrapS),a.addressModeV=Un(o.wrapT),a.magFilter=Zf(o.magFilter),a.minFilter=Qf(o.minFilter),n.source.autoGenerateMipmaps=!(n.source instanceof ua)&&Jf(o.minFilter),s.textures[i]=n,r.name&&(s.texture[r.name]=n)})}function Un(e){switch(e){case 33071:return"clamp-to-edge";case 33648:return"mirror-repeat";case 10497:return"repeat";default:return"repeat"}}function Zf(e){return e===9728?"nearest":"linear"}function Qf(e){return e===9728||e===9984||e===9986?"nearest":"linear"}function Jf(e){return e!==9728&&e!==9729}async function mc(e,t=[],s=[]){const r={};Lf(e,r),Vf(e,r),Af(e,r),Jd(e,r);const i=new Za(r);return Zd(e,t,i),Uf(e,t,r),Xf(e,s,i),await Rf(e,t,i),Mf(e,i),i}const tp=1313821514,ep=5130562,sp=1179937895,rp=12;function ip(e){const t=new DataView(e),s=t.getUint32(0,!0),r=t.getUint32(4,!0),i=t.getUint32(8,!0);if(s!==sp)throw new Error(`Invalid GLB magic: ${s.toString(16)}`);if(r<2)throw new Error(`Unsupported GLB version: ${r}`);let n;const o=[];let a=rp;for(;a<i;){const c=t.getUint32(a,!0),l=t.getUint32(a+4,!0);if(a+=8,l===tp){const u=new TextDecoder().decode(new Uint8Array(e,a,c));n=JSON.parse(u)}else if(l===ep){const u=e.slice(a,a+c);o.push(u)}a+=c}if(!n)throw new Error("GLB file contains no JSON chunk");return{json:n,buffers:o}}let gc;Fe.register({clear:()=>{gc=void 0}});async function _c(e,t,s,r){const i=e.images??[],n=[],o=[],a=Array.from(await op(e,r),async([l,u])=>{const h=i[l];if(h.uri){const d=h.uri.startsWith("data:")?h.uri:t+h.uri;n.push(d),o[l]=await r.load({src:d,parser:u})}else if(h.bufferView!==void 0){const d=await ap(h.bufferView,h.mimeType,e,await s);n.push(d);try{o[l]=await r.load({src:d,parser:u})}finally{URL.revokeObjectURL(d)}}}),c=(await Promise.allSettled([...a,s])).find(l=>l.status==="rejected");if(c)throw await r.unload(n),c.reason;return{textures:o,urls:n}}const np=[{name:"KHR_texture_basisu",parser:"ktx2"},{name:"EXT_texture_avif",parser:"texture"},{name:"EXT_texture_webp",parser:"texture"}];async function op(e,t){const s=new Map,r=e.textures??[],i={KHR_texture_basisu:t.parsers.some(n=>n.id==="ktx2"),EXT_texture_avif:r.some(n=>n.extensions?.EXT_texture_avif)&&await(gc??=hh.test()),EXT_texture_webp:!0};return r.forEach((n,o)=>{const a=n.extensions??{},c=np.find(({name:l})=>i[l]&&a[l]);if(c)n.source=a[c.name].source,s.set(n.source,c.parser);else if(n.source!==void 0)s.set(n.source,"texture");else throw a.KHR_texture_basisu?new Error(`[@pixi/3d] glTF texture ${o} has only a KHR_texture_basisu (KTX2) image, which needs pixi's KTX2 loader: import 'pixi.js/ktx2' before loading the model`):a.EXT_texture_avif?new Error(`[@pixi/3d] glTF texture ${o} has only an EXT_texture_avif image, and this browser can't decode AVIF`):new Error(`[@pixi/3d] glTF texture ${o} has no PNG, JPEG, WebP, AVIF or KTX2 image`)}),s}async function ap(e,t,s,r){const i=s.bufferViews[e],n=r[i.buffer],o=new Blob([new Uint8Array(n,i.byteOffset||0,i.byteLength)],{type:t||"image/png"});return URL.createObjectURL(o)}const cp={extension:{type:nt.LoadParser,name:"loadGlb"},name:"loadGlb",id:"glb",test(e){return ha(e,"model/gltf-binary")||pr(e,".glb")},async load(e,t,s){const r=await(await fetch(e)).arrayBuffer(),i=e.substring(0,e.lastIndexOf("/")+1),{json:n,buffers:o}=ip(r);lp(n.buffers??[],o),await Xa(n,o);const a=await _c(n,i,o,s),c=await mc(n,o,a.textures);return c._imageUrls.push(...a.urls),c},async unload(e,t,s){for(const r of e.materials)r.destroy();await s.unload(e._imageUrls),e.destroy()}};function lp(e,t){for(let s=t.length;s<e.length;s++)e[s].extensions?.EXT_meshopt_compression?.fallback===!0||e[s].extensions?.KHR_meshopt_compression?.fallback===!0||V(`[@pixi/3d] GLB buffer ${s} ("${e[s].uri??"no uri"}") lives outside the container; external GLB buffers are not loaded, so anything reading it will come back empty.`),t.push(new ArrayBuffer(0))}const up={extension:{type:nt.LoadParser,name:"loadGltf"},name:"loadGltf",id:"gltf",test(e){return ha(e,"model/gltf+json")||pr(e,".gltf")},async load(e,t,s){const r=await(await fetch(e)).json(),i=e.substring(0,e.lastIndexOf("/")+1),n=(r.buffers||[]).map(async l=>{if(l.uri){if(l.uri.startsWith("data:"))return await(await fetch(l.uri)).arrayBuffer();const u=i+l.uri;return await(await fetch(u)).arrayBuffer()}if(l.extensions?.EXT_meshopt_compression?.fallback===!0||l.extensions?.KHR_meshopt_compression?.fallback===!0)return new ArrayBuffer(0);throw new Error("GLTF buffer has no URI")}),o=Promise.all(n).then(async l=>(await Xa(r,l),l)),a=await _c(r,i,o,s),c=await mc(r,await o,a.textures);return c._imageUrls.push(...a.urls),c},async unload(e,t,s){for(const r of e.materials)r.destroy();await s.unload(e._imageUrls),e.destroy()}};let nr;Fe.register({clear:()=>{nr?.destroy(!0),nr=void 0}});function ds(){return nr??=new cs({attributes:{aPosition:new Float32Array([-1,-1,3,-1,-1,3])}}),nr}const hp={name:"decodeToLinearSrgb",gpu:{header:"fn decodeToLinear(c: vec3<f32>) -> vec3<f32> { return pow(c, vec3<f32>(2.2)); }"},gl:{header:"vec3 decodeToLinear(vec3 c) { return pow(c, vec3(2.2)); }"}},dp={name:"decodeToLinearNone",gpu:{header:"fn decodeToLinear(c: vec3<f32>) -> vec3<f32> { return c; }"},gl:{header:"vec3 decodeToLinear(vec3 c) { return c; }"}};function vr(e){return e?hp:dp}function or(e){return e.includes("float")||e.endsWith("-srgb")}const yc={name:"iblSamplingFuncs",requires:[Ht],gpu:{header:`
fn radicalInverseVdC(bits_in: u32) -> f32 {
  var bits = bits_in;
  bits = (bits << 16u) | (bits >> 16u);
  bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
  bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
  bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
  bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
  return f32(bits) * 2.3283064365386963e-10;
}

fn hammersley(i: u32, N: u32) -> vec2<f32> {
  return vec2<f32>(f32(i) / f32(N), radicalInverseVdC(i));
}

fn importanceSampleGGX(Xi: vec2<f32>, N: vec3<f32>, roughness: f32) -> vec3<f32> {
  let a = roughness * roughness;

  let phi = 2.0 * PI * Xi.x;
  let cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a * a - 1.0) * Xi.y));
  let sinTheta = sqrt(1.0 - cosTheta * cosTheta);

  let H = vec3<f32>(
    cos(phi) * sinTheta,
    sin(phi) * sinTheta,
    cosTheta
  );

  var up: vec3<f32>;
  if abs(N.z) < 0.999 {
    up = vec3<f32>(0.0, 0.0, 1.0);
  } else {
    up = vec3<f32>(1.0, 0.0, 0.0);
  }

  let tangent = normalize(cross(up, N));
  let bitangent = cross(N, tangent);

  let sampleVec = tangent * H.x + bitangent * H.y + N * H.z;
  return normalize(sampleVec);
}
`},gl:{header:`
float radicalInverseVdC(uint bits) {
    bits = (bits << 16u) | (bits >> 16u);
    bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
    bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
    bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
    bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
    return float(bits) * 2.3283064365386963e-10;
}

vec2 hammersley(uint i, uint N) {
    return vec2(float(i) / float(N), radicalInverseVdC(i));
}

vec3 importanceSampleGGX(vec2 Xi, vec3 N, float roughness) {
    float a = roughness * roughness;

    float phi = 2.0 * PI * Xi.x;
    float cosTheta = sqrt((1.0 - Xi.y) / (1.0 + (a * a - 1.0) * Xi.y));
    float sinTheta = sqrt(1.0 - cosTheta * cosTheta);

    vec3 H = vec3(
        cos(phi) * sinTheta,
        sin(phi) * sinTheta,
        cosTheta
    );

    vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 tangent = normalize(cross(up, N));
    vec3 bitangent = cross(N, tangent);

    vec3 sampleVec = tangent * H.x + bitangent * H.y + N * H.z;
    return normalize(sampleVec);
}
`}};function xc(e,t){if(!(e.type!==_t.WEBGL||e.context.extensions.colorBufferFloat))throw new Error(`${t}: this WebGL 2 device has no EXT_color_buffer_float, so it cannot draw into a float texture.`)}function fp(e){return e.type!==_t.WEBGPU||e.gpu.device.features.has("rg11b10ufloat-renderable")?"rg11b10ufloat":"rgba16float"}const We=64512;function pp(e){return e.autoGenerateMipmaps?Math.floor(Math.log2(Math.max(e.pixelWidth,e.pixelHeight)))+1:e.mipLevelCount}function bc(e){const{renderer:t,sourceTexture:s}=e,r=e.size??Math.min(256,Math.max(128,s.source.pixelWidth)),i=e.sampleCount??1024,n=e.label??"ibl-specular";xc(t,"View3D environment, for the cube a cubemap environment is prefiltered into");const o=fp(t),a=e.mipLevelCount??5,c={bindGroups:["local"],gpu:`
     {{header}}

     fn getDirection(face: i32, pos: vec2<f32>) -> vec3<f32> {
        let u = pos.x;
        let v = -pos.y;
        
        var dir = vec3<f32>(0.0);
        
        switch face {
            case 0: { dir = vec3<f32>(1.0, -v, -u); }
            case 1: { dir = vec3<f32>(-1.0, -v, u); }
            case 2: { dir = vec3<f32>(u, 1.0, v); }
            case 3: { dir = vec3<f32>(u, -1.0, -v); }
            case 4: { dir = vec3<f32>(u, -v, 1.0); }
            default: { dir = vec3<f32>(-u, -v, -1.0); }
        }

        return dir;
     }

     fn sourceLod(NdotH: f32, roughness: f32, solidAnglePerTexel: f32) -> f32 {
        let a2 = roughness * roughness * roughness * roughness;
        let d = NdotH * NdotH * (a2 - 1.0) + 1.0;
        let pdf = a2 / (PI * d * d) * 0.25;
        let solidAnglePerSample = 1.0 / (local.sampleCount * pdf + 1e-4);
        return clamp(0.5 * log2(solidAnglePerSample / solidAnglePerTexel) + 1.0, 0.0, local.sourceMaxMip);
     }

     @vertex
     fn mainVertex(input: VertexInput) -> VertexOutput {
       var output: VertexOutput;
       output.position = vec4<f32>(input.aPosition, 0.0, 1.0);
       output.vDir = getDirection(i32(local.layer + 0.5), input.aPosition);
       return output;
     }

     @fragment
     fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
        let N = normalize(input.vDir);
        let R = N;
        let V = R;
        
        let maxMipLevel = f32(local.mipLevelCount) - 1.0;
        let roughness = local.mipLevel / maxMipLevel;
        
        if roughness < 0.01 {
            let s = textureSampleLevel(uSourceTexture, uSampler, N, 0.0).rgb;
            return vec4<f32>(min(decodeToLinear(s), vec3<f32>(${We}.0)), 1.0);
        }
        
        var prefilteredColor = vec3<f32>(0.0);
        var totalWeight = 0.0;
        
        let sampleCount = u32(local.sampleCount);
        let solidAnglePerTexel = 4.0 * PI / (6.0 * local.sourceSize * local.sourceSize);
        
        for (var i = 0u; i < sampleCount; i++) {
            let Xi = hammersley(i, sampleCount);
            let H = importanceSampleGGX(Xi, N, roughness);
            let L = normalize(2.0 * dot(V, H) * H - V);
            
            let NdotL = max(dot(N, L), 0.0);
            let lod = sourceLod(dot(N, H), roughness, solidAnglePerTexel);
            let sampleColor = decodeToLinear(textureSampleLevel(uSourceTexture, uSampler, L, lod).rgb);
            
            let weight = NdotL * step(0.0001, NdotL);
            prefilteredColor += sampleColor * weight;
            totalWeight += weight;
        }
        
        prefilteredColor = prefilteredColor / max(totalWeight, 1e-4);
        
        return vec4<f32>(min(prefilteredColor, vec3<f32>(${We}.0)), 1.0);
     }
  `,gl:{vertex:`#version 300 es
        {{header}}

        vec3 getDirection(int face, vec2 pos) {
            float u = pos.x;
            float v = pos.y;
            
            vec3 dir = vec3(0.0);
            
            switch(face) {
                case 0: dir = vec3(1.0, -v, -u); break;
                case 1: dir = vec3(-1.0, -v, u); break;
                case 2: dir = vec3(u, 1.0, v); break;
                case 3: dir = vec3(u, -1.0, -v); break;
                case 4: dir = vec3(u, -v, 1.0); break;
                default: dir = vec3(-u, -v, -1.0); break;
            }

            return dir;
        }

        void main() {
            gl_Position = vec4(aPosition, 0.0, 1.0);
            vDir = getDirection(int(layer + 0.5), aPosition);
        }
      `,fragment:`#version 300 es
        {{header}}

        out vec4 fragColor;

        float sourceLod(float NdotH, float roughness, float solidAnglePerTexel) {
            float a2 = roughness * roughness * roughness * roughness;
            float d = NdotH * NdotH * (a2 - 1.0) + 1.0;
            float pdf = a2 / (PI * d * d) * 0.25;
            float solidAnglePerSample = 1.0 / (sampleCount * pdf + 1e-4);
            return clamp(0.5 * log2(solidAnglePerSample / solidAnglePerTexel) + 1.0, 0.0, sourceMaxMip);
        }

        void main() {
            vec3 N = normalize(vDir);
            vec3 R = N;
            vec3 V = R;
            
            float maxMipLevel = mipLevelCount - 1.0;
            float roughness = mipLevel / maxMipLevel;
            
            if (roughness < 0.01) {
                vec3 s = textureLod(uSourceTexture, N, 0.0).rgb;
                fragColor = vec4(min(decodeToLinear(s), vec3(${We}.0)), 1.0);
                return;
            }
            
            vec3 prefilteredColor = vec3(0.0);
            float totalWeight = 0.0;
            
            uint sampleCountUint = uint(sampleCount);
            float solidAnglePerTexel = 4.0 * PI / (6.0 * sourceSize * sourceSize);
            
            for (uint i = 0u; i < sampleCountUint; i++) {
                vec2 Xi = hammersley(i, sampleCountUint);
                vec3 H = importanceSampleGGX(Xi, N, roughness);
                vec3 L = normalize(2.0 * dot(V, H) * H - V);
                
                float NdotL = max(dot(N, L), 0.0);
                float lod = sourceLod(dot(N, H), roughness, solidAnglePerTexel);
                vec3 sampleColor = decodeToLinear(textureLod(uSourceTexture, L, lod).rgb);
                
                float weight = NdotL * step(0.0001, NdotL);
                prefilteredColor += sampleColor * weight;
                totalWeight += weight;
            }
            
            prefilteredColor = prefilteredColor / max(totalWeight, 1e-4);
            fragColor = vec4(min(prefilteredColor, vec3(${We}.0)), 1.0);
        }
      `}},l={name:"iblPrefilter",requires:[yc,vr(!or(s.source.format))],attributes:{aPosition:"float32x2"},interStage:{vDir:"vec3<f32>"},bindings:{local:{uSourceTexture:"texture_cube<f32>",uSampler:"sampler",layer:"f32",mipLevel:"f32",mipLevelCount:"f32",sampleCount:"f32",sourceSize:"f32",sourceMaxMip:"f32"}}},u=new dr({label:n,width:r,height:r,viewDimension:"cube",arrayLayerCount:6,mipLevelCount:a,format:o}),h=new jt({layer:{value:0,type:"f32"},mipLevel:{value:0,type:"f32"},mipLevelCount:{value:a,type:"f32"},sampleCount:{value:i,type:"f32"},sourceSize:{value:s.source.pixelWidth,type:"f32"},sourceMaxMip:{value:pp(s.source)-1,type:"f32"}}),d=new gt({local:h,uSourceTexture:s.source,uSampler:s.source.style}),f=t.material3d.compileIsolatedShader([l],c,{0:d}),p=ds(),m=new Pi({colorTextures:[u]}),_=f.resources.local,g=t.renderTarget.renderTarget?t.renderTarget.getBindState():null;for(let b=0;b<6;b++)for(let y=0;y<a;y++){_.uniforms.layer=b,_.uniforms.mipLevel=y;const v="uniformBatch"in t.renderPipes?t.renderPipes.uniformBatch.getUboResource(_):_;d.setResource(v,"local"),t.renderTarget.bind({target:m,clear:!0,mipLevel:y,layer:b}),t.encoder.draw({geometry:p,shader:f,state:zt.default2d})}return g&&t.renderTarget.bind(g),d.destroy(),f.destroy(),m.destroy(),new bt({source:u})}const vc=new Float32Array(1),mp=new Uint32Array(vc.buffer);function $r(e,t){if(!(e>0))return 0;vc[0]=Math.min(e,We);const s=mp[0],r=(s>>>23&255)-112;if(r<=0)return 0;const i=23-t;return(r<<t|s>>>i&(1<<t)-1)+(s>>>i-1&1)}function gp(e,t,s,r){switch(e){case 0:r[0]=1,r[1]=-s,r[2]=-t;break;case 1:r[0]=-1,r[1]=-s,r[2]=t;break;case 2:r[0]=t,r[1]=1,r[2]=s;break;case 3:r[0]=t,r[1]=-1,r[2]=-s;break;case 4:r[0]=t,r[1]=-s,r[2]=1;break;default:r[0]=-t,r[1]=-s,r[2]=-1}}function _p(e,t){const s=t>>1;for(let r=0;r<s;r++)for(let i=0;i<s;i++){const n=(r*2*t+i*2)*3,o=n+t*3,a=(r*s+i)*3;for(let c=0;c<3;c++)e[a+c]=.25*(e[n+c]+e[n+3+c]+e[o+c]+e[o+3+c])}}function Hn(e,t){const s=new Uint32Array(t);for(let r=0;r<t;r++)s[r]=($r(e[r*3],6)|$r(e[r*3+1],6)<<11|$r(e[r*3+2],5)<<22)>>>0;return s}function yp(e,t,s){const{width:r,height:i,data:n}=e,o=new Float64Array(3),a=new Float32Array(t*t*3),c=[];for(let m=0;m<6;m++){for(let g=0;g<t;g++){const b=(g+.5)/t*2-1;for(let y=0;y<t;y++){const v=(y+.5)/t*2-1;gp(m,v,b,o);const x=Math.sqrt(o[0]*o[0]+o[1]*o[1]+o[2]*o[2]),w=(Math.atan2(o[2],o[0])/(2*Math.PI)+.5)*r-.5,T=(.5-Math.asin(o[1]/x)/Math.PI)*i-.5,B=Math.floor(w),S=Math.max(0,Math.floor(T)),C=w-B,D=Math.min(1,Math.max(0,T-S)),I=(B%r+r)%r,M=(I+1)%r,P=Math.min(S,i-1)*r,A=Math.min(S+1,i-1)*r,z=(g*t+y)*3;for(let k=0;k<3;k++){const O=n[(P+I)*3+k]*(1-C)+n[(P+M)*3+k]*C,U=n[(A+I)*3+k]*(1-C)+n[(A+M)*3+k]*C;a[z+k]=O*(1-D)+U*D}}}const _=[Hn(a,t*t)];for(let g=t;g>1;g>>=1)_p(a,g),_.push(Hn(a,(g>>1)**2));c.push(new ua({resource:_,format:"rg11b10ufloat",width:t,height:t,label:s}))}const[l,u,h,d,f,p]=c;return bt.from({faces:{right:l,left:u,top:h,bottom:d,front:f,back:p},label:s,mipLevelCount:l.mipLevelCount})}const xp=new TextDecoder("latin1");function bp(e){const t=new Uint8Array(e);let s=0;const r=()=>{const h=s;for(;s<t.length&&t[s]!==10;)s++;const d=xp.decode(t.subarray(h,s));return s++,d};for(let h=r();h!=="";h=r())if(h.startsWith("FORMAT=")&&h!=="FORMAT=32-bit_rle_rgbe")throw new Error(`parseRadianceHdr: unsupported pixel format "${h.slice(7)}"; only 32-bit_rle_rgbe is read.`);const i=/^-Y (\d+) \+X (\d+)$/.exec(r().trim());if(!i)throw new Error('parseRadianceHdr: only the standard "-Y <height> +X <width>" orientation is read.');const n=Number(i[1]),o=Number(i[2]),a=new Float32Array(o*n*3),c=new Uint8Array(o*4),l=o>=8&&o<32768,u=new Float64Array(256);for(let h=1;h<256;h++)u[h]=2**(h-136);for(let h=0;h<n;h++){if(l&&t[s]===2&&t[s+1]===2&&(t[s+2]<<8|t[s+3])===o){s+=4;for(let f=0;f<4;f++){let p=0;for(;p<o;){if(s>=t.length)throw new Error("parseRadianceHdr: the file ends inside a scanline.");let m=t[s++];if(m>128){m-=128;const _=t[s++];for(let g=0;g<m;g++)c[p++*4+f]=_}else for(let _=0;_<m;_++)c[p++*4+f]=t[s++]}}}else{if(s+o*4>t.length)throw new Error("parseRadianceHdr: the file ends inside a scanline.");c.set(t.subarray(s,s+o*4)),s+=o*4}let d=h*o*3;for(let f=0;f<o;f++){const p=u[c[f*4+3]];a[d]=(c[f*4]+.5)*p,a[d+1]=(c[f*4+1]+.5)*p,a[d+2]=(c[f*4+2]+.5)*p,d+=3}}return{width:o,height:n,data:a}}function vp(e){return Math.min(512,Math.max(16,2**Math.floor(Math.log2(e/4))))}const wp={extension:{type:nt.LoadParser,name:"loadHdr"},name:"loadHdr",id:"hdr",test(e){return pr(e,".hdr")},async load(e,t){const s=await fetch(e);if(!s.ok)throw new Error(`loadHdr: fetching ${e} failed with status ${s.status}.`);const r=bp(await s.arrayBuffer()),i=t?.data?.faceSize??vp(r.width);return yp(r,i,la.basename(e,".hdr"))},unload(e){const t=Object.values(e.source.faces);e.destroy(!0);for(const s of t)s.destroy()}};var Sp=class{stride=0;offset=0;fields;_store;_baseIndex=0;_size=0;constructor(e,t,s){const{layout:r}=e;this._store=e,this._baseIndex=t,this._size=s,this.stride=r.stride,this.offset=t*r.stride,this.fields=r.offsets}get data(){return this._store.data}get u32Data(){return this._store.u32Data}update(e=0,t=this._size-e){const s=this._size;if(!(e>=0&&t>=0&&e+t<=s))throw new RangeError(`update: slots ${e} to ${e+t-1} are outside the batch (${s} slots).`);if(t===0)return;const r=this._baseIndex+e;this._store.markDirtyRange(r,r+t-1)}destroy(){this._store=null}},ct=class extends Se{constructor(e){super(e),this.autoGarbageCollect=!1}};const Tp=8192,wc=da.android.device?4194304:0,Cp=768,Dp=4294967295;var Bp=class{min=1/0;max=-1/0;spanOnly=!1;runs=new Int32Array(64);runCount=0;runSlots=0;_bits;_slotBytes=0;_hasBits=!1;_collected=!1;constructor(e,t){this._bits=new Uint32Array(e+31>>>5),this._slotBytes=t}get isEmpty(){return this.min>this.max}mark(e){if(e<this.min&&(this.min=e),e>this.max&&(this.max=e),this.spanOnly)return;const t=e>>>5,s=1<<(e&31),r=this._bits[t];(r&s)===0&&(this._bits[t]=r|s,this._hasBits=!0)}markRange(e,t){e<this.min&&(this.min=e),t>this.max&&(this.max=t),this.spanOnly=!0}planRuns(){if(this.spanOnly||this.isEmpty)return;const e=this._bits,t=Math.floor(Cp/this._slotBytes),s=this.max>>>5;let r=0,i=0,n=-1,o=-1;for(let a=this.min>>>5;a<=s;a++){let c=e[a];if(c!==0){if(e[a]=0,c===Dp){const l=a<<5;o>=0&&l-o<=t||(o>=0&&(i+=o-n,r=this._pushRun(r,n,o)),n=l),o=l+32;continue}for(;c!==0;){const l=a<<5|31-Math.clz32(c&-c);c&=c-1,o>=0&&l-o<=t||(o>=0&&(i+=o-n,r=this._pushRun(r,n,o)),n=l),o=l+1}}}o>=0&&(i+=o-n,r=this._pushRun(r,n,o)),this.runCount=r,this.runSlots=i,this._collected=!0}runsBeatSpan(e,t=0){if(this.spanOnly||!this._collected)return!1;const s=this._slotBytes,r=(this.max-this.min+1)*s;return r>=t&&this.runCount*e+this.runSlots*s<r}clear(){!this._collected&&this._hasBits&&this._bits.fill(0,this.min>>>5,(this.max>>>5)+1),this.min=1/0,this.max=-1/0,this.spanOnly=!1,this.runCount=0,this.runSlots=0,this._hasBits=!1,this._collected=!1}grow(e){const t=e+31>>>5;if(t<=this._bits.length)return;const s=new Uint32Array(t);s.set(this._bits),this._bits=s}_pushRun(e,t,s){if(e*2+2>this.runs.length){const r=new Int32Array(this.runs.length*2);r.set(this.runs),this.runs=r}return this.runs[e*2]=t,this.runs[e*2+1]=s,e+1}},Oi=class{data;u32Data;fl64Data;_buffer=null;_bufferResource=null;_retiredBuffers=[];_retiredTextures=[];_texture=null;_textureSource=null;_indexKey;_freeList;_freeCount=0;_stride=0;_count=0;_copier;_dirty;bufferVersion=0;constructor(e){this._stride=e.stride,this._indexKey=e.indexKey;const t=e.initialSize||100;let s=t*this._stride;s%4!==0&&(s+=4-s%4),s=se(s),this.data=new Float32Array(s),this.u32Data=new Uint32Array(this.data.buffer),this.fl64Data=new Float64Array(this.data.buffer),this._freeList=new Uint32Array(t),this._dirty=new Bp(Math.floor(s/this._stride),this._stride*4),this._copier=e.copier}get buffer(){return this._buffer??=new ct({data:this.data,usage:G.STORAGE|G.COPY_DST|G.COPY_SRC,label:"RenderDataBuffer"})}get bufferResource(){return this._bufferResource??=new ze({buffer:this.buffer})}get texture(){return this._texture||this._initTexture()}_initTexture(){return this._stride%4!==0&&V(`DataStoreBuffer: Stride (${this._stride}) is not a multiple of 4. This will cause issues when sampling from a texture.`),this._textureSource=pi(this.data),this._texture=new L({source:this._textureSource}),this._texture}update(){const e=this._dirty;if(e.isEmpty)return;const t=this._buffer,s=this._textureSource;if(t||s){e.planRuns();const r=this._stride,i=e.runs;if(t)if(e.runsBeatSpan(8192,wc))for(let n=0;n<e.runCount;n++){const o=i[n*2]*r;t.update((i[n*2+1]*r-o)*4,o*4)}else{const n=e.min*r;t.update(((e.max+1)*r-n)*4,n*4)}if(s)if(e.runsBeatSpan(16384))for(let n=0;n<e.runCount;n++)Ce(s,i[n*2]*r,i[n*2+1]*r);else Ce(s,e.min*r,(e.max+1)*r)}e.clear()}allocate(e){const t=e;let s=t[this._indexKey];return s<0&&(this._freeCount>0?s=this._freeList[--this._freeCount]:((this._count+1)*this._stride>this.data.length&&this._expand(),s=this._count++),t[this._indexKey]=s),s}set(e){if(!this.data)return-1;const t=this.allocate(e),s=this._stride;return this._copier(e,this.data,this.u32Data,this.fl64Data,t*s,s),this._dirty.mark(t),t}remove(e){const t=e,s=t[this._indexKey];if(!(s<0)&&(t[this._indexKey]=-1,!!this.data)){if(this._freeCount>=this._freeList.length){const r=new Uint32Array(this._freeList.length*2);r.set(this._freeList),this._freeList=r}this._freeList[this._freeCount++]=s}}get stride(){return this._stride}allocateBlock(e,t){const s=e[this._indexKey];if(s>=0)return s;const r=(this._count+t)*this._stride;r>this.data.length&&this._expand(r);const i=this._count;return e[this._indexKey]=i,this._count+=t,this._dirty.markRange(i,i+t-1),i}markDirty(e){this._dirty.mark(e)}markDirtyRange(e,t){this._dirty.markRange(e,t)}_freeRetired(){for(let e=0;e<this._retiredBuffers.length;e++)this._retiredBuffers[e].destroy();this._retiredBuffers.length=0;for(let e=0;e<this._retiredTextures.length;e++)this._retiredTextures[e].destroy(!0);this._retiredTextures.length=0}unload(){this.data&&(this._buffer?.unload(),this._textureSource?.unload(),this._freeRetired())}destroy(){this.data&&(this._bufferResource?.destroy(!1),this._buffer?.destroy(),this._freeRetired(),this._texture?.destroy(!0),this.data=null,this.u32Data=null,this.fl64Data=null,this._buffer=null,this._bufferResource=null,this._freeList=null,this._texture=null,this._textureSource=null)}_expand(e){let t=this.data.length*2;e!==void 0&&t<e&&(t=e),t=se(t);const s=new Float32Array(t);s.set(this.data),this.data=s,this.u32Data=new Uint32Array(this.data.buffer),this.fl64Data=new Float64Array(this.data.buffer);const r=t/this._stride;if(this._dirty.grow(Math.floor(r)),r>this._freeList.length){const i=new Uint32Array(r);i.set(this._freeList),this._freeList=i}this._buffer&&(this._retiredBuffers.push(this._buffer),this._buffer=null,this._bufferResource=null),this._texture&&(this._retiredTextures.push(this._texture),this._texture=null,this._textureSource=null),this.bufferVersion++}};const Sc=(e,t,s)=>{e[t]=s[0],e[t+1]=s[1],e[t+2]=s[2],e[t+3]=s[3],e[t+4]=s[4],e[t+5]=s[5],e[t+6]=s[6],e[t+7]=s[7]},Ip=(e,t,s,r,i)=>{Sc(r,i/2,e.worldTransform.elements64),e.skeleton&&(s[i+16]=e.skeleton._bonePitIndex),s[i+17]=e.material._materialIndex,s[i+18]=e.geometry._geometryDataIndex,s[i+20]=e._morph?e._morph._weightIndex:0};function Tc(e,t,s,r,i,n){const o=i.boundsSphere,a=o.radius;if(i.dynamic||a<0){e[t]=0,e[t+1]=0,e[t+2]=0,e[t+3]=-1;return}const c=o.center,l=c.x,u=c.y,h=c.z,d=s[r],f=s[r+1],p=s[r+2],m=s[r+4],_=s[r+5],g=s[r+6],b=s[r+8],y=s[r+9],v=s[r+10];e[t]=d*l+m*u+b*h+s[r+12],e[t+1]=f*l+_*u+y*h+s[r+13],e[t+2]=p*l+g*u+v*h+s[r+14];const x=d*d+f*f+p*p,w=m*m+_*_+g*g,T=b*b+y*y+v*v;e[t+3]=(a+n)*Math.sqrt(Math.max(x,w,T))}var Mp=class extends Oi{boundingSpheres=null;writesSpheres=!1;visible;constructor(e=100){super({stride:24,initialSize:e,indexKey:"_storeIndex",copier:Ip}),this.visible=new Uint8Array(Math.floor(this.data.length/24))}enableSphereWrites(e){this.writesSpheres=e,e&&this.boundingSpheres===null&&this.data&&(this.boundingSpheres=new Float32Array(Math.floor(this.data.length/24)*4))}set(e){const t=super.set(e);if(t>=0){this._storeVisibility(t,e._worldVisible);const s=e.geometry;this.writeBoundingSphere(t,this.data,t*24,s,e._morph?s._morphBoundsExpansion:0)}return t}writeBoundingSphere(e,t,s,r,i){this.writesSpheres&&Tc(this.boundingSpheres,e*4,t,s,r,i)}writeWorldTransform(e,t){Sc(this.fl64Data,e*12,t),this.markDirty(e)}writeVisibility(e,t){this._storeVisibility(e,t),this.markDirty(e)}writeVisibilityRange(e,t,s){for(let r=e,i=e+t;r<i;r++)this._storeVisibility(r,s)}_storeVisibility(e,t){this.u32Data[e*24+19]=t,this.visible[e]=t}destroy(){super.destroy(),this.visible=null,this.boundingSpheres=null}_expand(e){super._expand(e);const t=new Uint8Array(Math.floor(this.data.length/24));if(t.set(this.visible),this.visible=t,this.boundingSpheres===null)return;const s=new Float32Array(Math.floor(this.data.length/24)*4);s.set(this.boundingSpheres),this.boundingSpheres=s}},Pp=class{stride=24;offset=0;_batch;_baseIndex=0;constructor(e,t){this._batch=e,this._baseIndex=t,this.offset=t*24}get data(){return this._batch.storeBuffer.data}update(e=0,t=this._batch.items.length-e){const s=this._batch,r=s.items;if(!(e>=0&&t>=0&&e+t<=r.length))throw new RangeError(`update: slots ${e} to ${e+t-1} are outside the batch (${r.length} slots).`);if(t===0)return;const i=this._baseIndex+e;if(s.storeBuffer.markDirtyRange(i,i+t-1),s.storeBuffer.writesSpheres)for(let n=e,o=e+t;n<o;n++)s._writeSlotSphere(n)}destroy(){this._batch=null}},Ap=class{geometry=null;shader=null;globalBindGroup=null;batchBindGroup=void 0;state=null;topology=null;batchKey=0;textureSetId=0;merged=!1;dead=!1;leftOut=!1;captures=[]},Fp=class{resource;generation=0;tailOwners=0;geometries;constructor(e,t,s){this.resource=e,this.generation=t,this.geometries=s?[s]:null}};let Cs=0;function jn(e){const t=e._resourceId,s=e.style?e.style._resourceId:-1,r=e._capturedResourceId!==void 0&&(e._capturedResourceId!==t||e._capturedStyleId!==s);return e._capturedResourceId=t,e._capturedStyleId=s,r}const zp={geometry:null,shader:null,state:null,topology:"triangle-list",size:0,instanceCount:0,start:0,baseVertex:0,firstInstance:0};let qn=0;var kp=class{commands=[];count=0;bodyCount=0;dirtyId=0;onCaptureLost;_captures=new Map;_destroyed=!1;captureTick=++qn;_onCaptureResourceLost=e=>{const t=this._captures.get(e)?.geometries;if(t)for(const s of t)cs.prototype.unload.call(s);else jn(e),Cs++;this.onCaptureLost?.()};next(){const e=this.count,t=this.commands[e]??=new Ap;return t.dead=!1,t.leftOut=!1,this.count=e+1,t}captureGeometry(e){const t=e;if(t._captureTick===this.captureTick)return;t._captureTick=this.captureTick;const s=e.buffers;for(let r=0;r<s.length;r++)this._capture(s[r],e)}captureMaterialTextures(e){if(e._captureTick===this.captureTick)return;e._captureTick=this.captureTick;const t=e._textures;for(let s=0;s<t.length;s++)is.has(t[s])||this._capture(t[s].source,null);this.refreshMaterialBindings(e)}captureTail(e,t,s){const r=e.captures,i=t.buffers;for(let o=0;o<i.length;o++){const a=this._capture(i[o],t,!0);a&&r.push(a)}if(!s)return;const n=s._textures;for(let o=0;o<n.length;o++){if(is.has(n[o]))continue;const a=this._capture(n[o].source,null,!0);a&&r.push(a)}this.refreshMaterialBindings(s)}releaseTail(e){const t=e.captures,s=e.geometry;let r=!1;for(let n=this.bodyCount;n<this.count&&!r;n++){const o=this.commands[n];r=o!==e&&o.geometry===s&&o.captures.length>0}const i=r||s._captureTick===this.captureTick;for(let n=0;n<t.length;n++){const o=t[n];if(--o.tailOwners>0||o.generation===this.captureTick){if(!i&&o.geometries){const a=o.geometries.indexOf(s);a>=0&&o.geometries.splice(a,1)}continue}this._unwatch(o),this._captures.delete(o.resource)}t.length=0}refreshMaterialBindings(e){e._lastTextureDirtyId!==Cs&&(e._lastTextureDirtyId=Cs,e._refreshTextureBindings())}_capture(e,t,s=!1){if(e instanceof ct)return;const r=s?-1:this.captureTick;let i=this._captures.get(e);return i===void 0?(i=new Fp(e,r,t),this._captures.set(e,i),e.on("change",this._onCaptureResourceLost),t===null&&this._watchTexture(e)):(!s&&i.generation!==r&&(i.generation=r,i.geometries&&(i.geometries.length=0)),t&&i.geometries&&!i.geometries.includes(t)&&i.geometries.push(t)),s&&i.tailOwners++,i}_watchTexture(e){e.on("styleChange",this._onCaptureResourceLost),jn(e)&&Cs++}_unwatch(e){const t=e.resource;t.off("change",this._onCaptureResourceLost),e.geometries===null&&t.off("styleChange",this._onCaptureResourceLost)}_dropCaptures(){for(const e of this._captures.values())this._unwatch(e);this._captures.clear()}clear(){for(let e=this.bodyCount;e<this.count;e++){const t=this.commands[e].captures;for(let s=0;s<t.length;s++)t[s].tailOwners=0;t.length=0}this.captureTick=++qn,this.count=0,this.bodyCount=0,this.dirtyId++}endBuild(){this.bodyCount=this.count;const e=this.captureTick;for(const t of this._captures.values())t.generation!==e&&(this._unwatch(t),this._captures.delete(t.resource))}touch(e){for(const t of this._captures.keys())t._gcLastUsed=e}releaseCaptures(){this.clear(),this._dropCaptures()}replayDirect(e,t,s){const r=t.drawCalls,{bindGroup:i}=s,n=zp;for(let o=0;o<this.count;o++){const a=o*5,c=r[a+1];if(c===0||r[a]===0)continue;const l=this.commands[o];l.shader.groups[0]=l.globalBindGroup,l.shader.groups[1]=i,l.batchBindGroup&&(l.shader.groups[2]=l.batchBindGroup),n.geometry=l.geometry,n.shader=l.shader,n.state=l.state,n.topology=l.topology,n.size=r[a],n.instanceCount=c,n.start=r[a+2],n.baseVertex=r[a+3],n.firstInstance=r[a+4],e.draw(n)}n.geometry=null,n.shader=null,n.state=null}replay(e,t,s,r,i=0,n=this.count){const o=t.getGPUBuffer(s.drawCallsBuffer),{bindGroup:a}=r;for(let c=i;c<n;c++){const l=this.commands[c];if(l.dead){l.leftOut=!0;continue}l.shader.groups[0]=l.globalBindGroup,l.shader.groups[1]=a,l.batchBindGroup&&(l.shader.groups[2]=l.batchBindGroup),e.drawIndirect({geometry:l.geometry,shader:l.shader,state:l.state,topology:l.topology,indirectBuffer:o,indirectOffset:c*20})}}destroy(){this._destroyed||(this._destroyed=!0,this._dropCaptures(),this.onCaptureLost=void 0,this.count=0,this.commands=null)}};const Rp=/^[A-Za-z][A-Za-z0-9_]*$/,Wn=["vec4<f32>","vec4<u32>","vec4<i32>"];function Lp(e){const t=Object.keys(e);if(t.length===0)throw new Error("instanceData: no fields declared. Declare at least one, or leave the option out.");const s={};for(const a of t){const c=e[a];if(!Rp.test(a)||a.includes("__"))throw new Error(`instanceData: "${a}" is not a usable field name. Use letters, digits and single underscores, starting with a letter.`);if(!Wn.includes(c.type))throw new Error(`instanceData: field "${a}" is "${c.type}". Use ${Wn.join(", ")}.`);if(c.value?.length!==4)throw new Error(`instanceData: field "${a}" needs a value of four numbers.`);s[a]=c.type}const r=Li(s),i=new Uint32Array(r.size/4),n=new Float32Array(i.buffer),o={};for(const a of r.elements){const c=a.offset/4,{type:l,value:u}=e[a.name],h=l==="vec4<f32>"?n:i;o[a.name]=c;for(let d=0;d<4;d++)h[c+d]=u[d]}return{struct:s,offsets:o,stride:i.length,defaults:i,key:t.map(a=>`${a}:${e[a].type}`).join(",")}}const Ep=()=>{};var Vp=class extends Oi{layout;constructor(e,t,s){const r=Lp(e),i=t+s;super({stride:r.stride,initialSize:i,indexKey:"_instanceStoreIndex",copier:Ep}),this.layout=r,this.allocateBlock({_instanceStoreIndex:-1},i);const{defaults:n,stride:o}=r,a=this.u32Data;for(let c=t;c<i;c++)a.set(n,c*o)}};const Ur=1,Kn=2,Gp=32,Op=64;var Np=class{items;count=0;dirty=!0;orderDirtyId=0;indices;renderableIndices;_sortKeys;_localIndices;_uidToLocal=new Map;_sortedCount=-1;_sortedKeys;_mergeIndices;_mergeKeys;_changes=new Uint8Array(0);_hasChanges=!1;_pending=[];_pendingCount=0;_orderForced=!1;_insertionSkip=0;_insertionBackoff=0;constructor(e,t=32){this.items=e,this.renderableIndices=new Uint32Array(t),this._sortKeys=new Float64Array(t),this._localIndices=new Uint32Array(t),this.indices=new Uint32Array(t),this._sortedKeys=new Float64Array(t),this._mergeIndices=new Uint32Array(t),this._mergeKeys=new Float64Array(t)}get orderForced(){return this._orderForced}indexOf(e){const t=this._uidToLocal.get(e);return t===void 0?-1:this.renderableIndices[t]}add(e,t,s){const r=this.count++;r>=this.renderableIndices.length&&this._grow(Math.max(this.renderableIndices.length*2,256)),this.renderableIndices[r]=t,this._sortKeys[r]=s,this._uidToLocal.set(e,r),this.dirty=!0,this._sortedCount>=0&&this._markPending(e,t)}remove(e){const t=this._uidToLocal.get(e);if(t===void 0)return;const s=this.renderableIndices[t],r=--this.count;if(t!==r){const i=this.renderableIndices[r],n=this._sortKeys[r],o=this._getUidAtLocal(r);this.renderableIndices[t]=i,this._sortKeys[t]=n,this._uidToLocal.set(o,t)}this._uidToLocal.delete(e),this.dirty=!0,this._sortedCount>=0&&(this._setChange(s,Ur),this._changes[s]&=-3)}updateKey(e,t){const s=this._uidToLocal.get(e);if(s!==void 0&&this._sortKeys[s]!==t&&(this._sortKeys[s]=t,this.dirty=!0,this._sortedCount>=0)){const r=this.renderableIndices[s];this._setChange(r,Ur),this._markPending(e,r)}}sort(){const e=this.count;if(e===0){this._resetOrder(0);return}this.dirty&&((this._sortedCount<0||this._orderForced||this._pendingCount>e>>1||!this._patchOrder())&&this._sortFull(),this.orderDirtyId++,this._orderForced=!1,this.dirty=!1)}sortForced(e){const t=this.count;if(t===0){this._resetOrder(0),this.orderDirtyId++;return}let s=!1;if(this._orderForced&&this._sortedCount===t&&!this._hasChanges&&(this._insertionSkip>0?this._insertionSkip--:s=this._insertionSort(e)),!s){const r=this.items,i=this._sortKeys,n=this.renderableIndices;for(let o=0;o<t;o++)i[o]=e(r[n[o]]);this._sortFull()}this._orderForced=!0,this.dirty=!1}clear(){this.orderDirtyId++,this.count=0,this._uidToLocal.clear(),this.dirty=!0,this._resetOrder(-1),this._orderForced=!1,this._insertionSkip=0,this._insertionBackoff=0}_sortFull(){const e=this.count,t=this._sortKeys,s=this._localIndices,r=this.renderableIndices,i=this.indices,n=this._sortedKeys;for(let o=0;o<e;o++)s[o]=o;s.subarray(0,e).sort((o,a)=>t[o]-t[a]);for(let o=0;o<e;o++){const a=s[o];i[o]=r[a],n[o]=t[a]}this.orderDirtyId++,this._resetOrder(e)}_insertionSort(e){const t=this.count,s=this.items,r=this.indices,i=this._sortedKeys;for(let a=0;a<t;a++)i[a]=e(s[r[a]]);const n=t*Gp;let o=0;for(let a=1;a<t;a++){const c=i[a];if(i[a-1]<=c)continue;const l=r[a];let u=a-1;do i[u+1]=i[u],r[u+1]=r[u],u--;while(u>=0&&i[u]>c);if(i[u+1]=c,r[u+1]=l,o+=a-1-u,o>n)return this._insertionBackoff=Math.min(Op,Math.max(1,this._insertionBackoff*2)),this._insertionSkip=this._insertionBackoff,!1}return this._insertionBackoff=0,o>0&&this.orderDirtyId++,!0}_patchOrder(){const e=this.count,t=this._sortKeys,s=this.renderableIndices;this._changes.length<this.items.length&&this._growChanges(this.items.length);const r=this._changes,i=this._localIndices;let n=0;for(let p=0;p<this._pendingCount;p++){const m=this._uidToLocal.get(this._pending[p]);if(m===void 0)continue;const _=s[m];(r[_]&Kn)!==0&&(r[_]&=-3,i[n++]=m)}n>1&&i.subarray(0,n).sort((p,m)=>t[p]-t[m]);const o=this.indices,a=this._sortedKeys,c=this._sortedCount,l=this._mergeIndices,u=this._mergeKeys;let h=0,d=0,f=0;for(;;){for(;h<c&&(r[o[h]]&Ur)!==0;)h++;if(h<c&&(d===n||a[h]<=t[i[d]]))l[f]=o[h],u[f++]=a[h++];else if(d<n){const p=i[d++];l[f]=s[p],u[f++]=t[p]}else break}return f!==e?!1:(this.indices=l,this._mergeIndices=o,this._sortedKeys=u,this._mergeKeys=a,this._resetOrder(e),!0)}_markPending(e,t){this._setChange(t,Kn)&&(this._pending[this._pendingCount++]=e,this._pendingCount>this.renderableIndices.length&&this._resetOrder(-1))}_setChange(e,t){e>=this._changes.length&&this._growChanges(e+1);const s=this._changes,r=s[e];return(r&t)!==0?!1:(s[e]=r|t,this._hasChanges=!0,!0)}_growChanges(e){const t=new Uint8Array(Math.max(e,this._changes.length*2,256));t.set(this._changes),this._changes=t}_resetOrder(e){this._hasChanges&&(this._changes.fill(0),this._hasChanges=!1,this._pendingCount=0),this._sortedCount=e}_getUidAtLocal(e){const t=this.renderableIndices[e];return this.items[t].uid}_grow(e){const t=this.renderableIndices,s=this._sortKeys;this.renderableIndices=new Uint32Array(e),this._sortKeys=new Float64Array(e),this._localIndices=new Uint32Array(e),this.indices=new Uint32Array(e),this._sortedKeys=new Float64Array(e),this._mergeIndices=new Uint32Array(e),this._mergeKeys=new Float64Array(e),this.renderableIndices.set(t),this._sortKeys.set(s),this._resetOrder(-1)}},Cc=class{drawCalls;constructor(e=128){this.drawCalls=new Uint32Array(e*5)}ensureCapacity(e){const t=e*5;if(this.drawCalls.length<t){const s=new Uint32Array(Math.ceil(e*1.5)*5);s.set(this.drawCalls),this.drawCalls=s}return this.drawCalls}destroy(){this.drawCalls=null}},Dc=class{bufferResource;_buffer;data;constructor(e,t=128){this.data=new Uint32Array(t),this._buffer=new ct({data:this.data,usage:G.STORAGE|G.COPY_DST|G.COPY_SRC,label:e,shrinkToFit:!1}),this.bufferResource=new ze({buffer:this._buffer})}get buffer(){return this._buffer}ensureSize(e){return this.data.length<e&&(this.data=new Uint32Array(Math.ceil(e*1.5)),this._buffer.data=this.data),this.data}populateIds(e){const t=e.count,s=this.ensureSize(t),r=e.indices,i=e.items;for(let n=0;n<t;n++)s[n]=i[r[n]]._storeIndex}upload(e,t=0){this._buffer.update((e-t)*4,t*4)}unload(){this._buffer?.unload()}destroy(){this._buffer&&(this.bufferResource.destroy(!1),this._buffer.destroy(),this._buffer=null,this.bufferResource=null,this.data=null)}};let Hr=new Uint32Array(0),jr=new Uint32Array(0);const Ds=-1,Yn=-2,qr=64,$p=60;function Xn(e,t){const s=Math.imul(e>>>0,2654435761)^Math.imul(e/4294967296>>>0,2246822507)^Math.imul(t,3266489909);return s^s>>>15}var Up=class{view;drawDirtyId=0;lastDrawDirtyId=-1;lastOrderDirtyId=-1;rangesDirtyId=0;bit=0;commandList=new kp;drawData=new Cc;gpuData;glData;_rowCommand=new Int32Array(0);_memberCounts=new Uint32Array(0);_left=new Uint8Array(0);_deadCount=0;_recordCount=0;_joining=new Uint32Array(64);_joiningCount=0;_firstEdited=1/0;_readDirtyId=-1;_alwaysRebuilt=!1;_kinds=new Int32Array(0);_kindsUsed=-1;_edited=!1;_quietFrames=0;_lastQuietTick=-1;_destroyed=!1;constructor(e){this.view=new Np(e.items,e.initialCapacity),this.bit=e.bit,this.glData={indexTexture:null,indexStaging:null,lastVisibilityDirtyId:-1},this.gpuData={instanceBuffer:new Dc(e.label),bundleDirtyId:0},this.commandList.onCaptureLost=()=>{this.drawDirtyId++}}get records(){return this.glData.indexStaging??this.gpuData.instanceBuffer.data}isDrawStale(){return this.drawDirtyId!==this.lastDrawDirtyId||this._edited}nextBuild(e,t=!1){if(this._alwaysRebuilt=t,!t&&!this.isDrawStale()){const s=this.commandList;if(s.count===s.bodyCount||e===this._lastQuietTick||(this._lastQuietTick=e,++this._quietFrames<$p))return!1;this.drawDirtyId++}return this._quietFrames=0,this._edited=!1,this.view.sort(),!0}isOrderStale(){return this.view.orderDirtyId!==this.lastOrderDirtyId}claimDrawBuilt(){this.lastDrawDirtyId=this.drawDirtyId,this.lastOrderDirtyId=this.view.orderDirtyId}claimDrawEmpty(){this.lastDrawDirtyId=this.drawDirtyId}add(e,t){const s=this._editable();this.view.add(e.uid,t,e._sortKey),s&&this._queueJoin(t),this._edited=!0}remove(e){this._editable()&&this._dropFromCommand(e._storeIndex),this.view.remove(e.uid),this._edited=!0}move(e){this._editable()&&this._dropFromCommand(e._storeIndex)&&this._queueJoin(this.view.indexOf(e.uid)),this._edited=!0}applyEdits(){this._edited&&(this._edited=!1,!(this.lastDrawDirtyId<0)&&(!this._editable()||!this._repack())&&(this._joiningCount=0,this.drawDirtyId++))}_editable(){const e=this.commandList;return this.drawDirtyId!==this.lastDrawDirtyId||e.count===0||this._alwaysRebuilt||this.view.orderForced?!1:(this._readDirtyId!==e.dirtyId&&this._readBuild(),!0)}_readBuild(){const e=this.commandList,t=e.count,s=this.drawData.drawCalls,r=this.records,i=this.view.count,n=t+qr;this._memberCounts.length<n&&(this._memberCounts=new Uint32Array(n*2),this._left=new Uint8Array(n*2));const o=this._memberCounts;this._left.fill(0);let a=this._rowCommand.fill(Ds);for(let c=0;c<t;c++){const l=s[c*5+4],u=c+1<t?s[(c+1)*5+4]:i;o[c]=u-l;for(let h=l;h<u;h++){const d=r[h];d>=a.length&&(a=this._growRows(d+1)),a[d]=c}}this._recordCount=i,this._deadCount=0,this._joiningCount=0,this._firstEdited=1/0,this._kindsUsed=-1,this._readDirtyId=e.dirtyId}_growRows(e){const t=Math.min(this._rowCommand.length*2,this.view.items.length+1),s=new Int32Array(Math.max(e,t,256)).fill(Ds);return s.set(this._rowCommand),this._rowCommand=s}_queueJoin(e){if(this._joiningCount===this._joining.length){if(this._joiningCount>=this.view.items.length){this._joiningCount=0,this.drawDirtyId++;return}const t=new Uint32Array(this._joining.length*2);t.set(this._joining),this._joining=t}this._joining[this._joiningCount++]=e}_dropFromCommand(e){const t=this._rowCommand;if(e<0||e>=t.length)return!1;const s=t[e];if(s<0)return!1;if(t[e]=Ds,this._left[s]=1,s<this._firstEdited&&(this._firstEdited=s),--this._memberCounts[s]>0)return!0;const r=this.commandList;return s>=r.bodyCount?r.releaseTail(r.commands[s]):++this._deadCount*2>r.bodyCount&&this.drawDirtyId++,!0}_repack(){const e=this.view,t=e.items,s=this.bit,r=this._joining;let i=this._rowCommand,n=this._firstEdited,o=0;for(let S=0;S<this._joiningCount;S++){const C=t[r[S]];if(!C||(C._lastRenderPass&s)===0)continue;const D=C._storeIndex;if(D>=i.length&&(i=this._growRows(D+1)),i[D]!==Ds)continue;const I=C._passCache[s];if(!I)return!1;let M=this._find(C,I);if(M<0&&(M=this._record(C,I),M<0))return!1;this._memberCounts[M]++===0&&M<this.commandList.bodyCount&&this._deadCount--,i[D]=Yn-M,r[o++]=D,M<n&&(n=M)}this._joiningCount=0,this._firstEdited=1/0;const a=this.commandList,c=a.bodyCount,l=this._memberCounts,u=a.count;for(;a.count>c&&l[a.count-1]===0;)a.count--;const h=a.count;if(n===1/0)return!0;n>h&&(n=h);const d=e.count;Hr.length<d&&(Hr=new Uint32Array(Math.ceil(d*1.5))),jr.length<h&&(jr=new Uint32Array(h*2));const f=Hr,p=jr,m=this.records,_=this._recordCount,g=a.commands,b=this.drawData.drawCalls,y=this._left,v=b[n*5+4];let x=v,w=!1;for(let S=n;S<h;S++){const C=g[S],D=l[S],I=b[S*5+4],M=S+1<u?b[(S+1)*5+4]:_;if(b[S*5+4]=x,b[S*5+1]=D,y[S]===0)for(let P=I;P<M;P++)f[x++]=m[P];else{y[S]=0;for(let P=I;P<M;P++){const A=m[P];i[A]>=0&&(f[x++]=A)}}p[S]=x,x=b[S*5+4]+D,C.leftOut&&D>0&&S<c&&(w=!0,C.leftOut=!1),C.dead=D===0}if(x!==d)return!1;for(let S=0;S<o;S++){const C=r[S],D=Yn-i[C];i[C]=D,f[p[D]++]=C}const T=f.subarray(v,d),B=this.glData;if(B.indexStaging){const S=B.indexTexture;S.ensureCapacity(d),m.length<S.data.length&&(B.indexStaging=new Uint32Array(S.data.length),B.indexStaging.set(m.subarray(0,v))),B.indexStaging.set(T,v),B.lastVisibilityDirtyId=-1}else{if(d>v){const S=this.gpuData.instanceBuffer,C=S.ensureSize(d);C!==m&&C.set(m.subarray(0,v)),C.set(T,v),S.upload(d,C!==m?0:v)}w&&this.gpuData.bundleDirtyId++}return this._recordCount=d,this.rangesDirtyId++,!0}_find(e,t){this._kindsUsed<0&&this._indexKinds();const s=this._kinds,r=s.length-1,i=this.commandList.commands[0].batchBindGroup?e.material._textureSetId:0;for(let n=Xn(t.batchKey,i)&r;;n=n+1&r){const o=s[n];if(o===0)return-1;if(this._fits(o-1,e,t))return o-1}}_indexKinds(){const e=this.commandList.count;let t=256;for(;t<(e+qr)*2;)t*=2;this._kinds.length===t?this._kinds.fill(0):this._kinds=new Int32Array(t),this._kindsUsed=0;for(let s=0;s<e;s++)this._indexKind(s)}_indexKind(e){const t=this._kinds,s=t.length-1,r=this.commandList.commands[e];let i=Xn(r.batchKey,r.textureSetId)&s;for(;t[i]!==0;)i=i+1&s;t[i]=e+1,++this._kindsUsed*2>t.length&&(this._kindsUsed=-1)}_fits(e,t,s){const r=this.commandList,i=r.commands[e];if(s.batchKey!==i.batchKey||e>=r.bodyCount&&this._memberCounts[e]===0)return!1;const n=t.geometry._geometryAtlasAllocation;if(i.geometry!==(n?n.atlas.geometry:t.geometry))return!1;if(n){const a=this.drawData.drawCalls;if(a[e*5]!==n.indexCount||a[e*5+2]!==n.firstIndex)return!1}const o=i.batchBindGroup;return o?i.merged?i.textureSetId===t.material._textureSetId:o===t.material._getBindGroup():!0}_record(e,t){const s=this.commandList,r=s.commands;let i=s.bodyCount;for(;i<s.count&&this._memberCounts[i]>0;)i++;if(i===s.count){if(i-s.bodyCount===qr)return-1;s.next(),this._memberCounts[i]=0,this.drawData.ensureCapacity(i+1)[i*5+4]=this._recordCount}const n=this.glData.indexStaging!==null,o=r[0].batchBindGroup!==void 0,a=e.material,c=e.geometry._geometryAtlasAllocation,l=c?c.atlas.geometry:e.geometry,u=r[i];s.captureTail(u,l,o?a:null),u.geometry=l,u.shader=t.shader,u.globalBindGroup=r[0].globalBindGroup,u.batchBindGroup=o?n?a._getMergedBindGroup():a._getBindGroup():void 0,u.state=ss(t.batchKey,t.state),u.topology=t.topology,u.batchKey=t.batchKey,u.textureSetId=o?a._textureSetId:0,u.merged=o&&n,u.dead=!1,u.leftOut=!1;const h=this.drawData.drawCalls;return h[i*5]=c?c.indexCount:l.indexCount||l.indexBuffer.data.length,h[i*5+2]=c?c.firstIndex:0,h[i*5+3]=c&&!n?c.baseVertex:0,this._kindsUsed>=0&&this._indexKind(i),this._quietFrames=0,i}unload(){this._destroyed||(this.commandList.releaseCaptures(),this.drawDirtyId++,this.gpuData.bundleDirtyId++,this.gpuData.instanceBuffer.unload(),this.glData.indexTexture?.unload())}destroy(){this._destroyed||(this._destroyed=!0,this.gpuData.instanceBuffer.destroy(),this.glData.indexTexture?.destroy(),this.glData.indexTexture=null,this.glData.indexStaging=null,this.view=null,this.commandList.destroy(),this.drawData.destroy())}};const Hp=new Float32Array(4);var jp=class{uid=0;_sortKey=0;_storeIndex=0;_batchDirty=!0;_lastRenderPass=0;_lastDescriptorDirtyId=-1;skeleton=void 0;_passCache={};geometry;material;receiveShadow=!0;billboardMode="none";_worldVisible=1;_batch;_boundingSphere=null;constructor(e,t,s){this.uid=e,this._storeIndex=t,this._batch=s}get boundingSphere(){const e=this._boundingSphere||=new wt,t=this._batch.storeBuffer;let s=t.boundingSpheres,r=this._storeIndex*4;if(!t.writesSpheres||s===null){const i=this.geometry;if(i===void 0)return e.makeEmpty();s=Hp,r=0,Tc(s,0,t.data,this._storeIndex*24,i,0)}return e.center.set(s[r],s[r+1],s[r+2]),e.radius=s[r+3],e}destroy(){this._batch=null}};let qp=0;const Bc=new E,Wp={worldTransform:Bc,_worldVisible:1};var Ic=class{uid=++qp;items;storeBuffer;drawLists=Object.create(null);instanceStoreBuffer=null;_batchWorldMatrixIndex=0;renderData;isUserBatch;_dirtyIndices=null;_dirtyCount=0;_editsPending=!1;destroyed=!1;_visibilityDirtyId=0;_cull="off";_lastStoreBufferVersion=0;_baseIndex=0;_matrices=null;_instanceData=null;constructor(e){this.renderData=e.renderData??Wp,this.storeBuffer=new Mp;const t={_storeIndex:-1};if(this._batchWorldMatrixIndex=this.storeBuffer.allocateBlock(t,1),e.items!==void 0)this.items=e.items,this._baseIndex=0,this.isUserBatch=!1;else{const s=e.size,r={_storeIndex:-1};this._baseIndex=this.storeBuffer.allocateBlock(r,s);const i=[],n=new Uint32Array(s);for(let o=0;o<s;o++)i.push(new jp(o,this._baseIndex+o,this)),n[o]=o;this.storeBuffer.writeVisibilityRange(this._baseIndex,s,1),this.items=i,this._dirtyIndices=n,this._dirtyCount=s,this.isUserBatch=!0,e.instanceData&&(this.instanceStoreBuffer=new Vp(e.instanceData,this._baseIndex,s))}this.writeBatchWorldMatrix(Bc)}writeBatchWorldMatrix(e){const t=this._batchWorldMatrixIndex,s=this.storeBuffer.fl64Data,r=e.elements64,i=t*12;s[i]=r[0],s[i+1]=r[1],s[i+2]=r[2],s[i+3]=r[3],s[i+4]=r[4],s[i+5]=r[5],s[i+6]=r[6],s[i+7]=r[7],this.storeBuffer.markDirty(t)}setMatrixAt(e,t){const s=this._baseIndex+e,r=this.storeBuffer.fl64Data,i=t.elements64,n=s*12;r[n]=i[0],r[n+1]=i[1],r[n+2]=i[2],r[n+3]=i[3],r[n+4]=i[4],r[n+5]=i[5],r[n+6]=i[6],r[n+7]=i[7],this.storeBuffer.markDirty(s),this._writeSlotSphere(e)}_writeSlotSphere(e){const t=this.storeBuffer;if(!t.writesSpheres)return;const s=this.items[e].geometry;if(s===void 0)return;const r=this._baseIndex+e;t.writeBoundingSphere(r,t.data,r*24,s,0)}get matrices(){return this._matrices??=new Pp(this,this._baseIndex)}get instanceData(){if(this._instanceData)return this._instanceData;const e=this.instanceStoreBuffer;if(!e)throw new Error("instanceData: this batch has no instance data. Declare the fields in the instanceData option.");return this._instanceData=new Sp(e,this._baseIndex,this.items.length)}setInstanceDataAt(e,t,s,r,i,n){const o=this.instanceStoreBuffer,a=o?.layout.offsets[t];if(!o||a===void 0){const d=o?`It declares: ${Object.keys(o.layout.offsets).join(", ")}.`:"It declares none.";throw new Error(`setInstanceDataAt: this batch has no instanceData field "${t}". ${d}`)}const{layout:c}=o,l=this._baseIndex+e,u=l*c.stride+a,h=c.struct[t]==="vec4<f32>"?o.data:o.u32Data;h[u]=s,h[u+1]=r,h[u+2]=i,h[u+3]=n,o.markDirty(l)}setGeometryAt(e,t){const s=this.items[e];s.geometry=t,this._writeSlotSphere(e),s._batchDirty||(s._batchDirty=!0,this._dirtyIndices[this._dirtyCount++]=e)}setMaterialAt(e,t){const s=this.items[e];if(s.material=t,s._lastDescriptorDirtyId=-1,s._batchDirty||(s._batchDirty=!0,this._dirtyIndices[this._dirtyCount++]=e),t._materialIndex!==-1){const r=this._baseIndex+e;this.storeBuffer.u32Data[r*24+17]=t._materialIndex,this.storeBuffer.markDirty(r)}}invalidate(e){const t=this.items[e];t._batchDirty||(t._batchDirty=!0,this._dirtyIndices&&(this._dirtyIndices[this._dirtyCount++]=e))}setVisibleAt(e,t){const s=this.items[e],r=t?1:0;s._worldVisible!==r&&(s._worldVisible=r,this.storeBuffer.writeVisibility(this._baseIndex+e,r),this._visibilityDirtyId++)}getVisibleAt(e){return this.items[e]._worldVisible===1}setPassesAt(e,t){const s=this.items[e],r=s._lastRenderPass,i=t&~r,n=r&~t;let o=n;for(;o;){const a=o&-o,c=this.drawLists[a];c.remove(s),c.view.count===0&&(c.drawDirtyId++,c.commandList.releaseCaptures()),o^=a}for(o=i;o;){const a=o&-o;let c=this.drawLists[a];c||(c=this.drawLists[a]=new Up({items:this.items,label:`pass_${a}`,bit:a})),c.add(s,e),o^=a}s._lastRenderPass=t,i|n&&(this._editsPending=!0),i&&!s._batchDirty&&(s._batchDirty=!0,this._dirtyIndices&&(this._dirtyIndices[this._dirtyCount++]=e))}get cull(){return this._cull}set cull(e){e!==this._cull&&(this._cull=e,this._visibilityDirtyId++,this.storeBuffer.writesSpheres&&this.storeBuffer.enableSphereWrites(!1))}_ensureSpheres(){const e=this.storeBuffer;e.writesSpheres||(e.enableSphereWrites(!0),this._sweepSpheres())}_sweepSpheres(){if(this.destroyed)return;const e=this.storeBuffer,t=e.data,s=this.items;for(let r=0;r<s.length;r++){const i=s[r];if(i===null)continue;const n=i._storeIndex,o=i.geometry;n<0||o===void 0||e.writeBoundingSphere(n,t,n*24,o,i._morph?o._morphBoundsExpansion:0)}}applyEdits(){if(this._editsPending){this._editsPending=!1;for(const e in this.drawLists)this.drawLists[e].applyEdits()}}invalidateDrawCaches(){for(const e in this.drawLists)this.drawLists[e].drawDirtyId++}invalidateBundleCaches(){for(const e in this.drawLists)this.drawLists[e].gpuData.bundleDirtyId++}unload(){if(!this.destroyed){this.storeBuffer.unload(),this.instanceStoreBuffer?.unload();for(const e in this.drawLists)this.drawLists[e].unload()}}destroy(){if(!this.destroyed){this.destroyed=!0,this.storeBuffer.destroy(),this.instanceStoreBuffer?.destroy(),this.instanceStoreBuffer=null;for(const e in this.drawLists)this.drawLists[e].destroy();if(this.drawLists=null,this.isUserBatch)for(const e of this.items)e.destroy();this._dirtyIndices=null,this._matrices?.destroy(),this._matrices=null,this._instanceData?.destroy(),this._instanceData=null}}};const Zn={atlas:null,indexCount:void 0,firstIndex:void 0,baseVertex:void 0};var Kp=class{_materialSystem;constructor(e){this._materialSystem=e}render(e){const{renderables:t,globalBindGroup:s,commandList:r,drawData:i,passBit:n,bindsMaterial:o,batch:a,view3d:c}=e,l=t.count;if(l===0)return;r.clear();const u=t.indices,h=t.items,d=this._materialSystem;let f=h[u[0]],p=f._passCache[n],m=f.geometry._geometryAtlasAllocation||Zn,_=p.batchKey,g=m.atlas?m.atlas.geometry:f.geometry,b=p.shader,y=ss(_,p.state),v=p.topology,x=f.material,w=0,T=0,B=0,S=x,C=!1;o&&r.captureMaterialTextures(x);for(let D=1;D<l;D++){f=h[u[D]],p=f._passCache[n];const I=p.batchKey,M=f.material,P=I!==_;if(!P&&(!o||M===x))continue;const A=!P&&x._textureSetId===M._textureSetId;if(A){if(C){x=M;continue}if(r.count-B+2>16){r.count=B,w=T,C=!0,b=d.ensureMergedShader(h[u[T]],a,c),x=M;continue}}const z=r.next();z.geometry=g,z.shader=b,z.globalBindGroup=s,z.batchBindGroup=o?C?S._getMergedBindGroup():x._getBindGroup():void 0,z.state=y,z.topology=v,z.batchKey=_,z.textureSetId=o?S._textureSetId:0,z.merged=o&&C,r.captureGeometry(g);const k=(r.count-1)*5,O=i.ensureCapacity(r.count);O[k]=m.indexCount??(g.indexCount||g.indexBuffer.data.length),O[k+1]=D-w,O[k+2]=m.firstIndex||0,O[k+3]=m.baseVertex||0,O[k+4]=w,w=D;const U=M!==x;x=M,A||(P&&(m=f.geometry._geometryAtlasAllocation||Zn,_=I,g=m.atlas?m.atlas.geometry:f.geometry,y=ss(I,p.state),v=p.topology),b=p.shader,T=D,B=r.count,S=M,C=!1),o&&U&&(A?r.refreshMaterialBindings(M):r.captureMaterialTextures(M))}{const D=r.next();D.geometry=g,D.shader=b,D.globalBindGroup=s,D.batchBindGroup=o?C?S._getMergedBindGroup():x._getBindGroup():void 0,D.state=y,D.topology=v,D.batchKey=_,D.textureSetId=o?S._textureSetId:0,D.merged=o&&C,r.captureGeometry(g);const I=(r.count-1)*5,M=i.ensureCapacity(r.count);M[I]=m.indexCount??(g.indexCount||g.indexBuffer.data.length),M[I+1]=l-w,M[I+2]=m.firstIndex||0,M[I+3]=m.baseVertex||0,M[I+4]=w}r.endBuild()}},Yp=class{data;_buffer=null;_bufferResource=null;_boneCount=0;_tick=0;bufferVersion=0;_texture=null;_textureSource=null;_retiredBuffers=[];_slotWorldIds=[];_addCount=0;_changed=!1;constructor(e={}){const t=e.initialBoneCapacity??256;this.data=new Float32Array(se(t*12))}get buffer(){return this._buffer??=new ct({data:this.data,usage:G.STORAGE|G.COPY_DST|G.COPY_SRC,label:"BonePit",shrinkToFit:!1})}get bufferResource(){return this._bufferResource??=new ze({buffer:this.buffer})}get texture(){return this._texture||this._initTexture()}_initTexture(){const{width:e,height:t}=ns(this.data.length);return this._textureSource=new Ae({resource:this.data,width:e,height:t,format:"rgba32float",scaleMode:"nearest",alphaMode:"no-premultiply-alpha"}),this._texture=new L({source:this._textureSource}),this._texture}clear(){this._boneCount=0,this._addCount=0,this._tick++}add(e){if(e._bonePitTick===this._tick)return e._bonePitIndex;e._bonePitTick=this._tick;const t=this._boneCount,s=this._addCount++;return this._boneCount+=e.jointCount,e._bonePitIndex=t,!this._changed&&this._slotWorldIds[s]===e._worldId||(this._changed=!0,this._slotWorldIds[s]=e._worldId,this._ensureCapacity(this._boneCount),this.data.set(e.worldMatrix,t*12)),t}update(){if(this._slotWorldIds.length!==this._addCount&&(this._slotWorldIds.length=this._addCount),!this._changed||(this._changed=!1,this._boneCount===0))return;const e=this._boneCount*12;this._buffer?.update(e*4,0),this._textureSource&&Ce(this._textureSource,0,e)}_ensureCapacity(e){const t=e*12;if(t<=this.data.length)return;let s=this.data.length;for(;s<t;)s*=2;s=se(s);const r=new Float32Array(s);if(r.set(this.data),this.data=r,this._buffer&&(this._retiredBuffers.push(this._buffer),this._buffer=null,this._bufferResource=null),this.bufferVersion++,this._textureSource){const{width:i,height:n}=ns(this.data.length);this._textureSource.resource=this.data,(this._textureSource.width!==i||this._textureSource.height!==n)&&this._textureSource.resize(i,n),this._textureSource.update()}}_freeRetired(){for(let e=0;e<this._retiredBuffers.length;e++)this._retiredBuffers[e].destroy();this._retiredBuffers.length=0}unload(){this.data&&(this._buffer?.unload(),this._textureSource?.unload(),this._freeRetired())}destroy(){this.data&&(this._bufferResource?.destroy(!1),this._buffer?.destroy(),this._freeRetired(),this._texture?.destroy(!0),this.data=null,this._slotWorldIds=null,this._buffer=null,this._bufferResource=null,this._texture=null,this._textureSource=null)}};const de=new ze({buffer:new ct({data:new Int32Array(1),usage:G.STORAGE|G.COPY_DST|G.COPY_SRC,label:"EmptyBufferResource",shrinkToFit:!1})}),Xp=(e,t,s,r,i)=>{const{center:n,radius:o}=e.boundsSphere;if(t[i]=n.x,t[i+1]=n.y,t[i+2]=n.z,t[i+3]=e.dynamic?-1:o+e._morphBoundsExpansion,e.morphTargetCount>0){const a=e._morphDeltaBase>=0;s[i+4]=a?e._morphDeltaBase:0,s[i+5]=a?e.morphTargetCount:0,s[i+6]=a&&e._geometryAtlasAllocation?.baseVertex||0}};var Mc=class extends Oi{constructor(e=100){super({stride:8,indexKey:"_geometryDataIndex",copier:Xp,initialSize:e})}set(e){const t=e._geometryDataStore;return t!==this&&(t?.remove(e),e._geometryDataStore=this),super.set(e)}},Zp=class extends Cc{drawCallsBuffer;constructor(e="DrawCalls",t=128){super(t),this.drawCallsBuffer=new ct({data:this.drawCalls,usage:G.INDIRECT|G.STORAGE|G.COPY_DST|G.COPY_SRC,label:e,shrinkToFit:!1})}ensureCapacity(e){const t=this.drawCalls,s=super.ensureCapacity(e);return s!==t&&(this.drawCallsBuffer.data=s),s}upload(e){this.drawCallsBuffer.update(e*5*4)}copyCommandsFrom(e,t){this.ensureCapacity(t).set(e.drawCalls.subarray(0,t*5)),this.upload(t)}unload(){this.drawCallsBuffer?.unload()}destroy(){this.drawCallsBuffer&&(this.drawCallsBuffer.destroy(),this.drawCallsBuffer=null,super.destroy())}},Qp=class extends ze{constructor(e){super(e),this.buffer.off("change",this.onBufferChange,this)}};const Jp=1024,Wr=16;function tm(e,t){let s=e,r=t;for(;r;)[s,r]=[r,s%r];return e/s*t}var Pc=class{data;_retiredTextures=[];texture;_buffer=null;_retiredBuffers=[];_alignment=0;_texelsPerUnit=0;_end=0;_freePlaces=new Map;_dirtyQueue=[];_dirtyCount=0;_ranges=new Uint32Array(64);bufferVersion=0;_bufferCallBytes=0;constructor(e){const{alignment:t,rendererType:s}=e;if(!(t>0))throw new Error(`MaterialDataStoreBuffer: renderer.limits.minUniformBufferOffsetAlignment is ${t}; the limits system fills it in after the renderer has a context`);this._alignment=tm(t,Wr),this._texelsPerUnit=this._alignment/Wr,this._bufferCallBytes=s===_t.WEBGPU?Tp:1/0,this.data=new Float32Array(se(Jp*4)),this.texture=new L({source:pi(this.data)})}enqueueDirty(e){!this.data||e._storeQueued||(e._storeQueued=!0,this._dirtyQueue[this._dirtyCount++]=e)}register(e){const t=e._uploadQueue;t===this&&e._materialIndex!==-1||(t&&t!==this&&t.remove(e),e._uploadQueue=this,e._storeQueued=!1,this._allocate(e),this.enqueueDirty(e))}remove(e){const t=e._materialIndex;if(t<0||(e._materialIndex=-1,!this.data))return;const s=this._units(e);let r=this._freePlaces.get(s);r||this._freePlaces.set(s,r=[]),r.push(t)}uniformResource(e){const t=this._buffer??=new ct({data:this.data,usage:G.UNIFORM|G.COPY_DST,label:"MaterialStore"}),s=e._materialIndex*Wr;let r=e._uniformResource;return r&&r.buffer===t&&r.offset===s||(r?.destroy(!1),r=e._uniformResource=new Qp({buffer:t,offset:s,size:this._units(e)*this._alignment})),r}update(){const e=this._dirtyQueue,t=this._dirtyCount;if(t===0)return;this._dirtyCount=0;const s=this.data;let r=0,i=0,n=1/0,o=-1/0;for(let d=0;d<t;d++){const f=e[d];if(e[d]=null,f._uploadQueue!==this)continue;f._storeQueued=!1;const p=f.data._f32,m=f._materialIndex*4,_=m+p.length;if(s.set(p,m),r*2+2>this._ranges.length){const g=new Uint32Array(this._ranges.length*2);g.set(this._ranges),this._ranges=g}this._ranges[r*2]=m,this._ranges[r*2+1]=_,r++,i+=_-m,m<n&&(n=m),_>o&&(o=_)}if(r===0)return;const a=this._ranges,c=(o-n)*4,l=i*4,u=this.texture.source;if(r*16384+l<c)for(let d=0;d<r;d++)Ce(u,a[d*2],a[d*2+1]);else Ce(u,n,o);const h=this._buffer;if(h)if(c>=wc&&r*this._bufferCallBytes+l<c)for(let d=0;d<r;d++){const f=a[d*2];h.update((a[d*2+1]-f)*4,f*4)}else h.update(c,n*4)}destroy(){if(this.data){this._buffer?.destroy();for(let e=0;e<this._retiredBuffers.length;e++)this._retiredBuffers[e].destroy();for(let e=0;e<this._retiredTextures.length;e++)this._retiredTextures[e].destroy(!0);this.texture.destroy(!0),this.data=null,this._buffer=null,this._retiredBuffers=null,this._retiredTextures=null,this.texture=null,this._freePlaces=null,this._dirtyQueue=null,this._dirtyCount=0,this._ranges=null}}_units(e){return Math.ceil(e.data._f32.byteLength/this._alignment)}_allocate(e){if(e._materialIndex>=0)return;const t=this._units(e);let s=this._freePlaces.get(t)?.pop();if(s===void 0){const r=(this._end+t)*this._alignment;r>this.data.byteLength&&this._expand(r/4),s=this._end*this._texelsPerUnit,this._end+=t}e._materialIndex=s}_expand(e){let t=this.data.length*2;t<e&&(t=e),t=se(t);const s=new Float32Array(t);s.set(this.data),this.data=s,this._retiredTextures.push(this.texture),this.texture=new L({source:pi(this.data)}),this._buffer&&(this._retiredBuffers.push(this._buffer),this._buffer=null),this.bufferVersion++}};const em=4;var Ac=class{data;_buffer=null;_bufferResource=null;bufferVersion=0;_deltaCursor=0;_deltaCapacity=0;_weightCursor=0;_freeSlots=new Map;_freeDeltaBlocks=new Map;_minDirty=1/0;_maxDirty=-1/0;_retiredBuffers=[];_texture=null;_textureSource=null;constructor(e={}){this._deltaCapacity=e.deltaCapacity??4096;const t=Jn(this._deltaCapacity,e.weightCapacity??1024);this.data=new Float32Array(this._deltaCapacity+t)}get buffer(){return this._buffer??=new ct({data:this.data,usage:G.STORAGE|G.COPY_DST|G.COPY_SRC,label:"MorphStoreBuffer",shrinkToFit:!1})}get bufferResource(){return this._bufferResource??=new ze({buffer:this.buffer})}get texture(){return this._texture||this._initTexture()}uploadDeltas(e){const t=e._morphStore;if(t===this)return;if(t){t.freeDeltas(e),V(`MorphStoreBuffer: geometry #${e.uid} was packed by another renderer and draws unmorphed here`);return}const s=e._morphTargets;if(!s||s.length===0)return;const r=e.hasMorphNormals,i=r?8:em,n=s.length,o=s[0].positions.length/3,a=o*n*i,c=this._freeDeltaBlocks.get(a);let l;c&&c.length>0?l=c.pop():(l=this._deltaCursor,l+a>this._deltaCapacity&&this._growArena(l+a),this._deltaCursor+=a);const u=new Float64Array(n),h=this.data;for(let f=0;f<o;f++){const p=f*3;for(let m=0;m<n;m++){const _=l+(f*n+m)*i,g=s[m].positions,b=g[p],y=g[p+1],v=g[p+2];h[_]=b,h[_+1]=y,h[_+2]=v,h[_+3]=0;const x=b*b+y*y+v*v;if(x>u[m]&&(u[m]=x),r){const w=s[m].normals;h[_+4]=w[p],h[_+5]=w[p+1],h[_+6]=w[p+2],h[_+7]=0}}}let d=0;for(let f=0;f<n;f++)d+=Math.sqrt(u[f]);e._morphBoundsExpansion=d,e._morphDeltaBase=l,e._morphDeltaFloats=a,e._morphStore=this,e._morphTargets=null,this._markDirty(l,l+a-1)}freeDeltas(e){const t=e._morphDeltaBase;if(t<0)return;const s=e._morphDeltaFloats;e._morphDeltaBase=-1,e._morphDeltaFloats=0,e._morphStore=null,this.data&&Qn(this._freeDeltaBlocks,s,t)}sync(e){for(let s=0;s<e.length;s++)this.uploadDeltas(e[s].geometry);const t=this._deltaCapacity;for(let s=0;s<e.length;s++){const r=e[s],i=r._morph;i._store!==this&&(i._store?.freeSlot(i),this.allocSlot(i));const n=t+i._slot;i._weightIndex!==n&&(i._weightIndex=n,r._markStoreDirty()),this.writeWeights(i)}this.update()}allocSlot(e){let t=1;for(;t<e.weights.length;)t<<=1;const s=this._freeSlots.get(t);let r;s&&s.length>0?r=s.pop():(r=this._weightCursor,this._deltaCapacity+r+t>this.data.length&&this._growWeights(r+t),this._weightCursor+=t),e._slot=r,e._slotSize=t,e._store=this}freeSlot(e){const t=e._slot;if(t<0)return;const s=e._slotSize;e._slot=-1,e._slotSize=0,e._store=null,this.data&&Qn(this._freeSlots,s,t)}writeWeights(e){const t=e.weights,s=this.data,r=this._deltaCapacity+e._slot,i=Math.min(t.length,e._slotSize);let n=!1;for(let o=0;o<i;o++){const a=t[o];s[r+o]!==a&&(s[r+o]=a,n=!0)}n&&this._markDirty(r,r+i-1)}update(){this._minDirty>this._maxDirty||(this._buffer?.update((this._maxDirty-this._minDirty+1)*4,this._minDirty*4),this._textureSource&&Ce(this._textureSource,this._minDirty,this._maxDirty+1),this._minDirty=1/0,this._maxDirty=-1/0)}_freeRetired(){for(let e=0;e<this._retiredBuffers.length;e++)this._retiredBuffers[e].destroy();this._retiredBuffers.length=0}destroy(){this.data&&(this._bufferResource?.destroy(!1),this._buffer?.destroy(),this._freeRetired(),this._texture?.destroy(!0),this._texture=null,this._textureSource=null,this.data=null,this._buffer=null,this._bufferResource=null)}_markDirty(e,t){e<this._minDirty&&(this._minDirty=e),t>this._maxDirty&&(this._maxDirty=t)}_growArena(e){let t=this._deltaCapacity;for(;t<e;)t*=2;this._reallocate(t,this.data.length-this._deltaCapacity)}_growWeights(e){let t=this.data.length-this._deltaCapacity;for(;t<e;)t*=2;this._reallocate(this._deltaCapacity,t)}_reallocate(e,t){t=Jn(e,t);const s=new Float32Array(e+t);if(s.set(this.data.subarray(0,this._deltaCursor),0),s.set(this.data.subarray(this._deltaCapacity,this._deltaCapacity+this._weightCursor),e),this.data=s,this._deltaCapacity=e,this._buffer&&(this._retiredBuffers.push(this._buffer),this._buffer=null,this._bufferResource=null),this.bufferVersion++,this._textureSource){const{width:r,height:i}=ns(this.data.length);this._textureSource.resource=this.data,(this._textureSource.width!==r||this._textureSource.height!==i)&&this._textureSource.resize(r,i),this._textureSource.update()}}_initTexture(){const{width:e,height:t}=ns(this.data.length);return this._textureSource=new Ae({resource:this.data,width:e,height:t,format:"rgba32float",scaleMode:"nearest",alphaMode:"no-premultiply-alpha"}),this._texture=new L({source:this._textureSource}),this._texture}};function Qn(e,t,s){let r=e.get(t);r||(r=[],e.set(t,r)),r.push(s)}function Jn(e,t){const s=e+t;return t+(se(s)-s)}const sm=1,rm=4294967295;var im=class{data;_source;_texture;_capacity=0;constructor(e=256){this.ensureCapacity(e)}get texture(){return this._texture}get capacity(){return this._capacity}ensureCapacity(e){if(e<=this._capacity)return;let t=Math.max(256,this._capacity);for(;t<e;)t*=2;this._capacity=t;const s=Math.min(t,xr),r=Math.ceil(t/s);if(this.data=new Uint32Array(s*r*sm).fill(rm),!this._source){this._source=new Ae({resource:this.data,width:s,height:r,format:"r32uint",scaleMode:"nearest",alphaMode:"no-premultiply-alpha",label:"InstanceIndex"}),this._texture=new L({source:this._source});return}this._source.resource=this.data,(this._source.width!==s||this._source.height!==r)&&this._source.resize(s,r)}upload(e,t){e<t&&Oa(this._source,e,t)}unload(){this._source?.unload()}destroy(){this._texture&&(this._texture.destroy(!0),this._texture=null,this._source=null,this.data=null)}},Fc=class zc{normal;constant=0;type="plane";constructor(t,s=0){this.normal=t!==void 0?t:new F(1,0,0),this.constant=s}set(t,s){return this.normal.copyFrom(t),this.constant=s,this}setComponents(t,s,r,i){return this.normal.set(t,s,r),this.constant=i,this}setFromNormalAndCoplanarPoint(t,s){return this.normal.copyFrom(t),this.constant=-(s.x*this.normal.x+s.y*this.normal.y+s.z*this.normal.z),this}copyFrom(t){return this.normal.copyFrom(t.normal),this.constant=t.constant,this}copyTo(t){return t.normal.copyFrom(this.normal),t.constant=this.constant,t}clone(){return new zc().copyFrom(this)}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}normalize(t=this){t!==this&&t.copyFrom(this);const s=1/t.normal.magnitude();return t.normal.multiplyScalar(s),t.constant*=s,t}distanceToPoint(t){return this.normal.x*t.x+this.normal.y*t.y+this.normal.z*t.z+this.constant}projectPoint(t,s){return s||=new F,s.copyFrom(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}intersectsRay(t){return t.intersectsPlane(this)}applyMatrix4(t,s=this){s!==this&&s.copyFrom(this);const r=t.elements,i=r[0],n=r[1],o=r[2],a=r[4],c=r[5],l=r[6],u=r[8],h=r[9],d=r[10],f=s.normal.x,p=s.normal.y,m=s.normal.z,_=(c*d-l*h)*f+(o*h-n*d)*p+(n*l-o*c)*m,g=(l*u-a*d)*f+(i*d-o*u)*p+(o*a-i*l)*m,b=(a*h-c*u)*f+(n*u-i*h)*p+(i*c-n*a)*m,y=1/(Math.sqrt(_*_+g*g+b*b)||1),v=_*y,x=g*y,w=b*y,T=-s.constant*f,B=-s.constant*p,S=-s.constant*m,C=i*T+a*B+u*S+r[12],D=n*T+c*B+h*S+r[13],I=o*T+l*B+d*S+r[14];return s.normal.set(v,x,w),s.constant=-(C*v+D*x+I*w),s}toString(){return`[@pixi/3d/math:Plane normal=(${this.normal.x}, ${this.normal.y}, ${this.normal.z}) constant=${this.constant}]`}},kc=class Rc{_planes;constructor(t,s,r,i,n,o){this._planes=new Float32Array(24);for(let a=0;a<24;a+=4)this._planes[a]=1;t!==void 0&&this._writePlane(0,t),s!==void 0&&this._writePlane(1,s),r!==void 0&&this._writePlane(2,r),i!==void 0&&this._writePlane(3,i),n!==void 0&&this._writePlane(4,n),o!==void 0&&this._writePlane(5,o)}get planesData(){return this._planes}set(t,s,r,i,n,o){return this._writePlane(0,t),this._writePlane(1,s),this._writePlane(2,r),this._writePlane(3,i),this._writePlane(4,n),this._writePlane(5,o),this}setFromProjectionMatrix(t){const s=t.elements,r=s[0],i=s[1],n=s[2],o=s[3],a=s[4],c=s[5],l=s[6],u=s[7],h=s[8],d=s[9],f=s[10],p=s[11],m=s[12],_=s[13],g=s[14],b=s[15],y=this._planes;return ce(y,0,o-r,u-a,p-h,b-m),ce(y,4,o+r,u+a,p+h,b+m),ce(y,8,o+i,u+c,p+d,b+_),ce(y,12,o-i,u-c,p-d,b-_),ce(y,16,o-n,u-l,p-f,b-g),ce(y,20,o+n,u+l,p+f,b+g),this}copyFrom(t){return this._planes.set(t._planes),this}copyTo(t){return t._planes.set(this._planes),t}clone(){return new Rc().copyFrom(this)}equals(t){const s=this._planes,r=t._planes;for(let i=0;i<24;i++)if(s[i]!==r[i])return!1;return!0}getPlane(t,s){s||=new Fc;const r=t*4;return s.normal.set(this._planes[r],this._planes[r+1],this._planes[r+2]),s.constant=this._planes[r+3],s}containsPoint(t){const s=this._planes,r=t.x,i=t.y,n=t.z;for(let o=0;o<24;o+=4)if(s[o]*r+s[o+1]*i+s[o+2]*n+s[o+3]<0)return!1;return!0}intersectsBox(t){const s=this._planes,r=t.min.x,i=t.min.y,n=t.min.z,o=t.max.x,a=t.max.y,c=t.max.z;for(let l=0;l<24;l+=4){const u=s[l],h=s[l+1],d=s[l+2],f=u>0?o:r,p=h>0?a:i,m=d>0?c:n;if(u*f+h*p+d*m+s[l+3]<0)return!1}return!0}intersectsSphere(t){if(t.radius<0)return!1;const s=this._planes,r=t.center.x,i=t.center.y,n=t.center.z,o=-t.radius;for(let a=0;a<24;a+=4)if(s[a]*r+s[a+1]*i+s[a+2]*n+s[a+3]<o)return!1;return!0}toString(){return"[@pixi/3d/math:Frustum]"}_writePlane(t,s){const r=t*4;this._planes[r]=s.normal.x,this._planes[r+1]=s.normal.y,this._planes[r+2]=s.normal.z,this._planes[r+3]=s.constant}};function ce(e,t,s,r,i,n){const o=1/Math.sqrt(s*s+r*r+i*i);e[t]=s*o,e[t+1]=r*o,e[t+2]=i*o,e[t+3]=n*o}const to=new F,Kr=new ls,nm={x:0,y:0};function om(e){const t=e.elements;t[1]=-t[1],t[5]=-t[5],t[9]=-t[9],t[13]=-t[13]}function am(e,t,s){const r=e.elements;r[0]+=t*r[3],r[4]+=t*r[7],r[8]+=t*r[11],r[12]+=t*r[15],r[1]+=s*r[3],r[5]+=s*r[7],r[9]+=s*r[11],r[13]+=s*r[15]}function cm(e){const t=e.elements;t[2]=.5*(t[2]+t[3]),t[6]=.5*(t[6]+t[7]),t[10]=.5*(t[10]+t[11]),t[14]=.5*(t[14]+t[15])}function eo(e,t,s,r){am(e,t.x,t.y),s&&om(e),r&&cm(e)}var Lc=class{uniformGroup;bindGroup;position=new F;view=new E;projection=new E;viewProjection=new E;previousViewProjection=new E;viewportUvScale=new ls(1,1);lightTiles=new uf;frustum;frame=new lt;_currentSession=null;_lastViewProjection=new E;_hasHistory=!1;constructor(e=new kc){this.frustum=e,this.uniformGroup=new jt({uCameraPosition:{value:this.position,type:"vec3<f32>"},uViewMatrix:{value:this.view,type:"mat4x4<f32>"},uProjectionMatrix:{value:this.projection,type:"mat4x4<f32>"},uViewProjectionMatrix:{value:this.viewProjection,type:"mat4x4<f32>"},uPreviousViewProjectionMatrix:{value:this.previousViewProjection,type:"mat4x4<f32>"},uViewportUVScale:{value:this.viewportUvScale,type:"vec2<f32>"},uLightTileTransform:{value:this.lightTiles.tileTransform,type:"vec4<f32>"},uLightTiles:{value:this.lightTiles.masks,type:"vec4<i32>",size:lc},uLightDepthMasks:{value:this.lightTiles.depthMasks,type:"vec4<i32>",size:uc},uLightDepthPlane:{value:this.lightTiles.depthPlane,type:"vec4<f32>"}}),this.uniformGroup.isStatic=!0,this.uniformGroup.ubo=!1,this.bindGroup=new gt({camera:this.uniformGroup})}set(e,t,s,r=!1,i=!1,n=nm){return this.position.copyFrom(e),this.view.copyFrom(t),this.projection.copyFrom(s),eo(this.projection,n,r,i),this.viewProjection.multiplyMatrices(this.projection,t),this.lightTiles.invalidate(),this.uniformGroup.update(),this}setViewportUvScale(e,t){return this.viewportUvScale.set(e,t),this.uniformGroup.update(),this}setViewport(e,t=!1){return this.lightTiles.setViewport(e,t)&&this.uniformGroup.update(),this}prepareLightTiles(e){this.lightTiles.prepare(e,this.viewProjection,this.view)&&this.uniformGroup.update()}syncFromCamera(e,t=!1,s=!1,r){e.worldTransform.extractPosition(to);const{x:i,y:n}=e.jitter,o=r&&r.width>0&&r.height>0;Kr.set(o?2*i/r.width:0,o?-2*n/r.height:0),this.set(to,e.view,e.projection,t,s,Kr);const a=this.previousViewProjection;return a.copyFrom(this._hasHistory?this._lastViewProjection:e.viewProjection),eo(a,Kr,t,s),this._lastViewProjection.copyFrom(e.viewProjection),this._hasHistory=!0,this}destroy(){this.lightTiles.destroy(),this._currentSession=null,this.bindGroup.destroy(),this.uniformGroup.buffer?.destroy()}};function ot(e){return e._cameraData??=new Lc(e.frustum)}function Ni(e,t){return e==="gpu"&&!t?"cpu":e}const lm={},um={forward:5e4,shadow:2e4};let so;function $i(e){const t=lm[e];return t!==void 0?t:(so??=da.apple.device||dh(),so?um[e]:0)}const $e=new Float32Array(24);function fs(e,t){const s=t[0],r=t[1],i=t[2],n=t[4],o=t[5],a=t[6],c=t[8],l=t[9],u=t[10],h=t[12],d=t[13],f=t[14];if(s===1&&o===1&&u===1&&r===0&&i===0&&n===0&&a===0&&c===0&&l===0&&h===0&&d===0&&f===0)return e;for(let p=0;p<6;p++){const m=p*4,_=e[m],g=e[m+1],b=e[m+2],y=s*_+r*g+i*b,v=n*_+o*g+a*b,x=c*_+l*g+u*b,w=1/Math.sqrt(y*y+v*v+x*x);$e[m]=y*w,$e[m+1]=v*w,$e[m+2]=x*w,$e[m+3]=(h*_+d*g+f*b+e[m+3])*w}return $e}function Ec(e,t,s,r,i){let n=!1;return s.lastAtlasBufferVersion!==e.bufferVersion&&(s.lastAtlasBufferVersion=e.bufferVersion,n=!0),s.lastMaterialStoreBufferVersion!==t.bufferVersion&&(s.lastMaterialStoreBufferVersion=t.bufferVersion,n=!0),s.lastMorphStoreBufferVersion!==r.bufferVersion&&(s.lastMorphStoreBufferVersion=r.bufferVersion,n=!0),i&&s.lastGeometryStoreBufferVersion!==i.bufferVersion&&(s.lastGeometryStoreBufferVersion=i.bufferVersion,n=!0),n}const Vc=.1,ro=new E,Gc=new E,Nt=new Float64Array(4);function hm(e,t,s,r,i){i.length=s;for(let n=1;n<=s;n++){const o=n/s,a=e*Math.pow(t/e,o),c=e+(t-e)*o;i[n-1]=r*a+(1-r)*c}return i}function dm(e,t){ro.getInverse(e.viewProjection),Gc.multiplyMatrices(t,ro)}function fm(e,t){const s=Gc.elements;let r=1/0,i=-1/0,n=0,o=0;for(let a=0;a<2;a++){const c=a===0?e:t;for(let l=-1;l<=1;l+=2)for(let u=-1;u<=1;u+=2){const h=s[0]*u+s[4]*l+s[8]*c+s[12],d=s[1]*u+s[5]*l+s[9]*c+s[13],f=s[2]*u+s[6]*l+s[10]*c+s[14],p=s[3]*u+s[7]*l+s[11]*c+s[15],m=f/p;n+=h/p,o+=d/p,m<r&&(r=m),m>i&&(i=m)}}Nt[0]=r,Nt[1]=i,Nt[2]=n*.125,Nt[3]=o*.125}function io(e,t){const s=e.projection.elements;return(s[10]*-t+s[14])/(s[11]*-t+s[15])}function Oc(e,t,s){const r=e.elements,i=1/(t-s);r[10]=i,r[14]=t*i}function ar(e,t,s){const r=2*t/s;return Math.floor(e/r)*r}function pm(e,t,s,r,i,n=!0){fm(io(e,t),io(e,s));const o=e.projection.elements,a=e.mode==="orthographic"?1:s,c=a/o[5],l=a/o[0],u=(s-t)*.5,h=Math.sqrt(l*l+c*c+u*u),d=-Nt[1]-h*Nc,f=-Nt[0],p=ar(Nt[2],h,i),m=ar(Nt[3],h,i);r.makeOrthographic(p-h,p+h,m+h,m-h,d,f),n&&Oc(r,d,f)}const no=new Q,Nc=4;function mm(e,t,s,r,i=!0){e.applyMatrix4(t,no);const{min:n,max:o}=no,a=(o.x-n.x)*.5*1.1,c=(o.y-n.y)*.5*1.1,l=ar((n.x+o.x)*.5,a,r),u=ar((n.y+o.y)*.5,c,r),h=-o.z-Math.max(a,c)*Nc,d=-n.z;s.makeOrthographic(l-a,l+a,u+c,u-c,h,d),i&&Oc(s,h,d)}const $c={low:512,medium:1024,high:2048,ultra:4096};function yi(e){return!!(e.castShadow&&e._gpuShadowData&&e._worldVisible&&e._shadowDataIndex>=0)}function gm(e){const t=e.cascades;if(t)for(let s=0;s<t.length;s++)t[s]?.cameraData.destroy();e.cullResults?.release()}function oo(e,t,s){return!s&&(e===0||e>1&&t%e!==0)}function ao(e,t){return e==="manual"?0:typeof e=="number"?e:e[t]??1}const Ft=16;function Be(e){return e.type!=="directional"||e.shadow.cascades===void 0?1:Math.min(Math.max(e.shadow.cascades,1),4)}function _m(e,t){const s=$c[e],r=new dr({width:s,height:s,format:"depth32float",scaleMode:"linear",viewDimension:"2d-array",autoGenerateMipmaps:!1,arrayLayerCount:t,compare:"less"});return new Pi({colorTextures:0,depthStencilTexture:r})}function ym(e,t,s,r){t.getInverse(e.worldTransform);const i=e.range||1e3,n=1,o=i;if(s.makePerspective(e.coneAngle*2*ft,1,n,o),r){const a=s.elements;a[10]=o/(n-o),a[14]=o*n/(n-o)}}function Uc(e,t,s){return new jt({uGlobalLightParams:{value:new Float32Array([0,0,0,0]),type:"vec4<f32>"},uTime:{value:0,type:"f32"},uFogColor:{value:new Float32Array([0,0,0]),type:"vec3<f32>"},uDisplayExposure:{value:1,type:"f32"},uFogParams:{value:new Float32Array([0,0,0]),type:"vec3<f32>"},uExposure:{value:1,type:"f32"},uHemisphereSky:{value:new Float32Array([0,0,0]),type:"vec3<f32>"},uHemisphereGround:{value:new Float32Array([0,0,0]),type:"vec3<f32>"},uHemisphereUp:{value:new Float32Array([0,1,0]),type:"vec3<f32>"},...s,uLightData:{value:e,type:"vec4<f32>",size:128},uShadowData:{value:t,type:"vec4<f32>",size:Ft*6}},{isStatic:!0,ubo:!0})}const xm={gl:{vertex:`#version 300 es
      {{header}}
      void main() {
          gl_Position = vec4(aPosition, 0.0, 1.0);
          vUv = aPosition * 0.5 + 0.5;
      }
    `,fragment:`#version 300 es
      {{header}}

      float geometrySchlickGGX(float NdotV, float roughness) {
          float a = roughness;
          float k = (a * a) / 2.0;
          return NdotV / (NdotV * (1.0 - k) + k);
      }

      float geometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
          float NdotV = max(dot(N, V), 0.0);
          float NdotL = max(dot(N, L), 0.0);
          float ggx1 = geometrySchlickGGX(NdotV, roughness);
          float ggx2 = geometrySchlickGGX(NdotL, roughness);
          return ggx1 * ggx2;
      }

      vec2 integrateBRDF(float NdotV, float roughness, uint sampleCount) {
          vec3 V = vec3(sqrt(1.0 - NdotV * NdotV), 0.0, NdotV);
          vec3 N = vec3(0.0, 0.0, 1.0);

          float A = 0.0;
          float B = 0.0;

          for(uint i = 0u; i < sampleCount; i++) {
              vec2 Xi = hammersley(i, sampleCount);
              vec3 H = importanceSampleGGX(Xi, N, roughness);
              vec3 L = normalize(2.0 * dot(V, H) * H - V);

              float NdotL = max(L.z, 0.0);
              float NdotH = max(H.z, 0.0);
              float VdotH = max(dot(V, H), 0.0);

              if(NdotL > 0.0) {
                  float G = geometrySmith(N, V, L, roughness);
                  float G_Vis = (G * VdotH) / (NdotH * NdotV);
                  float Fc = pow(1.0 - VdotH, 5.0);

                  A += (1.0 - Fc) * G_Vis;
                  B += Fc * G_Vis;
              }
          }

          return vec2(A / float(sampleCount), B / float(sampleCount));
      }

      out vec4 fragColor;

      void main() {
          float NdotV = vUv.x;
          float roughness = vUv.y;
          float clampedNdotV = max(NdotV, 0.001);
          float clampedRoughness = max(roughness, 0.01);
          
          vec2 result = integrateBRDF(clampedNdotV, clampedRoughness, uint(sampleCount));
          fragColor = vec4(result.x, result.y, 0.0, 1.0);
      }
    `}},bm={gpu:`
{{header}}

fn geometrySchlickGGX(NdotV: f32, roughness: f32) -> f32 {
   let a = roughness;
   let k = (a * a) / 2.0;
   
   return NdotV / (NdotV * (1.0 - k) + k);
}

fn geometrySmith(N: vec3<f32>, V: vec3<f32>, L: vec3<f32>, roughness: f32) -> f32 {
   let NdotV = max(dot(N, V), 0.0);
   let NdotL = max(dot(N, L), 0.0);
   let ggx1 = geometrySchlickGGX(NdotV, roughness);
   let ggx2 = geometrySchlickGGX(NdotL, roughness);
   
   return ggx1 * ggx2;
}

fn integrateBRDF(NdotV: f32, roughness: f32, sampleCount: u32) -> vec2<f32> {
   let V = vec3<f32>(sqrt(1.0 - NdotV * NdotV), 0.0, NdotV);
   let N = vec3<f32>(0.0, 0.0, 1.0);
   
   var A = 0.0;
   var B = 0.0;
   
   for (var i = 0u; i < sampleCount; i++) {
       let Xi = hammersley(i, sampleCount);
       let H = importanceSampleGGX(Xi, N, roughness);
       let L = normalize(2.0 * dot(V, H) * H - V);
       
       let NdotL = max(L.z, 0.0);
       let NdotH = max(H.z, 0.0);
       let VdotH = max(dot(V, H), 0.0);
       
       if NdotL > 0.0 {
           let G = geometrySmith(N, V, L, roughness);
           let G_Vis = (G * VdotH) / (NdotH * NdotV);
           let Fc = pow(1.0 - VdotH, 5.0);
           
           A += (1.0 - Fc) * G_Vis;
           B += Fc * G_Vis;
       }
   }
   
   A = A / f32(sampleCount);
   B = B / f32(sampleCount);
   
   return vec2<f32>(A, B);
}

@vertex
fn mainVertex(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4<f32>(input.aPosition, 0.0, 1.0);
  output.vUv = vec2<f32>(input.aPosition.x * 0.5 + 0.5, -input.aPosition.y * 0.5 + 0.5);
  return output;
}

@fragment
fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
   let NdotV = input.vUv.x;
   let roughness = input.vUv.y;
   
   let clampedNdotV = max(NdotV, 0.001);
   
   let clampedRoughness = max(roughness, 0.01);
   
   let result = integrateBRDF(clampedNdotV, clampedRoughness, u32(local.sampleCount));
   
   return vec4<f32>(result.x, result.y, 0.0, 1.0);
}
`},vm={bindGroups:["local"],gpu:bm.gpu,gl:xm.gl};function Hc(e){const{renderer:t}=e,s=e.size??256,r=e.sampleCount??1024,i={name:"brdfLut",requires:[yc],attributes:{aPosition:"float32x2"},interStage:{vUv:"vec2<f32>"},bindings:{local:{sampleCount:"f32"}}},n=new gt({local:new jt({sampleCount:{value:r,type:"f32"}})}),o=t.material3d.compileIsolatedShader([i],vm,{0:n}),a=fh.create({width:s,height:s,format:"rg16float"}).source,c=new L({source:a}),l=ds(),u=t.renderTarget.renderTarget?t.renderTarget.getBindState():null;return t.renderTarget.bind({target:a,clear:!0}),t.encoder.draw({geometry:l,shader:o,state:zt.default2d}),u&&t.renderTarget.bind(u),n.destroy(),o.destroy(),c}const co=.01,lo=e=>e>0?e*e:0,uo=e=>{const t=e>co?e:co,s=t*t;return s*s},ho=(e,t,s)=>{const r=-s[8],i=-s[9],n=-s[10],o=1/Math.sqrt(r*r+i*i+n*n);e[t+8]=r*o,e[t+9]=i*o,e[t+10]=n*o},wm=(e,t,s)=>{const r=e.worldTransform.elements;if(t[s]=r[12],t[s+1]=r[13],t[s+2]=r[14],At(t,s+4,e.color,e.intensity),e.type==="directional")t[s+3]=0,t[s+7]=0,ho(t,s,r);else if(e.type==="point"){t[s+3]=1;const i=e;t[s+7]=lo(i.range),t[s+15]=uo(i.radius)}else if(e.type==="spot"){t[s+3]=2;const i=e;t[s+7]=lo(i.range),t[s+15]=uo(i.radius),ho(t,s,r);const n=i.coneAngle*ft;t[s+11]=Math.cos(n),t[s+12]=Math.cos(n*(1-i.penumbra))}t[s+13]=e._shadowDataIndex,t[s+14]=Be(e)};var Sm=class{data=new Float32Array(512);_count=0;get count(){return this._count}reset(){this._count=0}add(e){wm(e,this.data,this._count*16),this._count++}};const Tm=new lt,Yr={x:0,y:0,width:0,height:0};function Bs(e){return e+.5|0}function jc(e,t,s,r,i,n,o){let a=Bs((e.x-s)*t),c=Bs((e.y-r)*t),l=Bs(e.width*t),u=Bs(e.height*t);return a<0&&(l+=a,a=0),c<0&&(u+=c,c=0),a>i.width-1&&(a=i.width-1),c>i.height-1&&(c=i.height-1),l>i.width-a&&(l=i.width-a),u>i.height-c&&(u=i.height-c),l<1&&(l=1),u<1&&(u=1),n&&(c=i.height-u-c),o.x=i.x+a,o.y=i.y+c,o.width=l,o.height=u,o}function Cm(e,t,s,r){const i=t.colorTexture.source;Yr.width=i.pixelWidth,Yr.height=i.pixelHeight;const n=s.type===_t.WEBGL&&t.isRoot;return jc(e,i.resolution,0,0,Yr,n,r)}function qc(e,t,s,r){const i=ot(e).frame;if(i.width<=0||i.height<=0)return null;const n=e.renderTexture!==null,o=n?1:r,a=ot(t.view3d.camera).frame;return jc(i,o,n?0:a.x,n?0:a.y,s,!n&&t.renderer.type===_t.WEBGL&&t.defaultTarget.isRoot,Tm)}const fo=new E,po=new E,mo=new E,Ue=new lt,Vt=new lt,Xr=new ls,be=new lt,$t=new fr,Lt=new ph;function Dm(e,t,s){const{width:r,height:i}=e,{x:n,y:o}=e.anchor,{x:a,y:c,width:l,height:u}=t.viewport;be.set((a-n)*r,(c-o)*i,l*r,u*i),$t.copyFrom(e.worldTransform),$t.tx-=s.x,$t.ty-=s.y}function Wc(e,t,s,r){return Lt.clear(),Lt.addFrame(e.x,e.y,e.x+e.width,e.y+e.height,t),r.x=Lt.minX,r.y=Lt.minY,r.width=Lt.maxX-Lt.minX,r.height=Lt.maxY-Lt.minY,r.fit(s)}function Bm(e){const t=e.clippingPlane;if(!t)return;const s=e.projection.elements,{x:r,y:i,z:n}=t.normal,o=t.constant,a=(Math.sign(r)+s[8])/s[0],c=(Math.sign(i)+s[9])/s[5],l=-1,u=(1+s[10])/s[14],h=2/(r*a+i*c+n*l+o*u);s[2]=r*h,s[6]=i*h,s[10]=n*h+1,s[14]=o*h}function Kc(e,t,s,r){e.view.getInverse(e.worldTransform),e.computeProjection(t.width/t.height,e.projection);const{x:i,y:n,width:o,height:a}=t,{a:c,b:l,c:u,d:h,tx:d,ty:f}=s,{x:p,y:m,width:_,height:g}=r;fo.set(o/2,0,0,i+o/2,0,-a/2,0,n+a/2,0,0,1,0,0,0,0,1),po.set(c,u,0,d,l,h,0,f,0,0,1,0,0,0,0,1),mo.set(2/_,0,0,-(2*p)/_-1,0,-2/g,0,2*m/g+1,0,0,1,0,0,0,0,1),e.projection.premultiply(mo.multiply(po).multiply(fo)),Bm(e),e.viewProjection.multiplyMatrices(e.projection,e.view),e.frustum.setFromProjectionMatrix(e.viewProjection)}function Im(e,t,s,r){Dm(e,t,r);const i=Wc(be,$t,s,ot(t).frame);if(!(i.width<=0||i.height<=0))return Kc(t,be,$t,i),i}function Mm(e,t,s){const{x:r,y:i,width:n,height:o}=e.viewport;be.set(r*t,i*s,n*t,o*s),$t.identity(),Vt.set(0,0,t,s);const a=Wc(be,$t,Vt,ot(e).frame);if(!(a.width<=0||a.height<=0))return Kc(e,be,$t,a),a}function Yc(e,t){const s=ot(e);if(s._currentSession===t)return;s._currentSession=t;const{view3d:r,renderer:i}=t;if(e.view3d!==r)throw new Error("A render pass camera must live in the View3D it draws from. Add it to the view first, e.g. `view.root.addChild(camera)`.");const n=i.type===_t.WEBGPU,o=e.renderTexture;if(o){const{frame:u,source:h}=o,d=Math.round(u.width*h.resolution),f=Math.round(u.height*h.resolution);Mm(e,d,f),s.setViewportUvScale(1,1),Vt.set(0,0,d,f)}else Ue.x=0,Ue.y=0,Ue.width=t.defaultTarget.width,Ue.height=t.defaultTarget.height,Im(r,e,Ue,i.globalUniforms.globalUniformData.offset),e===r.camera&&Cm(s.frame,t.defaultTarget,i,t.viewport),r._graph.sceneViewport(t,Vt),r._graph.setViewportUvScale(Vt.width,Vt.height,Xr),s.setViewportUvScale(Xr.x,Xr.y);const a=e===r.camera?Vt:qc(e,t,Vt,r._graph.resolution);n&&a&&s.setViewport(a,!0);const c=o?i.renderTarget.getRenderTarget(o):t.defaultTarget,l=i.renderTarget.isFrontFaceInverted(c,t.defaultTarget.flipY);s.syncFromCamera(e,l,n,a)}function go(e,t){const s=ot(e);s.prepareLightTiles(t);const{renderer:r}=t;r.type===_t.WEBGPU&&r.ubo.updateUniformGroup(s.uniformGroup)}const _o={r8unorm:[1,1],r8uint:[1,1],r8sint:[1,1],rg8unorm:[2,1],rg8uint:[2,1],rg8sint:[2,1],rgba8unorm:[8,1],"rgba8unorm-srgb":[8,1],rgba8uint:[4,1],rgba8sint:[4,1],bgra8unorm:[8,1],"bgra8unorm-srgb":[8,1],r16uint:[2,2],r16sint:[2,2],r16float:[2,2],rg16uint:[4,2],rg16sint:[4,2],rg16float:[4,2],rgba16uint:[8,2],rgba16sint:[8,2],rgba16float:[8,2],r32uint:[4,4],r32sint:[4,4],r32float:[4,4],rg32uint:[8,4],rg32sint:[8,4],rg32float:[8,4],rgba32uint:[16,4],rgba32sint:[16,4],rgba32float:[16,4],rgb10a2unorm:[8,4],rg11b10ufloat:[8,4]};function Pm(e,t,s){let r,i=1/0;if(s.type===_t.WEBGPU){const o=s.gpu.device.limits;r=o.maxColorAttachments,i=o.maxColorAttachmentBytesPerSample}else{const o=s.gl;r=Math.min(o.getParameter(o.MAX_DRAW_BUFFERS),o.getParameter(o.MAX_COLOR_ATTACHMENTS))}if(t.length>r)throw new Error(`RenderGraph: pass "${e}" attaches ${t.length} colour textures, over this GPU's limit of ${r}: ${t.map((o,a)=>o.label??`attachment ${a}`).join(", ")}. Each scene output adds one to the scene passes, so list fewer.`);let n=0;for(let o=0;o<t.length;o++){const a=_o[t[o].format];a&&(n=Math.ceil(n/a[1])*a[1]+a[0])}if(n>i){const o=t.map((a,c)=>{const{label:l,format:u}=a;return`${l??`attachment ${c}`} (${u}, ${_o[u]?.[0]??"?"} bytes)`});throw new Error(`RenderGraph: pass "${e}" needs ${n} bytes per pixel for its colour textures, over WebGPU's limit of ${i}: ${o.join(", ")}. Give scene outputs smaller formats or list fewer. rgba8unorm counts 8 bytes, the same as rgba16float; rg16float counts 4, rg8unorm 2 and r8unorm 1.`)}}var Am=class{_graph;_current=null;_targetColor;_targetDepth;constructor(e){this._graph=e}get targetColor(){return this._mustBeInSetup("targetColor"),this._targetColor}get targetDepth(){return this._mustBeInSetup("targetDepth"),this._targetDepth}get defaultColor(){return this._graph.defaultColor}get defaultDepth(){return this._graph.defaultDepth}getSceneOutput(e){return this._graph.getSceneOutput(e)}writeColor(e){return this._mustBeInSetup("writeColor").accesses.push({handle:e,mode:"write_attachment"}),e}writeDepth(e){return this._mustBeInSetup("writeDepth").accesses.push({handle:e,mode:"write_attachment"}),e}produce(e){return this._mustBeInSetup("produce").accesses.push({handle:e,mode:"produce"}),e}readDepthAttachment(e){return this._mustBeInSetup("readDepthAttachment").accesses.push({handle:e,mode:"read_attachment"}),e}get globalTextureBindings(){return this._graph.globalTextureBindings}sample(e,t){const s=this._mustBeInSetup("sample");if(t.styleSlot!==void 0&&e._kind==="depth")throw new Error("PassBuilder.sample: a depth handle binds as a depth view, which has no sampler to bind beside it");return s.accesses.push({handle:e,mode:"sample",binding:t}),e}read(e){return this._mustBeInSetup("read").accesses.push({handle:e,mode:"read"}),e}sideEffect(){this._mustBeInSetup("sideEffect").hasSideEffect=!0}createColor(e={}){return this._mustBeInSetup("createColor"),this._graph.createColor(e)}createDepth(e={}){return this._mustBeInSetup("createDepth"),this._graph.createDepth(e)}_beginPass(e,t){if(this._current=e,t?.renderTexture){const s=this._graph._cameraTarget(t);this._targetColor=s.color,this._targetDepth=s.depth}else this._targetColor=this._graph.sceneColor,this._targetDepth=this._graph.sceneDepth}_endPass(){this._current=null}_mustBeInSetup(e){if(!this._current)throw new Error(`PassBuilder.${e}: called outside a pass.setup()`);return this._current}},Fm=class{_targets=Object.create(null);_ownedKeys=new Set;get(e){const t=this._renderTargetKey(e);return this._targets[t]||(this._targets[t]=this._createRenderTarget(e),this._ownedKeys.add(t)),this._targets[t]}addToCache(e,t){const s=this._renderTargetKey(e);this._targets[s]=t,this._ownedKeys.delete(s)}reset(){this._releaseOwned();for(const e in this._targets)delete this._targets[e]}destroy(){this.reset()}_releaseOwned(){for(const e of this._ownedKeys)this._targets[e].destroy();this._ownedKeys.clear()}_createRenderTarget(e){const t={colorAttachments:[]};if(e.colors)for(let s=0;s<e.colors.length;s++)t.colorAttachments[s]={texture:e.colors[s].texture,storeOp:"store"};if(t.colorAttachments.length===0&&!e.depth)throw new Error("RenderTargetCache: cannot build a render target with no color or depth attachment");return e.depth&&(t.depthStencilAttachment={texture:e.depth.texture,depthReadOnly:e.depthReadOnly}),new Pi(t)}_renderTargetKey(e){const t=[];if(e.colors)for(let s=0;s<e.colors.length;s++)t.push(e.colors[s].texture.uid);return e.depth&&t.push(`depth${e.depth.texture.uid}${e.depthReadOnly?"_ro":""}`),t.join("_")}};const Is="depth24plus-stencil8",zm=new lt,km={target:null,flipY:!1,frame:null},Zr={},Qr=[{texture:L.EMPTY.source}],Jr={texture:L.EMPTY.source},Ms={target:null,viewport:new lt,colorSource:null,depthSource:null};function ti(e,t,s){return s.x=Math.round(e.x*t),s.y=Math.round(e.y*t),s.width=Math.max(1,Math.round(e.width*t)),s.height=Math.max(1,Math.round(e.height*t)),s}var Rm=class{_resources=[];_passes=[];_builder;_renderTargetCache=new Fm;_defaultCacheKey={colors:[{texture:L.EMPTY.source}],depth:{texture:L.EMPTY.source}};_defaultCacheKeyReadOnlyDepth={colors:this._defaultCacheKey.colors,depth:this._defaultCacheKey.depth,depthReadOnly:!0};_cameraTargets=new Map;_sceneDrawTarget=null;_camerasSeen=new Set;_cameraTargetColors=new Set;sceneColor;get sceneIsLinear(){const e=this._sceneColorOptions?.format;return e!==void 0&&or(e)}sceneDepth;sceneOutputs;resolution=1;_sceneOutputsByName=new Map;_clearValueById=Object.create(null);_sceneColorOptions;defaultColor;defaultDepth;_lastColorUid=-1;_lastDepthUid=-1;_lastWidth=-1;_lastHeight=-1;_activePasses=[];_acquireAt=[];_releaseAt=[];_firstUseByResId=new Int32Array(0);_lastUseByResId=new Int32Array(0);_firstWriterByResId=new Int32Array(0);_lastWriterByResId=new Int32Array(0);_lastWrittenHandleByResId=[];_depthResolveByResId=[];_depthResolvedAtByResId=new Int32Array(0);_resolveTick=0;_limitsChecked=!1;_resolveCandidates=[];_resolveStack=[];_savedBind;_bindOptions={target:null,clear:dt.NONE,frame:void 0,flipY:!1};_destroyed=!1;globalTextureBindings;constructor(e){this.globalTextureBindings=e.globalTextureBindings,this.defaultColor=this.importColor(e.defaultColor),this.defaultDepth=this.importDepth(e.defaultDepth);const t=e.sceneColor;if(this.sceneColor=t?this.createColor(t):this.defaultColor,this.sceneDepth=e.sceneDepth?this.createDepth(e.sceneDepth):this.defaultDepth,this._sceneColorOptions=t??null,this.sceneOutputs=e.sceneOutputs??[],this.sceneOutputs.length>0){if(!t)throw new Error("RenderGraph: sceneOutputs need a sceneColor. The scene passes attach each output beside the scene colour, and the screen can't hold extra attachments, so give the graph a `sceneColor` and `sceneDepth`, as createDefaultGraph3D does whenever a pass requires an output.");for(const s of this.sceneOutputs){Ia(s);const r=this.createColor({width:t.width,height:t.height,antialias:t.antialias,format:s.format,scaleMode:s.format.includes("int")?"nearest":void 0,label:s.name});this._sceneOutputsByName.set(s.name,{output:s,color:r}),s.clearValue&&(this._clearValueById[r._id]=s.clearValue)}}this._builder=new Am(this)}getSceneOutput(e){const t=this._sceneOutputsByName.get(e.name);if(!t)throw new Error(`RenderGraph.getSceneOutput: this graph doesn't attach '${e.name}'. List it in the pass's \`requiredOutputs\`, so the view attaches it. A custom graph builder forwards \`options.passes\` to createDefaultGraph3D, or gives the output to its RenderGraph's \`sceneOutputs\` option.`);return t.color}hasSceneOutput(e){const t=this._sceneOutputsByName.get(e.name);return t!==void 0&&Ma(t.output,e)}importColor(e){return this._importResource("color",e)}importDepth(e){return this._importResource("depth",e)}createColor(e={}){const t=e.format??this._sceneColorOptions?.format;return this._createTransient("color",this._describe("color",{...e,format:t}))}createDepth(e={}){return this._createTransient("depth",this._describe("depth",e))}_cameraTarget(e){if(!e.renderTexture)throw new Error("RenderGraph._cameraTarget: this camera has no renderTexture.");let t=this._cameraTargets.get(e);if(t)return t;const s={width:0,height:0,format:this._cameraTargetFormat(e),label:"cameraTarget"},r={width:0,height:0,format:Is,label:"cameraTargetDepth"},i=n=>{const{frame:o,source:a}=e.renderTexture;return n.width=Math.max(1,Math.round(o.width*a.resolution)),n.height=Math.max(1,Math.round(o.height*a.resolution)),n};return t={color:this._createTransient("color",()=>(s.format=this._cameraTargetFormat(e),s.antialias=e.renderTexture.source.antialias,i(s))),depth:this._createTransient("depth",()=>(r.antialias=e.renderTexture.source.antialias,i(r))),texture:this._importResource("color",()=>e.renderTexture),draw:null},this._cameraTargetColors.add(t.color._id),this._cameraTargets.set(e,t),t}_cameraTargetFormat(e){return this.sceneIsLinear?this._sceneColorOptions.format:e.renderTexture.source.format}_drawTarget(e,t){const s=e?.renderTexture?this._cameraTarget(e):null,r=this._resources[(s?.color??this.sceneColor)._id],i=this._resources[(s?.depth??this.sceneDepth)._id],n=this._liveSource(r,t),o=this._liveSource(i,t);let a=s?s.draw:this._sceneDrawTarget;if(a===null||a.colorSource!==n||a.depthSource!==o){n&&(Qr[0].texture=n),o&&(Jr.texture=o),Zr.colors=n?Qr:void 0,Zr.depth=o?Jr:void 0;const l=this._renderTargetCache.get(Zr);Qr[0].texture=L.EMPTY.source,Jr.texture=L.EMPTY.source,a===null?(a={target:l,viewport:new lt,colorSource:n,depthSource:o},s?s.draw=a:this._sceneDrawTarget=a):(a.target=l,a.colorSource=n,a.depthSource=o)}const c=(r.kind==="transient"?r.texture:null)??(i.kind==="transient"?i.texture:null);return c?ti(c.frame,c.source.resolution,a.viewport):a.viewport.copyFrom(t.viewport),a}get passes(){const e=[];for(let t=0;t<this._passes.length;t++)e.push(this._passes[t].pass);return e}setViewportUvScale(e,t,s){const r=Qe.getOptimalSize(e,t);s.x=e/r.width,s.y=t/r.height}sceneViewport(e,t){const s=this._sceneColorOptions;return s?(t.x=0,t.y=0,this._contentSize(s,this.resolution,e,t)):t.copyFrom(e.viewport)}_contentSize(e,t,s,r){const i=s.defaultTarget.colorTexture.source.resolution,n=e.width??s.viewport.width/i,o=e.height??s.viewport.height/i;return r.width=Math.max(1,Math.round(n*t)),r.height=Math.max(1,Math.round(o*t)),r}_describe(e,t){const s=e==="depth",r=t.scaleMode??(s?"nearest":void 0),i={width:0,height:0,format:Is,autoGenerateMipmaps:t.autoGenerateMipmaps??!1,label:t.label??(s?"depthTransient":"colorTransient")};return r&&(i.scaleMode=r),t.antialias&&(i.antialias=!0),n=>{const o=typeof t.resolution=="number"?t.resolution:this.resolution;return this._contentSize(t,o,n,i),i.format=t.format??(s?Is:n.defaultTarget.colorTexture.source.format??"bgra8unorm"),i}}addPass(e){const t={accesses:[],hasSideEffect:!1};this._passes.push({pass:e,record:t,dependsOn:[],isAnchored:!1,attachments:null,colorHandles:[],depthHandle:null,sampleAccesses:[],lastSampleSourceUids:[],cachedTarget:null,candidateTick:0,neededTick:0,copyCameras:[],finishedColors:[],depthResolves:[],resolvesColor:!1}),this._builder._beginPass(t,e.camera);try{e.setup(this._builder)}finally{this._builder._endPass()}return e}compile(){this._limitsChecked=!1;for(let r=0;r<this._passes.length;r++){const i=this._passes[r];i.dependsOn.length=0,i.isAnchored=i.record.hasSideEffect,i.attachments=null,i.colorHandles.length=0,i.depthHandle=null,i.sampleAccesses.length=0,i.lastSampleSourceUids.length=0,i.cachedTarget=null}const e=Object.create(null),t=Object.create(null);for(let r=0;r<this._passes.length;r++){const i=this._passes[r],n=i.record.accesses;let o=!1,a=!1;for(let l=0;l<n.length;l++){const u=n[l],h=u.handle._id;if(u.mode==="write_attachment"||u.mode==="produce"){const d=e[h]??(e[h]=[]),f=d[d.length-1];f&&f!==i&&!i.dependsOn.includes(f)&&i.dependsOn.push(f),d.push(i),(this._resources[h].kind==="imported"||this._cameraTargetColors.has(h))&&(i.isAnchored=!0)}else{for(let f=0;f<n.length;f++){const p=n[f];if(f!==l&&(p.mode==="write_attachment"||p.mode==="produce")&&p.handle._id===h)throw new Error(`RenderGraph.compile: pass "${i.pass.name}" both writes and reads (mode=${u.mode}) the same resource (id ${h}). A texture can only be one of (writable attachment) or (sampled / read-only) within a single pass.`)}const d=e[h];if(d)for(let f=0;f<d.length;f++){const p=d[f];p!==i&&!i.dependsOn.includes(p)&&i.dependsOn.push(p)}u.mode==="sample"&&(i.sampleAccesses.push(u),i.lastSampleSourceUids.push(-1),u.handle._kind==="depth"&&this._resources[h].kind==="transient"&&this._ensureDepthResolve(u.handle))}if(u.mode==="write_attachment")o=!0,u.handle._kind==="color"?i.colorHandles.push(u.handle):i.depthHandle=u.handle;else if(u.mode==="read_attachment")o=!0,i.depthHandle=u.handle,a=!0;else continue;this._resources[h].kind==="transient"&&(t[h]??=i)}if(!o)continue;const c={};if(i.colorHandles.length>0){const l=[];for(let u=0;u<i.colorHandles.length;u++)l.push({texture:L.EMPTY.source});c.colors=l}i.depthHandle!==null&&(c.depth={texture:L.EMPTY.source},a&&(c.depthReadOnly=!0)),i.attachments=c}const s=this.globalTextureBindings.opaqueDepth.group;for(let r=0;r<this._passes.length;r++){const i=this._passes[r];for(let n=0;n<i.sampleAccesses.length;n++){const o=i.sampleAccesses[n],a=t[o.handle._id];if(o.binding.group===s&&a)throw new Error(`RenderGraph.compile: pass "${i.pass.name}" samples resource ${o.handle._id} through the view's global bind group, and pass "${a.pass.name}" attaches it. The global group stays bound while every pass draws, so a texture it holds cannot also be a render target. Sample it through a bind group the pass owns.`)}}}run(e){this.resolve(e),this.prepareCameras(e),this.execute(e)}resolve(e){this._activePasses.length=0,this._limitsChecked||this._assertAttachmentLimits(e);const t=++this._resolveTick,s=this._resolveCandidates;s.length=0;for(let f=0;f<this._passes.length;f++){const p=this._passes[f];(p.pass.condition?.(e)??!0)&&(p.candidateTick=t,s.push(p))}if(s.length===0)return;const r=this._resolveStack;r.length=0;for(let f=0;f<s.length;f++){const p=s[f];p.isAnchored&&(p.neededTick=t,r.push(p))}for(;r.length>0;){const f=r.pop().dependsOn;for(let p=0;p<f.length;p++){const m=f[p];m.candidateTick!==t||m.neededTick===t||(m.neededTick=t,r.push(m))}}for(let f=0;f<this._passes.length;f++){const p=this._passes[f];p.neededTick===t&&this._activePasses.push(p)}const i=this._activePasses.length;for(;this._acquireAt.length<i;)this._acquireAt.push([]),this._releaseAt.push([]);for(let f=0;f<i;f++)this._acquireAt[f].length=0,this._releaseAt[f].length=0,this._activePasses[f].copyCameras.length=0,this._activePasses[f].finishedColors.length=0,this._activePasses[f].depthResolves.length=0,this._activePasses[f].resolvesColor=!1;const n=this._resources.length;this._firstUseByResId.length<n&&(this._firstUseByResId=new Int32Array(n),this._lastUseByResId=new Int32Array(n),this._firstWriterByResId=new Int32Array(n),this._lastWriterByResId=new Int32Array(n),this._lastWrittenHandleByResId.length=n,this._depthResolvedAtByResId=new Int32Array(n));const o=this._firstUseByResId,a=this._lastUseByResId,c=this._firstWriterByResId,l=this._lastWriterByResId,u=this._lastWrittenHandleByResId,h=this._depthResolvedAtByResId;o.fill(-1,0,n),a.fill(-1,0,n),c.fill(-1,0,n),l.fill(-1,0,n),h.fill(-1,0,n);for(let f=0;f<i;f++){const p=this._activePasses[f].record.accesses;for(let m=0;m<p.length;m++){const _=p[m],g=_.handle._id,b=this._resources[g];if(b.kind==="transient"&&(o[g]===-1&&(o[g]=f),a[g]=f),_.mode==="write_attachment"||_.mode==="produce")c[g]===-1&&(c[g]=f),l[g]=f,b.type==="color"&&(u[g]=_.handle);else if(_.mode==="sample"&&_.handle._kind==="depth"&&b.kind==="transient"&&l[g]!==-1&&b.describe(e).antialias){const y=l[g],v=this._depthResolveByResId[g]._id;h[g]!==y&&(h[g]=y,this._activePasses[y].depthResolves.push(_.handle),o[v]===-1&&(o[v]=y)),a[v]=f}else _.mode==="sample"&&_.handle._kind==="color"&&b.kind==="transient"&&l[g]!==-1&&!this._activePasses[l[g]].resolvesColor&&b.describe(e).antialias&&(this._activePasses[l[g]].resolvesColor=!0)}}for(let f=0;f<n;f++){const p=o[f];p!==-1&&(this._acquireAt[p].push(f),this._releaseAt[a[f]].push(f));const m=l[f];m!==-1&&this._resources[f].type==="color"&&this._activePasses[m].finishedColors.push(u[f])}const d=this._camerasSeen;d.clear();for(let f=i-1;f>=0;f--){const p=this._activePasses[f],m=p.pass.camera;if(!m?.renderTexture||d.has(m))continue;const _=this._cameraTarget(m);l[_.color._id]===f&&(d.add(m),p.copyCameras.push(m),p.finishedColors.push(_.texture))}}prepareCameras(e){go(e.view3d.camera,e);for(let t=0;t<this._activePasses.length;t++){const s=this._activePasses[t].pass.camera;s&&(Yc(s,e),go(s,e))}}execute(e){this._maybeResetRenderTargetCache(e),this._prepareDefaultTarget(e);const t=e.renderer,s=t.renderPipes.view3d,r=this._savedBind=t.renderTarget.getBindState(this._savedBind),i=r.target,n=!!r.flipY,o=this._bindOptions,a=t.renderTarget.isFrontFaceInverted(e.defaultTarget,n),c=a!==(t.type===_t.WEBGL);e.defaultFrontFaceInverted=a;for(let l=0;l<this._activePasses.length;l++)this._activePasses[l].pass.prepare?.(e);for(let l=0;l<this._activePasses.length;l++){const u=this._activePasses[l],{pass:h}=u,d=this._acquireAt[l];for(let S=0;S<d.length;S++){const C=this._resources[d[S]],D=C.describe(e),I=Qe.getOptimalTexture(D);D.label&&(I.source.label=D.label),C.texture=I}const{target:f,flipY:p,frame:m}=this._resolveTarget(u,l,e,c,n);if(f===e.defaultTarget)e.activeTarget!==f&&(o.target=i,o.clear=dt.NONE,o.frame=ot(e.view3d.camera).frame,o.flipY=n,t.renderTarget.bind(o),e.activeTarget=f,e.activeViewport=e.viewport);else if(f!==null&&f!==e.activeTarget){const S=this._resolveClear(u,l);if(o.target=f,o.clear=S,o.frame=m??void 0,o.flipY=p,t.renderTarget.bind(o),(S&dt.DEPTH)!==0&&u.depthHandle!==null&&u.depthHandle._id===this.sceneDepth._id&&(e.needsDepthClear=!1),e.activeTarget=f,m){const C=(f.colorTexture?.source??f.depthStencilTexture.source).resolution;e.activeViewport=ti(m,C,zm)}}const _=u.sampleAccesses,g=u.lastSampleSourceUids;for(let S=0;S<_.length;S++){const C=_[S],D=C.binding;let I=C.handle;I._kind==="depth"&&this._depthResolvedAtByResId[I._id]!==-1&&(I=this._depthResolveByResId[I._id]);const M=this._bindResource(I,e);D.group.setResource(M,D.slot),D.styleSlot!==void 0&&D.group.setResource(M.style,D.styleSlot);const P=M,A=P?.source?.uid??P?.uid??-1;if(A!==g[S]&&(g[S]=A,t.type===_t.WEBGPU&&h.bit!==void 0)){const z=e.view3d._meshBatches;for(let k=0;k<z.length;k++){const O=z[k].drawLists[h.bit];O&&O.gpuData.bundleDirtyId++}}}const b=f!==null&&h.camera&&h.camera!==e.view3d.camera?h.camera:null,y=b&&qc(b,e,e.activeViewport,this.resolution);if(b===null)h.render(e);else if(y){const S=e.activeViewport;s.setViewport(y),e.activeViewport=y,h.render(e),e.activeViewport=S,s.setViewport(S)}const v=u.depthResolves;for(let S=0;S<v.length;S++)this._resolveDepth(u,v[S],f,s,e);let x=v.length>0;!x&&u.resolvesColor&&(s.resolveColor(),x=!0);const w=u.copyCameras;for(let S=0;S<w.length;S++){const C=w[S],D=C.renderTexture,I=this._drawTarget(C,e),M=D.source.format;this._cameraTargetFormat(C)===M?s.copyColor(I,D,e):(!x&&I.target.colorTexture.source.antialias&&(s.resolveColor(),x=!0),s.outputColor(I,D,e,or(M)?null:e.view3d.toneMapping))}const T=u.finishedColors;for(let S=0;S<T.length;S++){const C=T[S],D=this.getTexture(C,e).source;!x&&D.antialias&&this._resources[C._id].kind==="transient"&&!this._cameraTargetColors.has(C._id)&&(s.resolveColor(),x=!0),D.autoGenerateMipmaps&&s.generateMips(C,e)}const B=this._releaseAt[l];for(let S=0;S<B.length;S++){const C=this._resources[B[S]];Qe.returnTexture(C.texture),C.texture=null}}t.renderTarget.bind(r),e.activeTarget=null,o.target=null,o.frame=void 0}unload(){if(!this._destroyed)for(let e=0;e<this._passes.length;e++)this._passes[e].pass.unload?.()}destroy(){if(!this._destroyed){this._destroyed=!0,this._releaseTransients();for(let e=0;e<this._passes.length;e++)this._passes[e].pass.destroy?.();this._renderTargetCache.destroy();for(let e=0;e<this._resources.length;e++){const t=this._resources[e];t.cachedTexture&&(t.cachedTexture.destroy(!1),t.cachedTexture=null),t.cachedDepthView&&(t.cachedDepthView.destroy(),t.cachedDepthView=null,t.cachedDepthViewSource=null)}this._resources=null,this._passes=null,this._activePasses=null,this._cameraTargets=null,this._cameraTargetColors=null,this._sceneDrawTarget=null}}_bindResource(e,t){const s=this.getTexture(e,t).source;if(e._kind!=="depth")return s;const r=this._resources[e._id];return r.cachedDepthViewSource!==s&&(r.cachedDepthView?.destroy(),r.cachedDepthView=new aa(s,{aspect:"depth-only"}),r.cachedDepthViewSource=s),r.cachedDepthView}getTexture(e,t){const s=this._resources[e._id];if(s.kind==="transient"){if(s.texture===null)throw new Error(`RenderGraph.getTexture: '${s.describe(t).label}' isn't alive here. A graph texture only exists inside the render of a pass that declared it, with b.read, b.sample or a write, so resolve it there and use it before render returns.`);return s.texture}const r=s.getter(t);if(r instanceof L)return r;const i=r.source;return(!s.cachedTexture||s.cachedTexture.source!==i)&&(s.cachedTexture?.destroy(!1),s.cachedTexture=new L({source:i})),s.cachedTexture}_assertAttachmentLimits(e){const t=e.renderer;for(let s=0;s<this._passes.length;s++){const r=this._passes[s];if(r.colorHandles.length<2)continue;const i=[];for(let n=0;n<r.colorHandles.length;n++){const o=this._resources[r.colorHandles[n]._id];i.push(o.kind==="transient"?o.describe(e):o.getter(e).source)}Pm(r.pass.name,i,t)}this._limitsChecked=!0}_attachmentSource(e,t){if(e.kind==="imported")return e.getter(t).source;if(e.texture===null)throw new Error("RenderGraph._resolveTarget: a transient attachment has not been allocated");return e.texture.source}_liveSource(e,t){return e.kind==="transient"&&e.texture===null?null:this._attachmentSource(e,t)}_importResource(e,t){const s=this._resources.length;return this._resources.push({kind:"imported",type:e,getter:t,cachedTexture:null,cachedDepthView:null,cachedDepthViewSource:null}),{_kind:e,_id:s}}_ensureDepthResolve(e){const t=e._id;if(this._depthResolveByResId[t])return;const s=this._resources[t],r={width:0,height:0,format:Is,scaleMode:"nearest"};this._depthResolveByResId[t]=this._createTransient("depth",i=>{const n=s.describe(i);return r.width=n.width,r.height=n.height,r.format=n.format,r.label??=`${n.label??"depthTransient"}Resolve`,r})}_resolveDepth(e,t,s,r,i){if(s===null||e.depthHandle===null||e.depthHandle._id!==t._id)throw new Error(`RenderGraph: pass "${e.pass.name}" is the last writer of a multisampled depth before a pass samples it, but doesn't attach it; a multisampled depth is resolved from the target that drew it.`);const{frame:n,source:o}=this.getTexture(t,i),a=this.getTexture(this._depthResolveByResId[t._id],i);Ms.target=s,ti(n,o.resolution,Ms.viewport),r.copyDepth(Ms,a,i),Ms.target=null}_createTransient(e,t){const s=this._resources.length;return this._resources.push({kind:"transient",type:e,describe:t,texture:null,cachedTexture:null,cachedDepthView:null,cachedDepthViewSource:null}),{_kind:e,_id:s}}_resolveTarget(e,t,s,r,i){const n=km,o=e.attachments;if(o===null)return n.target=null,n.flipY=i,n.frame=null,n;const a=e.colorHandles;let c=!1,l=null,u=i;if(o.colors)for(let h=0;h<a.length;h++){const d=a[h]._id,f=this._resources[d],p=this._attachmentSource(f,s);l===null&&f.kind==="transient"&&(l=f.texture.frame,u=this._cameraTargetColors.has(d)?i:r),o.colors[h].texture!==p&&(o.colors[h].texture=p,c=!0)}if(e.depthHandle!==null){const h=this._resources[e.depthHandle._id],d=this._attachmentSource(h,s);l===null&&h.kind==="transient"&&(l=h.texture.frame,u=r),o.depth.texture!==d&&(o.depth.texture=d,c=!0)}return n.flipY=u,(c||e.cachedTarget===null)&&(e.cachedTarget=this._renderTargetCache.get(o)),n.target=e.cachedTarget,o.colors&&n.target!==s.defaultTarget&&this._setColorAttachments(n.target,e,t),n.frame=l,n}_inputClamp(e,t,s){if(this._resources[e._id].kind!=="transient")throw new Error(`RenderGraph._inputClamp: resource ${e._id} is imported, not a transient`);const{frame:r,source:i}=this.getTexture(e,t),n=.5/i.pixelWidth,o=.5/i.pixelHeight;s[0]=n,s[1]=o,s[2]=r.width/i.pixelWidth-n,s[3]=r.height/i.pixelHeight-o}_invalidatePerPassTargets(){for(let e=0;e<this._passes.length;e++)this._passes[e].cachedTarget=null;for(const e of this._cameraTargets.values())e.draw=null;this._sceneDrawTarget=null}_prepareDefaultTarget(e){e.defaultTarget.ensureDepthStencilTexture();const t=e.defaultTarget.colorTexture.source,s=e.defaultTarget.depthStencilTexture.source,r=this._defaultCacheKey;r.colors[0].texture===t&&r.depth.texture===s||(r.colors[0].texture=t,r.depth.texture=s,this._renderTargetCache.addToCache(r,e.defaultTarget),this._renderTargetCache.addToCache(this._defaultCacheKeyReadOnlyDepth,e.defaultTarget))}_setColorAttachments(e,t,s){const r=e.colorAttachments,i=r.length>1;for(let n=0;n<r.length;n++){const o=r[n],a=t.colorHandles[n]._id,c=this._clearValueById[a];if(o.clearValue!==c&&(o.clearValue=c),i){const l=this._effectiveLoadOp(a,s);o.loadOp!==l&&(o.loadOp=l)}}}_resolveClear(e,t){const s=e.record.accesses;let r=!1,i=!1;for(let n=0;n<s.length;n++){const o=s[n];o.mode==="write_attachment"&&this._effectiveLoadOp(o.handle._id,t)==="clear"&&(o.handle._kind==="color"?r=!0:o.handle._kind==="depth"&&(i=!0))}return r&&i?dt.ALL:r?dt.COLOR:i?dt.DEPTH:dt.NONE}_effectiveLoadOp(e,t){return this._firstWriterByResId[e]!==t?"load":this._resources[e].kind==="transient"||e===this.defaultDepth._id?"clear":"load"}_maybeResetRenderTargetCache(e){const t=e.defaultTarget.colorTexture.source,s=e.defaultTarget.depthStencilTexture?.source,r=t.uid,i=s?s.uid:-1,n=this._lastColorUid!==-1&&r!==this._lastColorUid,o=this._lastDepthUid!==-1&&i!==this._lastDepthUid,a=this._lastWidth!==-1&&(t.pixelWidth!==this._lastWidth||t.pixelHeight!==this._lastHeight);(n||o||a)&&(this._renderTargetCache.reset(),this._invalidatePerPassTargets(),this._defaultCacheKey.colors[0].texture=L.EMPTY.source,this._defaultCacheKey.depth.texture=L.EMPTY.source),this._lastColorUid=r,this._lastDepthUid=i,this._lastWidth=t.pixelWidth,this._lastHeight=t.pixelHeight}_releaseTransients(){for(let e=0;e<this._passes.length;e++){const t=this._passes[e].sampleAccesses;for(let s=0;s<t.length;s++){const r=t[s];if(this._resources[r.handle._id].kind!=="transient")continue;const i=r.binding,n=r.handle._kind==="depth"?ki:L.EMPTY.source;i.group.setResource(n,i.slot),i.styleSlot!==void 0&&i.group.setResource(L.EMPTY.source.style,i.styleSlot)}}}};const Lm={x:0,y:1,z:0},Em=new vt,Vm=new vt;function Ui(e,t,s,r){const i=e.intensity??1;At(t,0,Em.setValue(e.skyColor),i),At(s,0,Vm.setValue(e.groundColor),i);const n=e.up??Lm,o=n.x*n.x+n.y*n.y+n.z*n.z,a=o>0?1/Math.sqrt(o):0;r[0]=n.x*a,r[1]=n.y*a,r[2]=n.z*a}const Gm={name:"background",attributes:{aPosition:"float32x3"},interStage:{vDir:"vec3<f32>"},bindings:{background:{uCube:"texture_cube<f32>",uCubeSampler:"sampler"}}},yo={name:"backgroundGradient",attributes:{aPosition:"float32x3"},interStage:{vDir:"vec3<f32>"},bindings:{background:{uSkyColor:"vec3<f32>",uGroundColor:"vec3<f32>",uUp:"vec3<f32>"}}},Xc=`#version 300 es

{{header}}

void main() {
  vDir = aPosition;

  mat4 view = uViewMatrix;
  view[3].xyz = vec3(0.0);

  vec4 clip = uProjectionMatrix * view * vec4(aPosition, 1.0);
  gl_Position = clip.xyww;
}
`,Om={vertex:Xc,fragment:`#version 300 es

{{header}}

out vec4 fragColor;

void main() {
  vec4 sampleColor = texture(uCube, normalize(vDir));
  vec3 sampleLinear = decodeToLinear(sampleColor.rgb);
  vec3 finalColor = sampleLinear * uExposure;
  {{end}}
  fragColor = vec4(finalColor, sampleColor.a);
}
`},Nm={vertex:Xc,fragment:`#version 300 es

{{header}}

out vec4 fragColor;

void main() {
  float t = dot(normalize(vDir), uUp) * 0.5 + 0.5;
  vec3 finalColor = mix(uGroundColor, uSkyColor, t) * uExposure;
  {{end}}
  fragColor = vec4(finalColor, 1.0);
}
`};function $m(){const t=[],s=r=>{const i=[0,1,2,0,2,3];for(let n=0;n<i.length;n++){const o=r[i[n]];t.push(o[0],o[1],o[2])}};return s([[1,-1,-1],[1,-1,1],[1,1,1],[1,1,-1]]),s([[-1,-1,1],[-1,-1,-1],[-1,1,-1],[-1,1,1]]),s([[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]]),s([[-1,-1,1],[1,-1,1],[1,-1,-1],[-1,-1,-1]]),s([[-1,-1,1],[-1,1,1],[1,1,1],[1,-1,1]]),s([[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,-1]]),new cs({attributes:{aPosition:t}})}function Um(){const e=new zt;return e.depthTest=!1,e.depthMask=!1,e.culling=!1,e.blend=!1,e}const Zc=`
@vertex
fn mainVertex(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;

  output.vDir = input.aPosition;

  var view = camera.uViewMatrix;
  view[3] = vec4<f32>(0.0, 0.0, 0.0, view[3].w);

  let clip = camera.uProjectionMatrix * view * vec4<f32>(input.aPosition, 1.0);
  output.position = vec4<f32>(clip.x, clip.y, clip.w, clip.w);

  return output;
}
`,Hm={bindGroups:[{name:"global",ubo:!0},"camera","background"],gpu:`
{{header}}
${Zc}
@fragment
fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
  let sample = textureSample(uCube, uCubeSampler, normalize(input.vDir));
  let sampleLinear = decodeToLinear(sample.rgb);
  var finalColor = sampleLinear * global.uExposure;
  {{fragmentEnd}}
  return vec4<f32>(finalColor, sample.a);
}
`,gl:Om},jm={bindGroups:[{name:"global",ubo:!0},"camera","background"],gpu:`
{{header}}
${Zc}
@fragment
fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
  let t = dot(normalize(input.vDir), background.uUp) * 0.5 + 0.5;
  var finalColor = mix(background.uGroundColor, background.uSkyColor, t) * global.uExposure;
  {{fragmentEnd}}
  return vec4<f32>(finalColor, 1.0);
}
`,gl:Nm};var qm=class extends re{_geometry;_state;_cubeBindGroup;_skyColor=new Float32Array(3);_groundColor=new Float32Array(3);_up=new Float32Array(3);_gradientUniforms;_gradientBindGroup;_shader=null;_cachedToneBit=null;_cachedBackgroundBit=null;_cachedDecodeBit=null;_destroyed=!1;constructor(e){super({renderer:e.renderer,name:"background",description:"Draws the View3D cubemap, hemisphere or colour background behind scene geometry.",bit:$.BACKGROUND,camera:e.camera,attachedOutputs:e.attachedOutputs}),this._geometry=$m(),this._state=Um(),this._cubeBindGroup=new gt({uCube:Ot.source,uCubeSampler:Ot.source.style}),this._gradientUniforms=new jt({uSkyColor:{value:this._skyColor,type:"vec3<f32>"},uGroundColor:{value:this._groundColor,type:"vec3<f32>"},uUp:{value:this._up,type:"vec3<f32>"}}),this._gradientBindGroup=new gt({background:this._gradientUniforms})}setup(e){this._writeTarget(e)}condition(e){return e.view3d.background!==null}render(e){const{view3d:t}=e,s=t.background;if(s===null)return;let r,i,n,o=null;s instanceof bt?(r=Gm,o=vr(!or(s.source.format)),i=Hm,this._cubeBindGroup.setResource(s.source,"uCube"),this._cubeBindGroup.setResource(s.source.style,"uCubeSampler"),n=this._cubeBindGroup):(r=yo,i=jm,typeof s=="number"?(At(this._skyColor,0,vt.shared.setValue(s)),this._groundColor.set(this._skyColor),this._up.fill(0)):Ui(s,this._skyColor,this._groundColor,this._up),n=this._gradientBindGroup);const a=t._toneMappingBit;if(this._shader&&(this._cachedToneBit!==a||this._cachedBackgroundBit!==r||this._cachedDecodeBit!==o)&&(this._shader.destroy(),this._shader=null),!this._shader){const c=[r];o&&c.push(o),a&&c.push(a),this._shader=this.pipe.renderer.material3d.compilePassShader(c,i),this._cachedToneBit=a,this._cachedBackgroundBit=r,this._cachedDecodeBit=o,r===yo&&(this._cubeBindGroup.setResource(Ot.source,"uCube"),this._cubeBindGroup.setResource(Ot.source.style,"uCubeSampler"))}this._shader.groups[0]=e.globalBindGroup,this._shader.groups[1]=ot(this.camera??t.camera).bindGroup,this._shader.groups[2]=n,this.pipe.renderGeometry(this._geometry,this._shader,this._state)}unload(){this._gradientUniforms.buffer?.unload()}destroy(){this._destroyed||(this._destroyed=!0,this._shader?.destroy(),this._shader=null,this._geometry.destroy(!0),this._cubeBindGroup.destroy(),this._gradientBindGroup.destroy(),this._gradientUniforms.buffer?.destroy())}},Wm=class{survivors=new Dc("survivors");indirectDrawData=new Zp("survivorDrawCalls");bundle=null;direct=!1;countsDirtyId=0;lastBundleCountsDirtyId=-1;lastCommandListDirtyId=-1;lastRangesDirtyId=-1;lastBundleDirtyId=-1;lastCameraBindGroup=null;lastVisibilityDirtyId=-1;sync(e,t){this.direct!==t&&(this.direct=t,this.bundle=null,this.lastVisibilityDirtyId=-1);const s=e.commandList.dirtyId,r=e.rangesDirtyId;if(this.lastCommandListDirtyId===s&&this.lastRangesDirtyId===r)return!1;const i=this.lastCommandListDirtyId===s,n=this.indirectDrawData.drawCalls,o=this.survivors.data;return this.indirectDrawData.copyCommandsFrom(e.drawData,e.commandList.count),this.survivors.ensureSize(e.view.count),(!i||this.direct||n!==this.indirectDrawData.drawCalls||o!==this.survivors.data)&&(this.bundle=null),this.lastCommandListDirtyId=s,this.lastRangesDirtyId=r,this.lastVisibilityDirtyId=-1,!0}isBundleStale(e,t){return this.lastBundleDirtyId!==e.gpuData.bundleDirtyId||this.lastCameraBindGroup!==t||this.direct&&this.lastBundleCountsDirtyId!==this.countsDirtyId}claimBundleRecorded(e,t){this.lastBundleDirtyId=e.gpuData.bundleDirtyId,this.lastCameraBindGroup=t,this.lastBundleCountsDirtyId=this.countsDirtyId}unload(){this.bundle=null,this.lastCommandListDirtyId=-1,this.lastRangesDirtyId=-1,this.lastBundleDirtyId=-1,this.lastCameraBindGroup=null,this.lastBundleCountsDirtyId=-1,this.lastVisibilityDirtyId=-1,this.survivors.unload(),this.indirectDrawData.unload()}reset(){this.unload()}destroy(){this.bundle=null,this.survivors.destroy(),this.indirectDrawData.destroy()}},Qc=class{_byBatch=Object.create(null);_lastMeshBatchesDirtyId=-1;ensure(e,t=0){const s=this._byBatch[e.uid]??=[];return s[t]??=gs.get(Wm)}get(e,t=0){return this._byBatch[e.uid]?.[t]}remove(e,t){const s=this._byBatch[e.uid],r=s?.[t];if(!(!s||!r))for(gs.return(r),s[t]=void 0;s.length>0&&!s[s.length-1];)s.pop()}removeDetached(e){const t=e._meshBatchesDirtyId;if(this._lastMeshBatchesDirtyId===t)return;this._lastMeshBatchesDirtyId=t;const s=e._meshBatches;for(const r in this._byBatch){const i=+r;let n=!1;for(let o=0;o<s.length;o++)if(s[o].uid===i){n=!0;break}if(!n){for(const o of this._byBatch[i])o&&gs.return(o);delete this._byBatch[i]}}}unload(){for(const e in this._byBatch)for(const t of this._byBatch[e])t?.unload()}release(){for(const e in this._byBatch){for(const t of this._byBatch[e])t&&gs.return(t);delete this._byBatch[e]}this._lastMeshBatchesDirtyId=-1}},wr=class extends re{_forward;cullResults=new Qc;constructor(e){super(e),this._forward={bit:this.bit,bindsMaterial:!this.descriptor?.shaderDescriptor&&(this.bit&$.MATERIAL_PASS_MASK)!==0,cullResults:this.cullResults,camera:this.camera,sort:e.sort,cache:e.cache},this._updatesViewKey=e.sort==="key"}setup(e){this._writeTarget(e)}condition(e){const t=e.view3d._meshBatches;for(let s=0;s<t.length;s++){const r=t[s].drawLists[this.bit];if(r&&r.view.count>0)return!0}return!1}prepare(e){this.pipe.prepareForward(this._forward,e)}render(e){this.pipe.renderForward(this._forward,e)}unload(){this.cullResults.unload()}destroy(){this.cullResults.release(),super.destroy()}},Km=class extends wr{opaqueColorHandle;opaqueDepthHandle;constructor(e){super({renderer:e.renderer,name:"blendedRefraction",description:"Draws distance-sorted refractive materials using opaque color and depth copies.",bit:$.BLENDED_REFRACTION,sort:"distance",camera:e.camera}),this.opaqueColorHandle=e.opaqueColorHandle,this.opaqueDepthHandle=e.opaqueDepthHandle}setup(e){e.writeColor(e.targetColor),e.readDepthAttachment(e.targetDepth),e.sample(this.opaqueColorHandle,e.globalTextureBindings.opaqueColor),e.sample(this.opaqueDepthHandle,e.globalTextureBindings.opaqueDepth)}},Ym=class extends re{opaqueDepthHandle;constructor(e){super({renderer:e.renderer,name:"copyDepth",description:"Copies opaque depth into a texture for later screen-space sampling.",bit:$.NONE,camera:e.camera}),this.opaqueDepthHandle=e.opaqueDepthHandle}setup(e){e.read(e.targetDepth),e.produce(this.opaqueDepthHandle)}render(e){const t=e.view3d._graph;this.pipe.copyDepth(t._drawTarget(this.camera,e),t.getTexture(this.opaqueDepthHandle,e),e)}},Xm=class extends re{opaqueColorHandle;_backBufferWarned=!1;constructor(e){super({renderer:e.renderer,name:"copyOpaque",description:"Copies opaque color for transmission and refraction passes to sample.",bit:$.NONE,camera:e.camera}),this.opaqueColorHandle=e.opaqueColorHandle}setup(e){e.read(e.targetColor),e.produce(this.opaqueColorHandle)}render(e){if(!this.camera&&!this._backBufferWarned){this._backBufferWarned=!0;const s=this.pipe.renderer;s.type===_t.WEBGL&&!s.backBuffer.useBackBuffer&&pt(`pixijs-3d-copy-opaque-backbuffer-${s.uid}`,"[@pixi/3d] Glass is drawing with useBackBuffer off, so a View3D drawn straight to an opaque canvas refracts nothing. Pass useBackBuffer: true when you create the Application or renderer.")}const t=e.view3d._graph;this.pipe.copyColor(t._drawTarget(this.camera,e),t.getTexture(this.opaqueColorHandle,e),e)}},Zm=class extends re{constructor(e){super({renderer:e.renderer,name:"depthClear",description:"Clears this View3D depth region before scene geometry renders.",bit:$.NONE,camera:e.camera,attachedOutputs:e.attachedOutputs})}setup(e){this._writeTarget(e)}render(e){if(!this.camera){if(!e.needsDepthClear)return;e.needsDepthClear=!1}this.pipe.clearDepth(e)}},Qm=class extends wr{constructor(e){super({renderer:e.renderer,name:"opaque",description:"Draws opaque scene geometry into scene color and depth.",bit:$.OPAQUE,sort:"key",camera:e.camera,attachedOutputs:e.attachedOutputs})}};const Jm={name:"acesToneMapping",gpu:{header:`
fn acesTonemap(linearColor: vec3<f32>) -> vec3<f32> {
  let inMat = mat3x3<f32>(
    vec3<f32>(0.59719, 0.07600, 0.02840),
    vec3<f32>(0.35458, 0.90834, 0.13383),
    vec3<f32>(0.04823, 0.01566, 0.83777),
  );
  let outMat = mat3x3<f32>(
    vec3<f32>(1.60475, -0.10208, -0.00327),
    vec3<f32>(-0.53108, 1.10813, -0.07276),
    vec3<f32>(-0.07367, -0.00605, 1.07602),
  );

  var color = inMat * (linearColor * (1.0 / 0.6));

  let a = color * (color + vec3<f32>(0.0245786)) - vec3<f32>(0.000090537);
  let b = color * (0.983729 * color + vec3<f32>(0.4329510)) + vec3<f32>(0.238081);
  color = a / b;

  return clamp(outMat * color, vec3<f32>(0.0), vec3<f32>(1.0));
}
`,fragment:{end:`
  finalColor = acesTonemap(finalColor);
  finalColor = pow(finalColor, vec3<f32>(1.0 / 2.2));
`}},gl:{header:`
vec3 acesTonemap(vec3 linearColor) {
  const mat3 inMat = mat3(
    vec3(0.59719, 0.07600, 0.02840),
    vec3(0.35458, 0.90834, 0.13383),
    vec3(0.04823, 0.01566, 0.83777)
  );
  const mat3 outMat = mat3(
    vec3(1.60475, -0.10208, -0.00327),
    vec3(-0.53108, 1.10813, -0.07276),
    vec3(-0.07367, -0.00605, 1.07602)
  );

  vec3 color = inMat * (linearColor * (1.0 / 0.6));

  vec3 a = color * (color + 0.0245786) - 0.000090537;
  vec3 b = color * (0.983729 * color + 0.4329510) + 0.238081;
  color = a / b;

  return clamp(outMat * color, 0.0, 1.0);
}
`,fragment:{end:`
  finalColor = acesTonemap(finalColor);
  finalColor = pow(finalColor, vec3(1.0 / 2.2));
`}}},tg={name:"reinhardToneMapping",gpu:{fragment:{end:`
  finalColor = finalColor / (finalColor + vec3<f32>(1.0));

  finalColor = pow(finalColor, vec3<f32>(1.0 / 2.2));
`}},gl:{fragment:{end:`
  finalColor = finalColor / (finalColor + vec3(1.0));

  finalColor = pow(finalColor, vec3(1.0 / 2.2));
`}}},Sr={name:"srgbEncode",gpu:{fragment:{end:`
  finalColor = pow(finalColor, vec3<f32>(1.0 / 2.2));
`}},gl:{fragment:{end:`
  finalColor = pow(finalColor, vec3(1.0 / 2.2));
`}}},eg={name:"uncharted2ToneMapping",gpu:{header:`
fn uncharted2Curve(x: vec3<f32>) -> vec3<f32> {
  let A = 0.15;
  let B = 0.50;
  let C = 0.10;
  let D = 0.20;
  let E = 0.02;
  let F = 0.30;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

fn uncharted2Tonemap(color: vec3<f32>) -> vec3<f32> {
  let exposureBias = 2.0;
  let W = vec3<f32>(11.2);
  let curr = uncharted2Curve(color * exposureBias);
  let whiteScale = vec3<f32>(1.0) / uncharted2Curve(W);
  return curr * whiteScale;
}
`,fragment:{end:`
  finalColor = uncharted2Tonemap(finalColor);

  finalColor = pow(finalColor, vec3<f32>(1.0 / 2.2));
`}},gl:{header:`
vec3 uncharted2Curve(vec3 x) {
  float A = 0.15;
  float B = 0.50;
  float C = 0.10;
  float D = 0.20;
  float E = 0.02;
  float F = 0.30;
  return ((x * (A * x + C * B) + D * E) / (x * (A * x + B) + D * F)) - E / F;
}

vec3 uncharted2Tonemap(vec3 color) {
  float exposureBias = 2.0;
  vec3 W = vec3(11.2);
  vec3 curr = uncharted2Curve(color * exposureBias);
  vec3 whiteScale = vec3(1.0) / uncharted2Curve(W);
  return curr * whiteScale;
}
`,fragment:{end:`
  finalColor = uncharted2Tonemap(finalColor);

  finalColor = pow(finalColor, vec3(1.0 / 2.2));
`}}},Ns={aces:Jm,reinhard:tg,uncharted2:eg,none:Sr,custom:null},sg={name:"outputStraightColor",gpu:{fragment:{end:"finalColor = select(finalColor, finalColor / fxColor.a, fxColor.a > 0.0001);"}},gl:{fragment:{end:"finalColor = fxColor.a > 0.0001 ? finalColor / fxColor.a : finalColor;"}}},rg={name:"outputPremultiplyColor",gpu:{fragment:{end:"finalColor = select(finalColor, finalColor * fxColor.a, fxColor.a > 0.0001);"}},gl:{fragment:{end:"finalColor = fxColor.a > 0.0001 ? finalColor * fxColor.a : finalColor;"}}},ig={name:"outputDither",gpu:{fragment:{end:"finalColor += (fract(52.9829189 * fract(dot(input.position.xy, vec2<f32>(0.06711056, 0.00583715)))) - 0.5) / 255.0 * fxColor.a;"}},gl:{fragment:{end:"finalColor += (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0 * fxColor.a;"}}};function Jc(e){const t=e?Ns[e]:null;return t?[sg,t,rg,ig]:[]}const Ps={target:null,clear:dt.NONE},ng=new lt,og={name:"colorOutputDraw",attributes:{aPosition:"float32x2"},bindings:{local:{uSource:"texture_2d<f32>",uOffset:"vec2<f32>"}}},ag={bindGroups:["local"],gpu:`
{{header}}

@vertex
fn mainVertex(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4<f32>(input.aPosition, 0.0, 1.0);
  return output;
}

@fragment
fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
  let fxColor = textureLoad(uSource, vec2<i32>(input.position.xy + local.uOffset), 0);
  var finalColor = fxColor.rgb;
  {{fragmentEnd}}
  return vec4<f32>(finalColor, fxColor.a);
}
`,gl:{vertex:`#version 300 es

{{header}}

void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,fragment:`#version 300 es

{{header}}

out vec4 fragColor;

void main() {
  vec4 fxColor = texelFetch(uSource, ivec2(gl_FragCoord.xy + uOffset), 0);
  vec3 finalColor = fxColor.rgb;
  {{end}}
  fragColor = vec4(finalColor, fxColor.a);
}
`}};var tl=class{_renderer;_uniforms=new jt({uOffset:{value:new Float32Array(2),type:"vec2<f32>"}});_bindGroup;_shaders=new Map;_state;constructor(e){this._renderer=e,this._bindGroup=new gt({local:this._uniforms,uSource:L.WHITE.source});const t=new zt;t.blend=!1,t.depthTest=!1,t.depthMask=!1,t.culling=!1,this._state=t}draw(e,t,s,r){const i=this._renderer,{viewport:n}=t,o=s.frame,a=s.source.resolution,c=Math.round(o.x*a),l=Math.round(o.y*a),u=this._uniforms.uniforms.uOffset;u[0]=n.x-c,u[1]=n.y-l,this._uniforms.update();const h="uniformBatch"in i.renderPipes?i.renderPipes.uniformBatch.getUboResource(this._uniforms):this._uniforms;this._bindGroup.setResource(h,"local"),this._bindGroup.setResource(t.target.colorTexture,"uSource");let d=this._shaders.get(r);d||(d=i.material3d.compileIsolatedShader([og,...Jc(r)],ag,{0:this._bindGroup}),this._shaders.set(r,d)),Ps.target=s,Ps.clear=s.noFrame?dt.COLOR:dt.NONE,i.renderTarget.bind(Ps),Ps.target=null,e.setViewport(ng.set(c,l,n.width,n.height)),e.renderGeometry(ds(),d,this._state),this._bindGroup.setResource(L.WHITE.source,"uSource")}destroy(){for(const e of this._shaders.values())e.destroy();this._shaders=null,this._bindGroup.destroy()}};function xi(e){return(e.cache??(e.sort==="key"?"auto":"never"))==="auto"}const xo=new E,bo=new F,cg=new wt,lg=new Q,ug=new F,hg=.001,dg=.15,fg=3,pg=50,mg=.15,ei=256,gg="Shadow: shadow.bounds and shadow.cascades are both set — cascades take precedence and the bounds box is ignored. Use bounds for a fixed region or cascades for a camera-following shadow, not both.",_g="Shadow auto-fit box spans a large scene, so shadows may look soft. Raise view3d.shadowQuality, set light.shadow.bounds to the area that needs shadows, or, for a scene the camera roams across, enable cascades: light.shadow.cascades = 3.",yg=`Too many shadow maps for the shadow budget of ${Ft}: each shadow-casting light takes one, or one per cascade. Lights past the budget render without shadows.`;var el=class extends re{_renderTarget=null;_layerCount=0;_quality="medium";_frameCount=0;_hasCastersValue=!1;_hasCastersFrame=-1;_sceneCasterBounds=new Q;_sceneBoundsFrame=-1;_destroyed=!1;targetVersion=0;_view3d=null;shadowMapHandle;constructor(e){super(e),this.shadowMapHandle=e.shadowMapHandle}get renderTarget(){return this._renderTarget===null&&(this._renderTarget=_m(this._quality,Math.max(this._layerCount,1))),this._renderTarget}_growAtlas(e){e<=this._layerCount||(this._layerCount=Math.min(e,Ft),this._releaseTarget())}set quality(e){e!==this._quality&&(this._quality=e,this._releaseTarget())}get quality(){return this._quality}beginFrame(e){this._view3d=e,this.quality=e.shadowQuality,this._frameCount++,e._shadowDataList.reset()}unload(){this._releaseTarget()}_releaseTarget(){const e=this._renderTarget;if(!e)return;this._renderTarget=null,this.targetVersion++,this._view3d&&this._bindShadowSource(this._view3d,zi.source);const t=e.depthStencilTexture;e.destroy(),t.destroy()}_bindShadowSource(e,t){const{group:s,slot:r}=e._graph.globalTextureBindings.shadowMap;s.getResource(r)!==t&&(s.setResource(t,r),e._invalidateBundleCaches())}setup(e){e.produce(this.shadowMapHandle)}condition(e){const t=e.lights;for(let s=0;s<t.length;s++)if(t[s].canCastShadow)return this._hasCasters(e.view3d);return!1}_hasCasters(e){if(this._hasCastersFrame===this._frameCount)return this._hasCastersValue;this._hasCastersFrame=this._frameCount;const t=e._meshBatches;let s=!1;for(let r=0;r<t.length&&!s;r++)s=(t[r].drawLists[this.bit]?.view.count??0)>0;return this._hasCastersValue=s,s}getShadowGPUData(e){return e._gpuShadowData??={inverseLightMatrix:new E,lightProjectionMatrix:new E,targetVersion:this.targetVersion}}_cascadeSlot(e,t){const s=this.getShadowGPUData(e).cascades??=[];return s[t]??={cameraData:new Lc,bias:0,normalBias:0,mapSize:0,cascadeCount:0,splits:null,needsRender:!0}}_commitCascadeCamera(e,t,s){xo.getInverse(t),xo.extractPosition(bo);const r=e.cameraData;r.set(bo,t,s),r.frustum.setFromProjectionMatrix(r.viewProjection)}updateLightShadowData(e,t){if(!e.canCastShadow)return;const s=t.camera,r=this.getShadowGPUData(e),{inverseLightMatrix:i,lightProjectionMatrix:n}=r,o=r.targetVersion!==this.targetVersion,a=$c[this._quality],c=e._shadowRefreshRequested,l=e.shadow.update,u=e.shadow.bias??hg;if(e.type==="spot"||e.shadow.cascades===void 0){const _=this._cascadeSlot(e,0),g=oo(ao(l,0),this._frameCount,c);if(!g)if(e.type==="spot")ym(e,i,n,this._applyZRangeFix),this._commitCascadeCamera(_,i,n),_.normalBias=e.shadow.normalBias??dg;else{const b=e.shadow.bounds??this._resolveAutoShadowBounds(e,t,a);b!==void 0&&!b.isEmpty()&&(i.getInverse(e.worldTransform),mm(b,i,n,a,this._applyZRangeFix),this._commitCascadeCamera(_,i,n),_.normalBias=this._resolveNormalBias(e,n,a))}_.bias=u,_.mapSize=a,_.cascadeCount=0,_.splits=null,_.needsRender=o||!g;return}e.shadow.bounds!==void 0&&pt("pixijs-3d-shadow-bounds-cascades",gg),i.getInverse(e.worldTransform);const h=Be(e),d=e.shadow.lambda,f=Math.min(e.shadow.maxDistance??pg,s.far),p=this._cascadeSlot(e,0),m=p.splits??=[];hm(s.near,f,h,d,m),dm(s,i);for(let _=0;_<h;_++){const g=_===0?p:this._cascadeSlot(e,_),b=oo(ao(l,_),this._frameCount,c);if(!b){const y=_===0?s.near:m[_-1];pm(s,y,m[_],n,a,this._applyZRangeFix),this._commitCascadeCamera(g,i,n),g.normalBias=this._resolveNormalBias(e,n,a)}g.bias=u,g.mapSize=a,g.cascadeCount=_===0&&h>1?h:0,_>0&&(g.splits=null),g.needsRender=o||!b}}_completeShadowUpdate(e){e._gpuShadowData&&(e._gpuShadowData.targetVersion=this.targetVersion),e._shadowRefreshRequested=!1}_resolveAutoShadowBounds(e,t,s){const r=this._countSceneCasters(t),i=e._autoShadowBounds;if(r>ei&&e._autoShadowBoundsFrozen)return i??void 0;const n=this._ensureSceneCasterBounds(t);if(n.isEmpty())return i??void 0;const o=i??(e._autoShadowBounds=new Q);return o.copyFrom(n),r<=ei?e._autoShadowBoundsFrozen=!1:(e._autoShadowBoundsFrozen=!0,pt("pixijs-3d-shadow-autofit-cap",`Shadow auto-fit: ${r} shadow casters is over the auto-measure cap (${ei}), so the shadow box was fitted once and frozen. If casters move or spawn outside it, set shadow.bounds, enable shadow.cascades, or call light.fitShadowBounds() after changes.`)),this._warnIfShadowBoxLarge(o,s),o}_countSceneCasters(e){let t=0;const s=e._meshBatches;for(let r=0;r<s.length;r++){const i=s[r];if(!i.renderData._worldVisible)continue;const n=i.drawLists[this.bit];n&&(t+=n.view.count)}return t}_ensureSceneCasterBounds(e){if(this._sceneBoundsFrame===this._frameCount)return this._sceneCasterBounds;this._sceneBoundsFrame=this._frameCount;const t=this._sceneCasterBounds.makeEmpty(),s=e._meshBatches;for(let r=0;r<s.length;r++){const i=s[r];if(!i.renderData._worldVisible)continue;const n=i.drawLists[this.bit];if(!n||n.view.count===0)continue;const o=r===0?null:i.renderData.worldTransform,a=n.view.items,c=n.view.renderableIndices;for(let l=0;l<n.view.count;l++){const u=a[c[l]];if(u._worldVisible===0)continue;const h=u.boundingSphere;if(h.radius<0)continue;const d=o?h.applyMatrix4(o,cg):h;t.union(d.getBounds(lg))}}return t}_warnIfShadowBoxLarge(e,t){if(e.isEmpty())return;const s=e.getSize(ug);Math.max(s.x,s.y,s.z)/t>mg&&pt("pixijs-3d-shadow-autofit-large",_g)}_resolveNormalBias(e,t,s){if(e.shadow.normalBias!==void 0)return e.shadow.normalBias;const r=2/(t.elements[0]*s);return fg*r}prepareShadow(e,t){const s=t._shadowDataList,r=this._claimShadowSlots(e,t,s.count);if(r===0)return;this._growAtlas(s.count+r),this.updateLightShadowData(e,t);const i=this.getShadowGPUData(e).cascades;for(let n=0;n<r;n++)s.add(i[n])}_claimShadowSlots(e,t,s){const r=e.canCastShadow&&this._hasCasters(t),i=Be(e);return r&&s+i<=Ft?(e._shadowDataIndex=s,i):(r&&pt("pixijs-3d-shadow-budget",yg),e._shadowDataIndex=-1,0)}destroy(){this._destroyed||(this._destroyed=!0,this._view3d=null,this._releaseTarget(),super.destroy())}},xg=class extends wr{opaqueColorHandle;constructor(e){super({renderer:e.renderer,name:"transmission",description:"Draws transmissive materials using the opaque scene color behind them.",bit:$.TRANSMISSION,sort:"key",camera:e.camera,attachedOutputs:e.attachedOutputs}),this.opaqueColorHandle=e.opaqueColorHandle}setup(e){super.setup(e),e.sample(this.opaqueColorHandle,e.globalTextureBindings.opaqueColor)}},bg=class extends wr{constructor(e){super({renderer:e.renderer,name:"transparent",description:"Draws distance-sorted transparent scene geometry after opaque and refractive content.",bit:$.TRANSPARENT,sort:"distance",camera:e.camera,attachedOutputs:e.attachedOutputs})}};function vg(e,t,s){const r=s.x,i=s.y,n=s.z,o=e.items,a=e.renderableIndices,c=e.count;for(let l=0;l<c;l++){const u=o[a[l]],h=u._storeIndex*24,d=t[h+12]-r,f=t[h+13]-i,p=t[h+14]-n;u._sortKey=-(d*d+f*f+p*p)}e.sortForced(l=>l._sortKey)}function wg(e,t){const s=t.x,r=t.y,i=t.z,n=e.items,o=e.renderableIndices,a=e.count;for(let c=0;c<a;c++){const l=n[o[c]],u=l.worldTransform.elements,h=u[12]-s,d=u[13]-r,f=u[14]-i;l._sortKey=-(h*h+d*d+f*f)}e.sortForced(c=>c._sortKey)}function Sg(e,t,s,r){const i=t.x,n=t.y,o=t.z,a=r.elements,c=e.items,l=e.renderableIndices,u=e.count;for(let h=0;h<u;h++){const d=c[l[h]],f=d._storeIndex*24,p=s[f+12],m=s[f+13],_=s[f+14],g=a[0]*p+a[4]*m+a[8]*_+a[12],b=a[1]*p+a[5]*m+a[9]*_+a[13],y=a[2]*p+a[6]*m+a[10]*_+a[14],v=g-i,x=b-n,w=y-o;d._sortKey=-(v*v+x*x+w*w)}e.sortForced(h=>h._sortKey)}const sl={name:"alphaOpaque",gpu:{fragment:{end:`
  alpha = 1.0;
`}},gl:{fragment:{end:`
  alpha = 1.0;
`}}},ve={name:"camera",bindings:{camera:{uCameraPosition:"vec3<f32>",uViewMatrix:"mat4x4<f32>",uProjectionMatrix:"mat4x4<f32>",uViewProjectionMatrix:"mat4x4<f32>",uPreviousViewProjectionMatrix:"mat4x4<f32>",uViewportUVScale:"vec2<f32>",uLightTileTransform:"vec4<f32>",uLightTiles:`array<vec4<i32>, ${lc}>`,uLightDepthMasks:`array<vec4<i32>, ${uc}>`,uLightDepthPlane:"vec4<f32>"}}};function Hi(e,t,s,r){const i=`
fn decodeColor(c: vec3<f32>) -> vec3<f32> { return ${t.replace("VEC3","vec3<f32>")}; }
fn inputTint(linearTint: vec4<f32>, displayTint: vec4<f32>) -> vec4<f32> { return ${s}Tint; }
fn inputExposure(linearExposure: f32, displayExposure: f32) -> f32 { return ${s}Exposure; }
fn decodeFrame(c: vec3<f32>) -> vec3<f32> { return ${r.replace("VEC3","vec3<f32>")}; }
`,n=`
vec3 decodeColor(vec3 c) { return ${t.replace("VEC3","vec3")}; }
vec4 inputTint(vec4 linearTint, vec4 displayTint) { return ${s}Tint; }
float inputExposure(float linearExposure, float displayExposure) { return ${s}Exposure; }
vec3 decodeFrame(vec3 c) { return ${r.replace("VEC3","vec3")}; }
`;return{name:e,gpu:{header:i},gl:{header:n}}}const Tg=Hi("colorSpaceLinear","pow(c, VEC3(2.2))","linear","pow(c, VEC3(2.2))"),Cg=Hi("colorSpaceLinearFrames","pow(c, VEC3(2.2))","linear","c"),ji=Hi("colorSpaceDisplay","c","display","c");function rl(e,t,s){if(!t)return Cg;const r=e._skipsToneCurve||t===Sr;return e.colorSpace==="display"&&!e.lit&&r&&!s?ji:Tg}const il={name:"doubleSidedNormal",gpu:{fragment:{material:`
  normal = select(-normal, normal, input.frontFacing);
`}},gl:{fragment:{material:`
  if (!gl_FrontFacing) {
    normal = -normal;
  }
`}}},Dg={name:"envSourceCube",gpu:{header:`
fn sampleEnvironment(dir: vec3<f32>, roughness: f32) -> vec3<f32> {
  let maxMip = f32(textureNumLevels(uEnvironmentTexture) - 1u);
  return textureSampleLevel(uEnvironmentTexture, uSampler, dir, roughness * maxMip).rgb;
}
`},gl:{header:`
vec3 sampleEnvironment(vec3 dir, float roughness) {
  return textureLod(uEnvironmentTexture, dir, roughness * uEnvironmentMaxMipLevel).rgb;
}
`}},vo={name:"envSourceDefault",gpu:{header:`
fn sampleEnvironment(dir: vec3<f32>, roughness: f32) -> vec3<f32> {
  return vec3<f32>(0.0);
}
`},gl:{header:`
vec3 sampleEnvironment(vec3 dir, float roughness) {
  return vec3(0.0);
}
`}},Bg={name:"envSourceHemisphere",gpu:{header:`
fn sampleEnvironment(dir: vec3<f32>, roughness: f32) -> vec3<f32> {
  let t = dot(dir, global.uHemisphereUp) * 0.5 + 0.5;
  return mix(global.uHemisphereGround, global.uHemisphereSky, t);
}
`},gl:{header:`
vec3 sampleEnvironment(vec3 dir, float roughness) {
  float t = dot(dir, uHemisphereUp) * 0.5 + 0.5;
  return mix(uHemisphereGround, uHemisphereSky, t);
}
`}},nl={name:"flatShading",gpu:{fragment:{material:`
  let flatNormal = normalize(cross(dpdx(input.vPosition), dpdy(input.vPosition)));
  normal = select(-flatNormal, flatNormal, dot(flatNormal, normal) >= 0.0);
`}},gl:{fragment:{material:`
  vec3 flatNormal = normalize(cross(dFdx(vPosition), dFdy(vPosition)));
  normal = dot(flatNormal, normal) >= 0.0 ? flatNormal : -flatNormal;
`}}},Ig={name:"exp2Fog",interStage:{vFogDepth:"f32"},gpu:{vertex:{afterTransform:`
  output.vFogDepth = -(camera.uViewMatrix * worldPosition).z;
`},fragment:{end:`
  let fogD = global.uFogParams.z * input.vFogDepth;
  let fogFactor = 1.0 - exp(-fogD * fogD);
  finalColor = mix(finalColor, global.uFogColor, fogFactor);
`}},gl:{vertex:{afterTransform:`
  vFogDepth = -(uViewMatrix * worldPosition).z;
`},fragment:{end:`
  float fogD = uFogParams.z * vFogDepth;
  float fogFactor = 1.0 - exp(-fogD * fogD);
  finalColor = mix(finalColor, uFogColor, fogFactor);
`}}},Mg={name:"exponentialFog",interStage:{vFogDepth:"f32"},gpu:{vertex:{afterTransform:`
  output.vFogDepth = -(camera.uViewMatrix * worldPosition).z;
`},fragment:{end:`
  let fogFactor = 1.0 - exp(-global.uFogParams.z * input.vFogDepth);
  finalColor = mix(finalColor, global.uFogColor, fogFactor);
`}},gl:{vertex:{afterTransform:`
  vFogDepth = -(uViewMatrix * worldPosition).z;
`},fragment:{end:`
  float fogFactor = 1.0 - exp(-uFogParams.z * vFogDepth);
  finalColor = mix(finalColor, uFogColor, fogFactor);
`}}},Pg={name:"linearFog",interStage:{vFogDepth:"f32"},gpu:{vertex:{afterTransform:`
  output.vFogDepth = -(camera.uViewMatrix * worldPosition).z;
`},fragment:{end:`
  let fogFactor = smoothstep(global.uFogParams.x, global.uFogParams.y, input.vFogDepth);
  finalColor = mix(finalColor, global.uFogColor, fogFactor);
`}},gl:{vertex:{afterTransform:`
  vFogDepth = -(uViewMatrix * worldPosition).z;
`},fragment:{end:`
  float fogFactor = smoothstep(uFogParams.x, uFogParams.y, vFogDepth);
  finalColor = mix(finalColor, uFogColor, fogFactor);
`}}},Ag=6,Fg=["x","y","z","w"],Tr=e=>({texel:e>>2,component:Fg[e&3]}),wo=Tr(16),zg=Tr(18),So=Tr(20),kg=Tr(17);function ol(e){return{name:e?"instanceFetchMaterial":"instanceFetch",bindings:{global:{uMeshStoreTexture:"texture_2d<u32>",uRenderInstanceTexture:"texture_2d<u32>",batchTransform:{uBatchWorldMatrix:"mat4x4<f32>"}}},gl:{vertex:{header:`
      uniform int uInstanceBase;

      uvec4 fetchStoreTexel(int texel) {
        return texelFetch(uMeshStoreTexture, ${Pt("texel")}, 0);
      }
      `,input:`
      int instanceSlot = uInstanceBase + gl_InstanceID;
      uvec4 renderInstance = texelFetch(uRenderInstanceTexture, ${Pt("instanceSlot")}, 0);

      int storeTexel = int(renderInstance.x) * ${Ag};

      modelMatrix = uBatchWorldMatrix * mat4(
        uintBitsToFloat(fetchStoreTexel(storeTexel)),
        uintBitsToFloat(fetchStoreTexel(storeTexel + 1)),
        uintBitsToFloat(fetchStoreTexel(storeTexel + 2)),
        uintBitsToFloat(fetchStoreTexel(storeTexel + 3)));

      uvec4 indexLanes = fetchStoreTexel(storeTexel + ${wo.texel});
      float bonePitIndex = float(indexLanes.${wo.component});
      vec2 morphData = vec2(
        float(fetchStoreTexel(storeTexel + ${So.texel}).${So.component}),
        float(int(indexLanes.${zg.component})));
      ${e?`vMaterialIndex = indexLanes.${kg.component};`:""}
      `}}}}const Rg=ol(!1),Lg=ol(!0),To=new Map;function al(e,t){const s=ge(e).length,r=t==="direct"&&Object.keys(_r(e)).length>0,i=`${s}|${t}|${r}`;let n=To.get(i);if(n)return n;const o=Object.fromEntries(Array.from({length:s},(a,c)=>c).flatMap(a=>[[`uMaterialTexture${a}`,"texture_2d<f32>"],[`uMaterialSampler${a}`,"sampler"]]));return r&&(o.material="uniform<Material>"),n={name:`materialBindings:${s}:${t}${r?":material":""}`,bindings:{batch:o}},To.set(i,n),n}const cl=`
  worldNormal = bbRight * normal.x + bbUp * normal.y + bbNormal * normal.z;
`,ll=`
  worldNormal = bbRight * normal.x + bbUp * normal.y + bbNormal * normal.z;
`;function Eg(e){return`
  let bbRight = vec3<f32>(camera.uViewMatrix[0][0], camera.uViewMatrix[1][0], camera.uViewMatrix[2][0]);
  let bbUp    = vec3<f32>(camera.uViewMatrix[0][1], camera.uViewMatrix[1][1], camera.uViewMatrix[2][1]);
  let bbNormal = cross(bbRight, bbUp);

  let bbScaleX = length(modelMatrix[0].xyz);
  let bbScaleY = length(modelMatrix[1].xyz);
  let bbScaleZ = length(modelMatrix[2].xyz);

  worldPosition = vec4<f32>(
    modelMatrix[3].xyz
      + bbRight * (position.x * bbScaleX)
      + bbUp * (position.y * bbScaleY)
      + bbNormal * (position.z * bbScaleZ),
    1.0
  );
  clipPosition = camera.uViewProjectionMatrix * worldPosition;
${e?cl:""}`}function Vg(e){return`
  vec3 bbRight = vec3(uViewMatrix[0][0], uViewMatrix[1][0], uViewMatrix[2][0]);
  vec3 bbUp    = vec3(uViewMatrix[0][1], uViewMatrix[1][1], uViewMatrix[2][1]);
  vec3 bbNormal = cross(bbRight, bbUp);

  float bbScaleX = length(modelMatrix[0].xyz);
  float bbScaleY = length(modelMatrix[1].xyz);
  float bbScaleZ = length(modelMatrix[2].xyz);

  worldPosition = vec4(
    modelMatrix[3].xyz
      + bbRight * (position.x * bbScaleX)
      + bbUp * (position.y * bbScaleY)
      + bbNormal * (position.z * bbScaleZ),
    1.0
  );
  gl_Position = uViewProjectionMatrix * worldPosition;
${e?ll:""}`}function Gg(e){return`
  let bbColX = modelMatrix[0].xyz;
  let bbColY = modelMatrix[1].xyz;
  let bbScaleX = length(bbColX);
  let bbScaleY = length(bbColY);
  let bbScaleZ = length(modelMatrix[2].xyz);
  let bbCentre = modelMatrix[3].xyz;

  var bbUp = vec3<f32>(0.0, 1.0, 0.0);
  if (bbScaleY > 1e-8) { bbUp = bbColY / bbScaleY; }

  let bbToCam = camera.uCameraPosition - bbCentre;
  let bbFlat = bbToCam - bbUp * dot(bbToCam, bbUp);
  let bbFlatLenSq = dot(bbFlat, bbFlat);

  var bbRight = vec3<f32>(1.0, 0.0, 0.0);
  if (bbFlatLenSq > 1e-8) {
    bbRight = cross(bbUp, bbFlat) * inverseSqrt(bbFlatLenSq);
  } else if (bbScaleX > 1e-8) {
    bbRight = bbColX / bbScaleX;
  }

  let bbNormal = cross(bbRight, bbUp);

  worldPosition = vec4<f32>(
    bbCentre
      + bbRight * (position.x * bbScaleX)
      + bbUp * (position.y * bbScaleY)
      + bbNormal * (position.z * bbScaleZ),
    1.0
  );
  clipPosition = camera.uViewProjectionMatrix * worldPosition;
${e?cl:""}`}function Og(e){return`
  vec3 bbColX = modelMatrix[0].xyz;
  vec3 bbColY = modelMatrix[1].xyz;
  float bbScaleX = length(bbColX);
  float bbScaleY = length(bbColY);
  float bbScaleZ = length(modelMatrix[2].xyz);
  vec3 bbCentre = modelMatrix[3].xyz;

  vec3 bbUp = vec3(0.0, 1.0, 0.0);
  if (bbScaleY > 1e-8) { bbUp = bbColY / bbScaleY; }

  vec3 bbToCam = uCameraPosition - bbCentre;
  vec3 bbFlat = bbToCam - bbUp * dot(bbToCam, bbUp);
  float bbFlatLenSq = dot(bbFlat, bbFlat);

  vec3 bbRight = vec3(1.0, 0.0, 0.0);
  if (bbFlatLenSq > 1e-8) {
    bbRight = cross(bbUp, bbFlat) * inversesqrt(bbFlatLenSq);
  } else if (bbScaleX > 1e-8) {
    bbRight = bbColX / bbScaleX;
  }

  vec3 bbNormal = cross(bbRight, bbUp);

  worldPosition = vec4(
    bbCentre
      + bbRight * (position.x * bbScaleX)
      + bbUp * (position.y * bbScaleY)
      + bbNormal * (position.z * bbScaleZ),
    1.0
  );
  gl_Position = uViewProjectionMatrix * worldPosition;
${e?ll:""}`}const Co=Object.create(null);function ul(e,t){const s=`${e}:${t}`,r=Co[s];if(r)return r;if(e==="none")throw new Error("[meshBillboardBits] billboardMode 'none' has no bit — the caller must skip injection.");const i=e==="spherical",n={name:`meshBillboard${i?"Spherical":"Cylindrical"}${t?"Lit":""}`,gpu:{vertex:{afterTransform:i?Eg(t):Gg(t)}},gl:{vertex:{afterTransform:i?Vg(t):Og(t)}}};return Co[s]=n,n}const hl={name:"normal",attributes:{aNormal:"float32x3"},gpu:{vertex:{input:"normal = input.aNormal;"}},gl:{vertex:{input:"normal = aNormal;"}}},dl={name:"normalMapping",requires:[Gi],gpu:{fragment:{material:`
  let normalMapSample = sampleNormal(input.vUV).rgb;
  var tangentNormal = normalMapSample * 2.0 - 1.0;
  tangentNormal = vec3<f32>(tangentNormal.xy * material.normalScale, tangentNormal.z);
  let tbnMatrix = calculateTBN(normal, input.vPosition, input.vUV);
  normal = normalize(tbnMatrix * tangentNormal);
`}},gl:{fragment:{material:`
  {
  vec3 normalMapSample = sampleNormal(vUV).rgb;
  vec3 tangentNormal = normalMapSample * 2.0 - 1.0;
  tangentNormal.xy *= material.normalScale;
  mat3 tbnMatrix = calculateTBN(normal, vPosition, vUV);
  normal = normalize(tbnMatrix * tangentNormal);
  }
`}}},fl={name:"no-shadow",gpu:{header:`
    fn calculateShadow(
      shadowDataIndex: f32,
      cascadeCount: f32,
      worldPos: vec3<f32>,
      normal: vec3<f32>,
      NdotL: f32
    ) -> f32 {
      return 1.0;
    }
    `},gl:{header:`
    float calculateShadow(
      Light light,
      vec3 worldPos,
      vec3 normal,
      float NdotL
    ) {
      return 1.0;
    }
    `}},Do=Object.create(null);function pl(e){const t=Do[e];if(t)return t;if(hr(e).size<3)throw new Error(`[positionBit] aPosition needs three components, got ${e}`);const s=e==="float32x3"?"aPosition":"aPosition.xyz",r={name:`position:${e}`,attributes:{aPosition:e},gpu:{vertex:{input:`position = vec4<f32>(vec3<f32>(input.${s}), 1.0);`}},gl:{vertex:{input:`position = vec4(vec3(${s}), 1.0);`}}};return Do[e]=r,r}const ml={transform:"mat4x4<f32>",bonePitIndex:"u32",materialIndex:"u32",geometryDataIndex:"u32",visibility:"u32",morphWeightIndex:"u32"},qi={boundsCenter:"vec3<f32>",boundsRadius:"f32",morphDeltaBase:"u32",morphTargetCount:"u32",baseVertex:"u32",_pad:"u32"},gl={id:"u32"},Wi={rows:"mat3x4<f32>"},Ng={position:"vec3<f32>",kind:"f32",color:"vec3<f32>",rangeSq:"f32",direction:"vec3<f32>",coneCos:"f32",innerConeCos:"f32",shadowDataIndex:"f32",cascadeCount:"f32",radiusPow4:"f32"},$g={position:"vec3<f32>",type:"f32",color:"vec3<f32>",rangeSq:"f32",direction:"vec3<f32>",coneCos:"f32",innerConeCos:"f32",shadowDataIndex:"f32",radiusPow4:"f32"},_l={lightSpaceMatrix:"mat4x4<f32>",shadowParams:"vec4<f32>",cascadeSplits:"vec4<f32>"},yl={hard:[[0,0]],pcf:[[-1,-1],[1,-1],[-1,1],[1,1]],"pcf-high":[[-2,-2],[0,-2],[2,-2],[-2,0],[0,0],[2,0],[-2,2],[0,2],[2,2]]},xl={name:"tangentNormalMapping",attributes:{aTangent:"float32x4"},interStage:{vTangent:"vec3<f32>",vBitangent:"vec3<f32>"},gpu:{vertex:{input:`
    tangent = input.aTangent.xyz;
  `,end:`
  let worldTangent = normalize(modelMatrix3 * tangent);
  let worldBitangent = cross(worldNormal, worldTangent) * input.aTangent.w;
  output.vTangent = worldTangent;
  output.vBitangent = worldBitangent;
`},fragment:{material:`
  let normalMapSample = sampleNormal(input.vUV).rgb;
  var tangentNormal = normalMapSample * 2.0 - 1.0;
  tangentNormal = vec3<f32>(tangentNormal.xy * material.normalScale, tangentNormal.z);
  let tbnMatrix = mat3x3<f32>(
    normalize(input.vTangent),
    normalize(input.vBitangent),
    normal
  );
  normal = normalize(tbnMatrix * tangentNormal);
`}},gl:{vertex:{input:`
    tangent = aTangent.xyz;
  `,end:`
  vec3 worldTangent = normalize(modelMatrix3 * tangent);
  vec3 worldBitangent = cross(worldNormal, worldTangent) * aTangent.w;
  vTangent = worldTangent;
  vBitangent = worldBitangent;
`},fragment:{material:`
  vec3 normalMapSample = sampleNormal(vUV).rgb;
  vec3 tangentNormal = normalMapSample * 2.0 - 1.0;
  tangentNormal.xy *= material.normalScale;
  mat3 tbnMatrix = mat3(
    normalize(vTangent),
    normalize(vBitangent),
    normal
  );
  normal = normalize(tbnMatrix * tangentNormal);
`}}},Bo=Object.create(null);function bl(e){const t=Bo[e];if(t)return t;const s={name:`uvs:${e}`,overrideDefs:{HAS_UVS:{type:"u32",required:!0}},attributes:{aUV:e},gpu:{vertex:{input:"uv = vec2<f32>(input.aUV);"}},gl:{vertex:{input:"uv = vec2(aUV);"}}};return Bo[e]=s,s}const vl={name:"vertexColor",attributes:{aColor:"float32x4"},interStage:{vColor:"vec4<f32>"},gpu:{vertex:{end:"output.vColor = input.aColor;"},fragment:{material:`albedo *= input.vColor.rgb;
  alpha *= input.vColor.a;`}},gl:{vertex:{end:"vColor = aColor;"},fragment:{material:`albedo *= vColor.rgb;
  alpha *= vColor.a;`}}};function Ug(e,t,s){V(`[collectAttributes] Attribute "${e}" redefined with different format: "${s}" → "${t}". Keeping original.`)}function Hg(e){const t=Object.create(null);for(const s of e)if(s.attributes)for(const[r,i]of Object.entries(s.attributes))r in t?t[r]!==i&&Ug(r,i,t[r]):t[r]=i;return t}function bi(e,t,s){const r={};for(const i of e){const n=i[t]?.[s];if(n)for(const[o,a]of Object.entries(n))a&&(r[o]??=[],r[o].push(a))}return r}const Io=/\{\{(.*?)\}\}/g,Mo=8;function jg(e,t){let s=e;for(let i=0;i<Mo;i++){const n=s.replace(Io,(o,a)=>{const c=t[a];return c?c.join(`
`):""});if(n===s)break;s=n}const r=s.match(Io);if(r){const i=[...new Set(r)].join(", ");throw new Error(`[fillTemplateSlots] Slot markers still present after ${Mo} substitution passes: ${i}. A slot's code reintroduces its own marker (directly or via another slot) — break the cycle.`)}return s}function qg(e,t){const s=Object.create(null),r=us(t);for(const{name:n}of r)s[n]={resources:Object.create(null),storages:Object.create(null),uniformBuffers:Object.create(null),uniformGroups:Object.create(null)};for(const n of e)if(n.bindings)for(const[o,a]of Object.entries(n.bindings)){const c=s[o];if(c)for(const{name:l,spec:u,uniformGroup:h}of Re(a,o)){const d=hs(u);Fi.has(d)?c.resources[l]=!0:mr(d)?c.storages[l]=!0:gr(d)?c.uniformBuffers[l]=!0:c.uniformGroups[h]=!0}}const i={};return r.forEach(({name:n},o)=>{const a=s[n],c={};let l=0;a.uniformGroups[n]&&(c[l++]=n);for(const u in a.resources)c[l++]=u;for(const u in a.storages)c[l++]=u;for(const u in a.uniformBuffers)c[l++]=u;for(const u in a.uniformGroups)u!==n&&(c[l++]=u);i[o]=c}),i}const Wg=/\{\{(.*?)\}\}/g;function Kg(e){const t={};return(e.match(Wg)?.map(s=>s.replace(/[{()}]/g,""))??[]).forEach(s=>{t[s]=[]}),t}const Po=new Map;function Ki(e){let t=Po.get(e);return t||(t=new Set(Object.keys(Kg(e))),Po.set(e,t)),t}function Cr(e){for(let t=0;t<e.length;t++)if(e[t].bindings?.instance)return!0;return!1}function wl(e){return`vInstance_${e}`}const Yg=/\binstance\b(?:\s*\.\s*([A-Za-z]\w*))?/g,Xg=/\/\/[^\n]*|\/\*[\s\S]*?\*\//g;function Ao(e,t,s,r,i){for(const n of e){const o=n[t]?.[s];if(o)for(const a in o){const c=o[a];if(c)for(const l of c.replace(Xg,"").matchAll(Yg))if(l[1]===void 0)for(const u in r)i.add(u);else l[1]in r&&i.add(l[1])}}}function Sl(e,t,s,r){if(!s){const c=e.find(l=>l.bindings?.instance);throw new Error(`[instanceData] Bit "${c?.name}" reads instance data, but the mesh it draws has none. Draw it as a BatchedMesh3D slot and declare the fields in the batch's instanceData option.`)}const i={};for(const c of e){const l=c.bindings?.instance;if(l)for(const{name:u,spec:h}of Re(l,"instance")){const d=hs(h),f=s.struct[u];if(f!==d)throw new Error(`[instanceData] Bit "${c.name}" reads instance.${u} as ${d}, but the batch `+(f?`declares it as ${f}.`:`has no such field. Its instanceData is: ${s.key}.`));i[u]=f}}const n=new Set;Ao(e,t,"fragment",i,n);const o=new Set(n);Ao(e,t,"vertex",i,o);const a={layout:s,loaded:o,varyings:[...n]};return Zg(r,t,a),a}function Zg(e,t,s){const r=s.varyings.length>0;let i=null;if(t==="gpu"){const n=e.gpu??"";n.includes("{{vertexStoreAccess}}")?r&&!n.includes("{{fragmentStoreAccess}}")&&(i="{{fragmentStoreAccess}}"):i="{{vertexStoreAccess}}"}else e.gl?.vertex.includes("{{storeAccess}}")?r&&!e.gl.fragment.includes("{{storeAccess}}")&&(i="{{storeAccess}} in its fragment source"):i="{{storeAccess}} in its vertex source";if(i)throw new Error(`[instanceData] A bit reads instance data, but the shader template has no ${i}. Add the slot where the draw's store row is in scope, or use the material's own template.`)}const vi={preCompile(e){const t=e.data.structs;t?.Material&&(t.Material=_r(e.bits))}};function Qg(e){return e.includes("u32")?"u32":e.includes("i32")?"i32":"f32"}function Tl(e,t){const s=Li(e),r=new Map;for(const i of s.elements){if(t&&!t.has(i.name))continue;const n=i.offset/4,o=Math.floor(n/4),a=n%4,c=i.components===4?"":`.${"xyzw".slice(a,a+i.components)}`;let l=r.get(o);l||r.set(o,l=[]),l.push({name:i.name,type:i.type,scalar:Qg(i.type),swizzle:c})}return r}function Jg(e,t,s){const r=s;if(!r?.type)throw new Error(`[ShaderBit:${e}] overrideDefs.${t} missing 'type'.`);const i=Object.prototype.hasOwnProperty.call(r,"default"),n=r.required===!0;if(i&&n)throw new Error(`[ShaderBit:${e}] overrideDefs.${t} cannot specify both 'default' and 'required: true'.`);if(!i&&!n)throw new Error(`[ShaderBit:${e}] overrideDefs.${t} must specify either 'default' or 'required: true'.`);if(n)return{type:r.type,required:!0};if(typeof r.default!="number"||!Number.isFinite(r.default))throw new Error(`[ShaderBit:${e}] overrideDefs.${t}.default must be a finite number.`);return{type:r.type,default:r.default,required:!1}}function Cl(e){const t=Object.create(null);for(const s of e)if(s.overrideDefs)for(const[r,i]of Object.entries(s.overrideDefs)){const n=Jg(s.name,r,i),o=t[r];if(o&&(o.type!==n.type||o.required!==n.required||!o.required&&o.default!==n.default))throw new Error(`[ShaderBit overrides] Duplicate override '${r}' has conflicting definitions.
Existing: ${JSON.stringify(o)}
New (from '${s.name}'): ${JSON.stringify(n)}`);t[r]=o??n}return t}function t_(e,t){return e==="u32"?`${Math.trunc(t)}u`:e==="i32"?`${Math.trunc(t)}`:Number.isInteger(t)?`${t}.0`:`${t}`}function e_(e){const t=[];for(const s of Object.keys(e).sort()){const r=e[s];if(r.required)t.push(`override ${s}: ${r.type};`);else{const i=t_(r.type,r.default);t.push(`override ${s}: ${r.type} = ${i};`)}}return t.length?t.join(`
`):""}function s_(e,t){return e==="u32"?`${Math.trunc(t)}`:e==="i32"?`${Math.trunc(t)}`:Number.isInteger(t)?`${t}.0`:`${t}`}function r_(e,t){const s=[];for(const r of Object.keys(e).sort()){const i=e[r],n=t[r],o=n!==void 0;if(i.required&&!o)throw new Error(`[glslOverrides] required override '${r}' has no value supplied via descriptor.overrides.`);const a=o?n:i.default;s.push(`#define ${r} ${s_(i.type,a)}`)}return s.length?s.join(`
`):""}function wi(e,t){for(const r of t)r.collectData?.(e);for(const r of t)r.preCompile?.(e);const s={};for(const r of t){const i=r.injectCode?.(e);if(i)for(const[n,o]of Object.entries(i))!o||!/\S/.test(o)||(s[n]??=[],s[n].push(o))}return jg(e.templateString,s)}function Dl(e,t,s){if(s.has(e))return;s.add(e);const r=e.requires;if(r)for(let i=0;i<r.length;i++)Dl(r[i],t,s);t.push(e)}function Bl(e){const t=[],s=new Set;for(let r=0;r<e.length;r++)Dl(e[r],t,s);return t}const Fo=24;function i_(e,t,s){t.set(e.cameraData.viewProjection.elements,s),t[s+16]=e.bias,t[s+17]=e.normalBias,t[s+18]=e.mapSize,t[s+19]=e.cascadeCount;const r=e.splits;t[s+20]=r?.[0]??1e30,t[s+21]=r?.[1]??1e30,t[s+22]=r?.[2]??1e30,t[s+23]=r?.[3]??1e30}var n_=class{data=new Float32Array(Ft*Fo);_count=0;get count(){return this._count}reset(){this._count=0}add(e){i_(e,this.data,this._count*Fo),this._count++}};const o_=new Set(["r8unorm","rg8unorm","rgba8unorm","rgba8unorm-srgb","bgra8unorm","rgb10a2unorm","r16float","rg16float","rgba16float","rg11b10ufloat"]);function a_(e,t){return t==="rgba8unorm"&&e.type===_t.WEBGL?!1:o_.has(t)}function c_(e){const{camera:t}=e;if(t._view3d!==e)throw new Error("Camera3D is no longer in the View3D scene graph. Don't remove an assigned camera from its parent without reassigning view3d.camera.");if(t.renderTexture)throw new Error("The View3D's own camera draws the view, not a texture. Put the render texture on a second camera and draw from it with a pass that names that camera.");if(!t.visible||t._worldVisible===0)throw new Error("Camera3D is hidden (visible=false or an ancestor is hidden). Cannot render with a hidden camera.")}var Il=class{_managedViews;constructor(e){this._managedViews=new mh({renderer:e,type:"renderable",name:"view3d"}),Qe.on("evict",this._releasePooledTextures)}_releasePooledTextures=()=>{const e=this._managedViews.items;for(const t in e){const s=e[t];s&&s._releasePooledTextures()}};track(e){this._managedViews.add(e)}destroy(){Qe.off("evict",this._releasePooledTextures);const e=Object.values(this._managedViews.items);for(let t=0;t<e.length;t++)e[t]?.unload();this._managedViews.destroy()}},we=class Ml{origin;direction;type="ray";constructor(t,s){this.origin=t!==void 0?t:new F,this.direction=s!==void 0?s:new F(0,0,-1)}set(t,s){return this.origin.copyFrom(t),this.direction.copyFrom(s),this}copyFrom(t){return this.origin.copyFrom(t.origin),this.direction.copyFrom(t.direction),this}copyTo(t){return t.origin.copyFrom(this.origin),t.direction.copyFrom(this.direction),t}clone(){return new Ml().copyFrom(this)}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}at(t,s){return s||=new F,s.x=this.origin.x+this.direction.x*t,s.y=this.origin.y+this.direction.y*t,s.z=this.origin.z+this.direction.z*t,s}closestPointToPoint(t,s){s||=new F;const r=t.x-this.origin.x,i=t.y-this.origin.y,n=t.z-this.origin.z,o=r*this.direction.x+i*this.direction.y+n*this.direction.z;return o<0?s.copyFrom(this.origin):s.copyFrom(this.origin).addScaledVector(this.direction,o)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const s=t.x-this.origin.x,r=t.y-this.origin.y,i=t.z-this.origin.z,n=s*this.direction.x+r*this.direction.y+i*this.direction.z;if(n<0)return this.origin.distanceToSquared(t);const o=this.origin.x+this.direction.x*n,a=this.origin.y+this.direction.y*n,c=this.origin.z+this.direction.z*n,l=o-t.x,u=a-t.y,h=c-t.z;return l*l+u*u+h*h}intersectSphere(t,s){const r=this.intersectSphereT(t);return r===-1?null:this.at(r,s)}intersectSphereT(t){if(t.radius<0)return-1;const s=t.center.x-this.origin.x,r=t.center.y-this.origin.y,i=t.center.z-this.origin.z,n=s*this.direction.x+r*this.direction.y+i*this.direction.z,o=s*s+r*r+i*i-n*n,a=t.radius*t.radius;if(o>a)return-1;const c=Math.sqrt(a-o),l=n-c,u=n+c;return u<0?-1:l<0?u:l}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}intersectPlane(t,s){const r=t.normal.dot(this.direction);if(r===0)return t.distanceToPoint(this.origin)===0?(s||=new F,s.copyFrom(this.origin)):null;const i=-t.distanceToPoint(this.origin)/r;return i<0?null:this.at(i,s)}intersectsPlane(t){const s=t.distanceToPoint(this.origin);return s===0?!0:t.normal.dot(this.direction)*s<0}intersectBox(t,s){const r=this.intersectBoxT(t);return r===-1?null:this.at(r,s)}intersectsBox(t){return this.intersectBoxT(t)!==-1}applyMatrix4(t,s=this){return s!==this&&s.copyFrom(this),s.origin.applyAffineMatrix4(t),s.direction.transformDirection(t),s}intersectBoxT(t){const s=1/this.direction.x,r=1/this.direction.y,i=1/this.direction.z,n=this.origin;let o,a,c,l,u,h;return s>=0?(o=(t.min.x-n.x)*s,a=(t.max.x-n.x)*s):(o=(t.max.x-n.x)*s,a=(t.min.x-n.x)*s),r>=0?(c=(t.min.y-n.y)*r,l=(t.max.y-n.y)*r):(c=(t.max.y-n.y)*r,l=(t.min.y-n.y)*r),o>l||c>a||((c>o||Number.isNaN(o))&&(o=c),(l<a||Number.isNaN(a))&&(a=l),i>=0?(u=(t.min.z-n.z)*i,h=(t.max.z-n.z)*i):(u=(t.max.z-n.z)*i,h=(t.min.z-n.z)*i),o>h||u>a)||((u>o||Number.isNaN(o))&&(o=u),(h<a||Number.isNaN(a))&&(a=h),a<0)?-1:o>=0?o:a}toString(){return`[@pixi/3d/math:Ray origin=(${this.origin.x}, ${this.origin.y}, ${this.origin.z}) direction=(${this.direction.x}, ${this.direction.y}, ${this.direction.z})]`}},rt=class Pl{x=0;y=0;static get shared(){return si.x=0,si.y=0,si}constructor(t=0,s=0){this.x=t,this.y=s}set(t=0,s=t){return this.x=t,this.y=s,this}copyFrom(t){return this.x=t.x,this.y=t.y,this}copyTo(t){return t.set(this.x,this.y),t}equals(t){return t.x===this.x&&t.y===this.y}clone(){return new Pl(this.x,this.y)}toString(){return`[@pixi/3d/math:Vector2 x=${this.x} y=${this.y}]`}fromArray(t,s=0){return this.x=t[s],this.y=t[s+1],this}toArray(t=[],s=0){return t[s]=this.x,t[s+1]=this.y,t}add(t,s=this){return s.x=this.x+t.x,s.y=this.y+t.y,s}subtract(t,s=this){return s.x=this.x-t.x,s.y=this.y-t.y,s}multiply(t,s=this){return s.x=this.x*t.x,s.y=this.y*t.y,s}multiplyScalar(t,s=this){return s.x=this.x*t,s.y=this.y*t,s}divide(t,s=this){return s.x=this.x/t.x,s.y=this.y/t.y,s}divideScalar(t,s=this){return this.multiplyScalar(1/t,s)}addScaledVector(t,s,r=this){return r.x=this.x+t.x*s,r.y=this.y+t.y*s,r}negate(t=this){return t.x=-this.x,t.y=-this.y,t}min(t,s=this){return s.x=Math.min(this.x,t.x),s.y=Math.min(this.y,t.y),s}max(t,s=this){return s.x=Math.max(this.x,t.x),s.y=Math.max(this.y,t.y),s}clamp(t,s,r=this){return r.x=Z(this.x,t.x,s.x),r.y=Z(this.y,t.y,s.y),r}normalize(t=this){const s=1/(Math.sqrt(this.x*this.x+this.y*this.y)||1);return t.x=this.x*s,t.y=this.y*s,t}setLength(t,s=this){const r=t/(Math.sqrt(this.x*this.x+this.y*this.y)||1);return s.x=this.x*r,s.y=this.y*r,s}magnitude(){return Math.sqrt(this.x*this.x+this.y*this.y)}magnitudeSquared(){return this.x*this.x+this.y*this.y}distanceTo(t){const s=this.x-t.x,r=this.y-t.y;return Math.sqrt(s*s+r*r)}distanceToSquared(t){const s=this.x-t.x,r=this.y-t.y;return s*s+r*r}dot(t){return this.x*t.x+this.y*t.y}angle(){return Math.atan2(this.y,this.x)}cross(t){return this.x*t.y-this.y*t.x}applyMatrix3(t,s=this){const r=this.x,i=this.y,n=t.elements;return s.x=n[0]*r+n[3]*i+n[6],s.y=n[1]*r+n[4]*i+n[7],s}rotate(t,s=this){const r=Math.cos(t),i=Math.sin(t),n=this.x,o=this.y;return s.x=n*r-o*i,s.y=n*i+o*r,s}rotateAround(t,s,r=this){const i=Math.cos(s),n=Math.sin(s),o=this.x-t.x,a=this.y-t.y;return r.x=o*i-a*n+t.x,r.y=o*n+a*i+t.y,r}};const si=new rt;function l_(){return{point:new F,normal:new F,uv:new rt,distance:-1,triangleIndex:-1}}function $s(){return{target:null,point:new F,localPoint:new F,normal:new F,uv:new rt,distance:-1,triangleIndex:-1}}function u_(e,t){t.target=e.target,t.point.copyFrom(e.point),t.localPoint.copyFrom(e.localPoint),t.normal.copyFrom(e.normal),t.uv.copyFrom(e.uv),t.distance=e.distance,t.triangleIndex=e.triangleIndex}const zo=1e-7;function h_(e,t,s,r=1/0){if(t.topology!=="triangle-list")return-1;const i=t.bounds3D,n=e.intersectBoxT(i);if(n===-1||n>=r&&!i.containsPoint(e.origin))return-1;const o=t.attributes.aPosition;if(!o)return-1;const a=o.buffer.data;if(!(a instanceof Float32Array))return-1;const c=t.indexBuffer,l=c?c.data:null,u=l?l.length/3:a.length/9,h=e.origin.x,d=e.origin.y,f=e.origin.z,p=e.direction.x,m=e.direction.y,_=e.direction.z;let g=r,b=-1,y=0,v=0,x=0,w=0,T=0;for(let C=0;C<u;C++){const D=l?l[C*3]:C*3,I=l?l[C*3+1]:C*3+1,M=l?l[C*3+2]:C*3+2,P=a[D*3],A=a[D*3+1],z=a[D*3+2],k=a[I*3],O=a[I*3+1],U=a[I*3+2],X=a[M*3],W=a[M*3+1],H=a[M*3+2],N=k-P,j=O-A,K=U-z,J=X-P,at=W-A,st=H-z,yt=m*st-_*at,ne=_*J-p*st,Wt=p*at-m*J,xt=N*yt+j*ne+K*Wt;if(xt>-1e-7&&xt<zo)continue;const St=1/xt,Tt=h-P,Ct=d-A,Dr=f-z,ms=St*(Tt*yt+Ct*ne+Dr*Wt);if(ms<0||ms>1)continue;const Ji=Ct*K-Dr*j,tn=Dr*N-Tt*K,en=Tt*j-Ct*N,Br=St*(p*Ji+m*tn+_*en);if(Br<0||ms+Br>1)continue;const Ir=St*(J*Ji+at*tn+st*en);Ir<zo||Ir>=g||(g=Ir,b=C,y=ms,v=Br,x=j*st-K*at,w=K*J-N*st,T=N*at-j*J)}if(b<0)return-1;const B=Math.sqrt(x*x+w*w+T*T);B>0?s.normal.set(x/B,w/B,T/B):s.normal.set(0,0,0),s.point.set(h+p*g,d+m*g,f+_*g),s.distance=g,s.triangleIndex=b;const S=t.attributes.aUV?.buffer.data;if(S instanceof Float32Array&&l){const C=l[b*3],D=l[b*3+1],I=l[b*3+2],M=1-y-v;s.uv.x=S[C*2]*M+S[D*2]*y+S[I*2]*v,s.uv.y=S[C*2+1]*M+S[D*2+1]*y+S[I*2+1]*v}else if(S instanceof Float32Array){const C=b*3,D=b*3+1,I=b*3+2,M=1-y-v;s.uv.x=S[C*2]*M+S[D*2]*y+S[I*2]*v,s.uv.y=S[C*2+1]*M+S[D*2+1]*y+S[I*2+1]*v}else s.uv.x=y,s.uv.y=v;return g}function d_(e){if(e instanceof wt){const t=e.center,s=Math.sqrt(t.x*t.x+t.y*t.y+t.z*t.z)+Math.max(e.radius,0);return s*s}if(e instanceof Q||e instanceof Y){const{min:t,max:s}=e instanceof Y?e.bounds3D:e,r=Math.max(t.x*t.x,s.x*s.x),i=Math.max(t.y*t.y,s.y*s.y),n=Math.max(t.z*t.z,s.z*s.z);return r+i+n}return e.boundingRadiusSq}function f_(e,t,s,r=1/0){if(t instanceof Q){const i=e.intersectBoxT(t);return i===-1?-1:(e.at(i,s.point),s.distance=i,s.normal.set(0,0,0),s.uv.x=0,s.uv.y=0,s.triangleIndex=-1,i)}if(t instanceof wt){const i=e.intersectSphereT(t);return i===-1?-1:(e.at(i,s.point),s.distance=i,s.normal.set(0,0,0),s.uv.x=0,s.uv.y=0,s.triangleIndex=-1,i)}return t instanceof Y?h_(e,t,s,r):t.raycast(e,s)}const fe={};function Gt(e){const t=e;let s=t._pick3D;return s===void 0&&(s=t._pick3D={token:fe,hit:$s(),hasHit:!1,target:null,currentTarget:null},Object.defineProperties(t,Al)),s}const Al={hit3D:{configurable:!0,get(){const e=Gt(this);return e.token===this.nativeEvent&&e.hasHit?e.hit:null}},target3D:{configurable:!0,get(){const e=Gt(this);return e.token===this.nativeEvent?e.target:null}},currentTarget3D:{configurable:!0,get(){const e=Gt(this);return e.token===this.nativeEvent?e.currentTarget:null}}};Object.defineProperties(gh.prototype,Al);const Fl=["pointerdown","pointerup","pointermove","pointerupoutside","pointerout","pointerover","pointertap","click","tap","rightclick","contextmenu","mousedown","mouseup","mousemove","mouseupoutside","rightdown","rightup","rightupoutside","touchstart","touchmove","touchend","touchendoutside"],ko=200,p_=6e4,zl=Object.create(null);for(const e of[...Fl,"mouseover","mouseout","wheel"])e.endsWith("outside")||(zl[e]={onKey:"on"+e,captureKey:e+"capture"});function ut(e,t,s){const r=e,i=e._events[t];if(i)if("fn"in i)i.once&&r.removeListener(t,i.fn,void 0,!0),i.fn.call(i.context,s);else for(let n=0,o=i.length;n<o&&!s.propagationImmediatelyStopped;n++)i[n].once&&r.removeListener(t,i[n].fn,void 0,!0),i[n].fn.call(i[n].context,s)}let m_=0;const g_=1,Ro=2,ri=3;function Dt(e,t){return e[t]}let Si=!1;Fe.register({clear:()=>{Si=!1}});function ii(e){if(e.length===0)return null;let t=e[0];for(let s=1;s<e.length&&e[s].parent===t;s++)t=e[s];return t}var __=class{_view;_interactiveList=[];enableGlobalMoveEvents=!0;_dynamicPickCount=0;_clipVolumeCount=0;_currentPick3D=null;_hitAreaShape=null;_hitAreaProxy={contains:(e,t)=>{const s=this._hitAreaShape;return s!==null&&!s.contains(e,t)?(this._currentPick3D=null,!1):this._containsPoint(e,t)}};_pointerRecords=new Map;_recordPool=[];_pathPool=[];_clickHistories=new Map;_clickHistoryPool=[];_movePickToken=fe;_movePick3D=null;_cursorFallback;_lastHit=$s();_raycastHit=$s();_scratchWorldRay=new we;_scratchGlobal=new rt;_scratchLocalRay=new we;_scratchNormalMatrix=new E;_scratchWorldPoint=new F;_scratchCenter=new F;_scratchHit=l_();_scratchClipRay=new we;_scratchClipPoint=new F;constructor(e){this._view=e,e.eventMode="static";for(const t of Fl)e.on(t,s=>this._dispatch3DEvent(t,s));e.on("wheel",t=>this._forwardToPick(t,"wheel",this._currentPick3D)),e.on("globalpointermove",t=>this._dispatchGlobalMove(t))}destroy(){for(const[t,s]of this._pointerRecords)this._freePointerRecord(t,s);this._clickHistories=null,this._clickHistoryPool=null,this._recordPool=null,this._pathPool=null;const e=this._interactiveList;for(let t=0;t<e.length;t++)e[t]._pickIndex=-1;e.length=0,this._currentPick3D=null,this._hitAreaShape=null,this._movePick3D=null,this._movePickToken=fe,this._clipVolumeCount=0}get _cursor(){return this._currentPick3D?.cursor??this._cursorFallback}set _cursor(e){this._cursorFallback=e}_containsPoint(e,t){if(!Si&&Mr.defaultEventMode!==void 0&&(Si=!0,Mr.defaultEventMode!=="passive"&&V(`The renderer eventMode default ('${Mr.defaultEventMode}') applies only to 2D containers; 3D nodes default to 'passive'. Set eventMode per node or group.`)),!this._inViewRect(e,t))return this._currentPick3D=null,!1;const s=this._view;return s.worldTransform.apply(this._scratchGlobal.set(e,t),this._scratchGlobal),s.screenToRay(this._scratchGlobal,this._scratchWorldRay,!0),this._currentPick3D=this._pickWithWorldRay(this._scratchWorldRay,this._lastHit)?this._lastHit.target:null,!0}_inViewRect(e,t){const s=this._view,r=s.width,i=s.height,n=(e+s.anchor.x*r)/r,o=(t+s.anchor.y*i)/i;return n>=0&&n<=1&&o>=0&&o<=1}_raycast(e,t){const s=this._view,r=s.worldTransform.applyInverse(e,this._scratchGlobal);if(!this._inViewRect(r.x,r.y))return null;s.screenToRay(e,this._scratchWorldRay,!0);const i=t??this._raycastHit;return this._pickWithWorldRay(this._scratchWorldRay,i)?(t||(this._raycastHit=$s()),i):null}_addInteractive(e){e._pickIndex===-1&&(e._pickIndex=this._interactiveList.push(e)-1,e._eventMode==="dynamic"&&this._changeDynamicCount(1))}_removeInteractive(e,t=e._eventMode==="dynamic"){const s=e._pickIndex;if(s===-1)return;const r=this._interactiveList,i=r.pop();i!==e&&(r[s]=i,i._pickIndex=s),e._pickIndex=-1,this._clearPickState(e),t&&this._changeDynamicCount(-1)}_changeDynamicCount(e){this._dynamicPickCount+=e;const t=this._dynamicPickCount>0?"dynamic":"static",s=this._view.eventMode;(s==="static"||s==="dynamic")&&s!==t&&(this._view.eventMode=t)}_clearPickState(e){this._currentPick3D===e&&(this._currentPick3D=null),this._movePick3D===e&&(this._movePick3D=null)}_pickWithWorldRay(e,t){const s=this._interactiveList,r=e.origin.x,i=e.origin.y,n=e.origin.z,o=this._clipVolumeCount>0?++m_:0;let a=1/0,c=null,l=null,u=!1;for(let h=0;h<s.length;h++){const d=s[h],f=d._hitVolumeResolved??d._getDefaultHitVolume();if(!f||d._worldVisible===0)continue;const p=d.worldTransform.elements;this._scratchCenter.set(p[12],p[13],p[14]);const m=d_(f)*d._getWorldScaleSq();if(e.distanceSqToPoint(this._scratchCenter)>m||o!==0&&!this._passesClipPrefilter(d,e,o))continue;const _=this._toLocalRay(e,d._getInverseWorldTransform());if(f_(this._scratchLocalRay,f,this._scratchHit,a*_)<0)continue;this._scratchHit.point.applyAffineMatrix4(d.worldTransform,this._scratchWorldPoint);const g=this._scratchWorldPoint.x-r,b=this._scratchWorldPoint.y-i,y=this._scratchWorldPoint.z-n,v=Math.sqrt(g*g+b*b+y*y);if(v>=a)continue;const x=this._resolvePickTarget(d,this._scratchWorldPoint);x&&(a=v,c=x,l=d,u=this._scratchHit.triangleIndex!==-1,t.point.copyFrom(this._scratchWorldPoint),t.localPoint.copyFrom(this._scratchHit.point),t.normal.copyFrom(this._scratchHit.normal),t.uv.copyFrom(this._scratchHit.uv),t.triangleIndex=this._scratchHit.triangleIndex)}return c?(u?(l._getInverseWorldTransform().transpose(this._scratchNormalMatrix),t.normal.transformDirection(this._scratchNormalMatrix)):t.normal.set(0,0,0),t.target=c,t.distance=a,!0):!1}_toLocalRay(e,t){const s=this._scratchLocalRay;e.origin.applyAffineMatrix4(t,s.origin);const r=e.direction,i=t.elements,n=i[0]*r.x+i[4]*r.y+i[8]*r.z,o=i[1]*r.x+i[5]*r.y+i[9]*r.z,a=i[2]*r.x+i[6]*r.y+i[10]*r.z,c=Math.sqrt(n*n+o*o+a*a)||1,l=1/c;return s.direction.x=n*l,s.direction.y=o*l,s.direction.z=a*l,c}_resolvePickTarget(e,t=null){const s=t!==null&&this._clipVolumeCount>0;let r=e.isInteractive()?e:null,i=e.parent;for(;i;){if(!i._interactiveChildren||i._eventMode==="none"||s&&i._hitVolumeInput!==null&&!this._clipContains(i,t))return null;r===null&&i.isInteractive()&&(r=i),i=i.parent}return r}_passesClipPrefilter(e,t,s){let r=e.parent;for(;r;){const i=r._hitVolumeInput!==null?r._hitVolumeResolved:null;if(i!==null){if(r._clipRayStamp!==s){r._clipRayStamp=s;const n=t.applyMatrix4(r._getInverseWorldTransform(),this._scratchClipRay);i instanceof Q?r._clipRayHit=n.intersectBoxT(i)!==-1:i instanceof wt?r._clipRayHit=n.intersectSphereT(i)!==-1:i instanceof Y?r._clipRayHit=n.intersectBoxT(i.bounds3D)!==-1:r._clipRayHit=!0}if(!r._clipRayHit)return!1}r=r.parent}return!0}_clipContains(e,t){const s=e._hitVolumeResolved;if(s===null)return!0;const r=t.applyAffineMatrix4(e._getInverseWorldTransform(),this._scratchClipPoint);return s instanceof Q||s instanceof wt?s.containsPoint(r):s instanceof Y?s.bounds3D.containsPoint(r):s.containsPoint===void 0||s.containsPoint(r)}_dispatch3DEvent(e,t){switch(e){case"pointerout":{const s=this._pointerRecords.get(t.pointerId);let r=!1;if(s){s.lastEventTime=t.timeStamp;const i=s.overPath?ii(s.overPath):null;if(s.overPath&&(this._releasePath(s.overPath),s.overPath=null),this._writeFields(t,i,null),i){const n=t.pointerType==="mouse"||t.pointerType==="pen";r=this._emit3DChain(t,"pointerout",i),n&&this._emit3DChain(t,"mouseout",i),this._emitEnterLeaveWalk(t,i,null,!1,n)}s.heldPressCount===0&&this._freePointerRecord(t.pointerId,s)}else this._writeFields(t,null,null);this._currentPick3D=null,r&&this._stopViewPropagation(t);return}case"pointerover":{const s=this._currentPick3D;if(!s){this._writeFields(t,null,null);return}const r=this._getPointerRecord(t.pointerId,t.timeStamp),i=t.pointerType==="mouse"||t.pointerType==="pen";this._writeFields(t,s,s);const n=this._emit3DChain(t,"pointerover",s);i&&this._emit3DChain(t,"mouseover",s),this._emitEnterLeaveWalk(t,s,null,!0,i),r.overPath&&this._releasePath(r.overPath),r.overPath=this._capturePath(s),n&&this._stopViewPropagation(t);return}case"pointerdown":{const s=this._currentPick3D,r=this._getPointerRecord(t.pointerId,t.timeStamp),i=t.button??0,n=r.pressPathByButton[i];n?this._releasePath(n):r.heldPressCount++,r.pressPathByButton[i]=s?this._capturePath(s):this._acquirePath(),r.clickToken=fe,this._forwardToPick(t,e,s);return}case"pointermove":{const s=this._currentPick3D;this._movePickToken=t.nativeEvent,this._movePick3D=s;let r=this._pointerRecords.get(t.pointerId);if(!r&&s&&(r=this._getPointerRecord(t.pointerId,t.timeStamp)),r){r.lastEventTime=t.timeStamp;const i=r.overPath?ii(r.overPath):null;if(i!==s){const n=t.pointerType==="mouse"||t.pointerType==="pen";i&&(this._writeFields(t,i,s),this._emit3DChain(t,"pointerout",i),n&&this._emit3DChain(t,"mouseout",i),this._isInChain(i,s)||this._emitEnterLeaveWalk(t,i,s,!1,n)),s&&(this._writeFields(t,s,s),this._emit3DChain(t,"pointerover",s),n&&this._emit3DChain(t,"mouseover",s),(!i||!this._isInChain(s,i))&&this._emitEnterLeaveWalk(t,s,i,!0,n)),r.overPath&&this._releasePath(r.overPath),r.overPath=s?this._capturePath(s):null}}this._forwardToPick(t,e,s);return}case"pointerup":{const s=this._currentPick3D,r=s?this._capturePath(s):null;let i=!1;this._writeFields(t,s,s),s&&(i=this._emit3DChain(t,e,s,r)),this._reconcileRelease(t,r,!0),r&&this._releasePath(r),i&&this._stopViewPropagation(t);return}case"pointerupoutside":this._writeFields(t,null,null),this._reconcileRelease(t,null,!1);return;case"mouseupoutside":case"rightupoutside":case"touchendoutside":return;case"click":case"rightclick":case"tap":case"pointertap":{const s=this._pointerRecords.get(t.pointerId);if(s&&s.clickToken===t.nativeEvent){const r=s.clickTarget3D;if(this._writeFields(t,r,this._currentPick3D),!r)return;const i=t.detail;t.detail=s.clickDetail;let n;try{n=this._emit3DChain(t,e,r)}finally{t.detail=i}n&&this._stopViewPropagation(t);return}this._forwardToPick(t,e,this._currentPick3D);return}case"mousedown":case"rightdown":case"touchstart":case"mousemove":case"touchmove":case"mouseup":case"rightup":case"touchend":this._forwardToPick(t,e,this._currentPick3D);return;case"contextmenu":this._forwardToPick(t,e,this._currentPick3D);return}}_forwardToPick(e,t,s){this._writeFields(e,s,s),s&&this._emit3DChain(e,t,s)&&this._stopViewPropagation(e)}_reconcileRelease(e,t,s){const r=this._pointerRecords.get(e.pointerId);r&&(r.lastEventTime=e.timeStamp);const i=e.button??0,n=r?r.pressPathByButton[i]:null;if(!r||!n)return;const o=ii(n);r.pressPathByButton[i]=null,r.heldPressCount--,this._releasePath(n);let a=o;o&&(t===null||!t.includes(o))&&(a=this._emitUpOutsideWalk(e,o,t)),s?(r.clickTarget3D=a,r.clickDetail=a?this._countClick(e.pointerId,i,a):0,r.clickToken=e.nativeEvent):r.heldPressCount===0&&this._freePointerRecord(e.pointerId,r)}_emitUpOutsideWalk(e,t,s){const r=e.pointerType;let i=null,n="";r==="touch"?(i="touchendoutside",n="ontouchendoutside"):(r==="mouse"||r==="pen")&&(i=e.button===2?"rightupoutside":"mouseupoutside",n=e.button===2?"onrightupoutside":"onmouseupoutside");const o=Gt(e),a=e,c=a.type,l=e.target,u=e.currentTarget,h=o.target,d=o.currentTarget,f=e.path,p=e.eventPhase,m=e.propagationStopped,_=e.propagationImmediatelyStopped;e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,e.eventPhase=ri,e.target=t,o.target=t;let g=t;try{for(;g&&(s===null||!s.includes(g));)g.isInteractive()&&(e.currentTarget=g,o.currentTarget=g,a.type="pointerupoutside",Dt(g,"onpointerupoutside")?.call(g,e),ut(g,"pointerupoutside",e),i&&(a.type=i,Dt(g,n)?.call(g,e),ut(g,i,e))),g=g.parent}finally{a.type=c,e.target=l,e.currentTarget=u,o.target=h,o.currentTarget=d,e.path=f,e.eventPhase=p,e.propagationStopped=m,e.propagationImmediatelyStopped=_}return g}_isInChain(e,t){let s=t;for(;s;){if(s===e)return!0;s=s.parent}return!1}_countClick(e,t,s){const r=performance.now();let i=this._clickHistories.get(e);i||(this._sweepClickHistories(r),i=this._clickHistoryPool.pop()??{byButton:[],lastClickTime:0},this._clickHistories.set(e,i)),i.lastClickTime=r;let n=i.byButton[t];return n||(n=i.byButton[t]={clickCount:0,target:null,timeStamp:0}),n.target===s&&r-n.timeStamp<ko?n.clickCount++:n.clickCount=1,n.target=s,n.timeStamp=r,n.clickCount}_sweepClickHistories(e){for(const[t,s]of this._clickHistories)if(e-s.lastClickTime>=ko){const r=s.byButton;for(let i=0;i<r.length;i++){const n=r[i];n&&(n.clickCount=0,n.target=null,n.timeStamp=0)}this._clickHistoryPool.push(s),this._clickHistories.delete(t)}}_stopViewPropagation(e){e.propagationStopped=!0,e.propagationImmediatelyStopped=!0}_getPointerRecord(e,t){let s=this._pointerRecords.get(e);return s||(this._sweepStaleRecords(t),s=this._recordPool.pop()??{pressPathByButton:[],heldPressCount:0,overPath:null,lastEventTime:0,clickTarget3D:null,clickDetail:0,clickToken:fe},this._pointerRecords.set(e,s)),s.lastEventTime=t,s}_sweepStaleRecords(e){for(const[t,s]of this._pointerRecords)e-s.lastEventTime>=p_&&this._freePointerRecord(t,s)}_freePointerRecord(e,t){this._pointerRecords.delete(e);const s=t.pressPathByButton;for(let r=0;r<s.length;r++){const i=s[r];i&&(this._releasePath(i),s[r]=null)}t.heldPressCount=0,t.overPath&&(this._releasePath(t.overPath),t.overPath=null),t.clickTarget3D=null,t.clickDetail=0,t.clickToken=fe,this._recordPool.push(t)}_acquirePath(){return this._pathPool.pop()??[]}_releasePath(e){e.length=0,this._pathPool.push(e)}_capturePath(e){const t=this._acquirePath();let s=e;for(;s;)t.push(s),s=s.parent;return t.reverse(),t}_writeFields(e,t,s){const r=Gt(e);s!==null&&u_(this._lastHit,r.hit),r.hasHit=s!==null,r.target=t,r.token=e.nativeEvent}_emit3DChain(e,t,s,r){const i=Gt(e),n=e,o=n.type,a=e.target,c=e.currentTarget,l=i.currentTarget,u=e.path,h=e.eventPhase,d=e.propagationStopped,f=e.propagationImmediatelyStopped;e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,n.type=t,e.target=s;const{onKey:p,captureKey:m}=zl[t],_=r==null,g=r??this._capturePath(s);e.path=g;let b=!1;try{e.eventPhase=g_;for(let y=0,v=g.length-1;y<v;y++){const x=g[y];if(x.isInteractive()&&(e.currentTarget=x,i.currentTarget=x,Dt(x,p)?.call(x,e),ut(x,m,e),e.propagationStopped||e.propagationImmediatelyStopped)){b=!0;break}}if(!b&&s.isInteractive()&&(e.eventPhase=Ro,e.currentTarget=s,i.currentTarget=s,Dt(s,p)?.call(s,e),ut(s,m,e),ut(s,t,e),(e.propagationStopped||e.propagationImmediatelyStopped)&&(b=!0)),!b){e.eventPhase=ri;for(let y=g.length-2;y>=0;y--){const v=g[y];if(v.isInteractive()&&(e.currentTarget=v,i.currentTarget=v,Dt(v,p)?.call(v,e),ut(v,t,e),e.propagationStopped||e.propagationImmediatelyStopped)){b=!0;break}}}}finally{_&&this._releasePath(g),n.type=o,e.target=a,e.currentTarget=c,i.currentTarget=l,e.path=u,e.eventPhase=h,e.propagationStopped=d,e.propagationImmediatelyStopped=f}return b}_emitEnterLeaveWalk(e,t,s,r,i){const n=r?"pointerenter":"pointerleave",o=r?"pointerentercapture":"pointerleavecapture",a=r?"onpointerenter":"onpointerleave",c=r?"mouseenter":"mouseleave",l=r?"mouseentercapture":"mouseleavecapture",u=r?"onmouseenter":"onmouseleave",h=Gt(e),d=e,f=d.type,p=e.target,m=e.currentTarget,_=e.path,g=e.eventPhase,b=e.propagationStopped,y=e.propagationImmediatelyStopped,v=h.target,x=h.currentTarget;e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,e.eventPhase=Ro;let w=t;try{for(;w&&(r?w!==s:!this._isInChain(w,s));)w.isInteractive()&&(h.target=w,h.currentTarget=w,e.target=w,e.currentTarget=w,d.type=n,Dt(w,a)?.call(w,e),ut(w,o,e),ut(w,n,e),i&&(d.type=c,Dt(w,u)?.call(w,e),ut(w,l,e),ut(w,c,e))),w=w.parent}finally{h.target=v,h.currentTarget=x,d.type=f,e.target=p,e.currentTarget=m,e.path=_,e.eventPhase=g,e.propagationStopped=b,e.propagationImmediatelyStopped=y}}_dispatchGlobalMove(e){if(!this.enableGlobalMoveEvents)return;const t=this._interactiveList;if(t.length===0)return;const s=this._movePickToken===e.nativeEvent?this._movePick3D:null;this._writeFields(e,s,s);const r=Gt(e),i=e.pointerType;let n=null,o="";i==="touch"?(n="globaltouchmove",o="onglobaltouchmove"):(i==="mouse"||i==="pen")&&(n="globalmousemove",o="onglobalmousemove");const a=e,c=a.type,l=e.currentTarget,u=r.currentTarget,h=e.eventPhase,d=e.propagationStopped,f=e.propagationImmediatelyStopped;e.propagationStopped=!1,e.propagationImmediatelyStopped=!1,e.eventPhase=ri;try{for(let p=0;p<t.length;p++){const m=t[p],_=m._events;_.globalpointermove===void 0&&!m.onglobalpointermove&&(n===null||_[n]===void 0&&!Dt(m,o))||m.isInteractive()&&m._worldVisible!==0&&this._resolvePickTarget(m)&&(e.currentTarget=m,r.currentTarget=m,a.type="globalpointermove",Dt(m,"onglobalpointermove")?.call(m,e),ut(m,"globalpointermove",e),n&&(a.type=n,Dt(m,o)?.call(m,e),ut(m,n,e)))}}finally{a.type=c,e.currentTarget=l,r.currentTarget=u,e.eventPhase=h,e.propagationStopped=d,e.propagationImmediatelyStopped=f}}};function Ke(e){let t=!1,s=e.parent;for(;s;){const r=s._eventMode;if(r==="none"||!s._interactiveChildren)return 0;(r==="static"||r==="dynamic")&&(t=!0),s=s.parent}return t?2:1}function Ti(e,t,s){const r=e.children;for(let i=0;i<r.length;i++){const n=r[i],o=n._eventMode;if(o==="none")continue;const a=o==="static"||o==="dynamic";(a||o==="auto"||s&&n._hasPickVolume())&&t._addInteractive(n),n._interactiveChildren&&Ti(n,t,s||a)}}function Ci(e,t){const s=e.children;for(let r=0;r<s.length;r++){const i=s[r];i._pickIndex!==-1&&t._removeInteractive(i),i._eventMode!=="none"&&i._interactiveChildren&&Ci(i,t)}}function kl(e,t){const s=e.children;for(let r=0;r<s.length;r++){const i=s[r],n=i._eventMode;n!=="none"&&(n==="static"||n==="dynamic"||(n!=="auto"&&i._hasPickVolume()&&t._addInteractive(i),i._interactiveChildren&&kl(i,t)))}}function Rl(e,t){const s=e.children;for(let r=0;r<s.length;r++){const i=s[r],n=i._eventMode;n!=="none"&&(n==="static"||n==="dynamic"||(n!=="auto"&&i._pickIndex!==-1&&t._removeInteractive(i),i._interactiveChildren&&Rl(i,t)))}}const y_={onclick:null,oncontextmenu:null,onmousedown:null,onmouseenter:null,onmouseleave:null,onmousemove:null,onglobalmousemove:null,onmouseout:null,onmouseover:null,onmouseup:null,onmouseupoutside:null,onpointercancel:null,onpointerdown:null,onpointerenter:null,onpointerleave:null,onpointermove:null,onglobalpointermove:null,onpointerout:null,onpointerover:null,onpointertap:null,onpointerup:null,onpointerupoutside:null,onrightclick:null,onrightdown:null,onrightup:null,onrightupoutside:null,ontap:null,ontouchcancel:null,ontouchend:null,ontouchendoutside:null,ontouchmove:null,onglobaltouchmove:null,ontouchstart:null,onwheel:null,_eventMode:void 0,get eventMode(){return this._eventMode??"passive"},set eventMode(e){const t=this._eventMode??"passive";if(this._eventMode=e,!this._view3d||e===t)return;const s=this._view3d.events,r=t==="dynamic";let i=-1,n=!1;e!=="none"&&(this._isPickCandidate()||this._hasPickVolume())&&(i=Ke(this),i!==0&&(n=this._isPickCandidate()||i===2));const o=this._pickIndex!==-1;n!==o?n?s._addInteractive(this):s._removeInteractive(this,r):o&&r!==(e==="dynamic")&&s._changeDynamicCount(e==="dynamic"?1:-1);const a=t==="static"||t==="dynamic",c=e==="static"||e==="dynamic",l=t==="none"||!this._interactiveChildren,u=e==="none"||!this._interactiveChildren;a===c&&l===u||l&&u||this.children.length===0||(i===-1&&(i=Ke(this)),i!==0&&(u?Ci(this,s):l?Ti(this,s,c||i===2):i!==2&&(c?kl(this,s):Rl(this,s))))},get interactive(){return this.isInteractive()},set interactive(e){this.eventMode=e?"static":"passive"},isInteractive(){return this._eventMode==="static"||this._eventMode==="dynamic"},_isPickCandidate(){return this._eventMode==="static"||this._eventMode==="dynamic"||this._eventMode==="auto"},_pickIndex:-1,_hasPickVolume(){return this._hitVolumeInput!==null||this._getDefaultHitVolume()!==null},_interactiveChildren:!0,get interactiveChildren(){return this._interactiveChildren},set interactiveChildren(e){const t=this._interactiveChildren;if(this._interactiveChildren=e,!this._view3d||e===t||this.children.length===0||this._eventMode==="none")return;const s=Ke(this);if(s===0)return;const r=this._view3d.events;e?Ti(this,r,this.isInteractive()||s===2):Ci(this,r)},cursor:null,_hitVolumeInput:null,_hitVolumeResolved:null,_clipRayStamp:0,_clipRayHit:!1,get hitVolume(){return this._hitVolumeInput},set hitVolume(e){const t=this._hitVolumeInput!==null;this._hitVolumeInput=e,this._hitVolumeResolved=La(this,e),this._view3d&&(t!==(e!==null)&&(this._view3d.events._clipVolumeCount+=e!==null?1:-1),!(this._eventMode!==void 0&&this._eventMode!=="passive")&&(this._hasPickVolume()&&Ke(this)===2?this._view3d.events._addInteractive(this):this._view3d.events._removeInteractive(this)))},_getDefaultHitVolume(){return null},_invWorldTransform:null,_invWorldTransformId:-1,_worldScaleSq:0,_worldScaleSqId:-1,_getInverseWorldTransform(){return this._invWorldTransform===null&&(this._invWorldTransform=new E,this._invWorldTransformId=-1),this._invWorldTransformId!==this._worldTransformId&&(this._invWorldTransform.getInverse(this.worldTransform),this._invWorldTransformId=this._worldTransformId),this._invWorldTransform},_getWorldScaleSq(){return this._worldScaleSqId!==this._worldTransformId&&(this._worldScaleSq=this.worldTransform.getMaxSingularValueSq(),this._worldScaleSqId=this._worldTransformId),this._worldScaleSq}},x_={containsPoint(e){return this.events._containsPoint(e.x,e.y)},get cursor(){return this.events._cursor},set cursor(e){this.events._cursor=e},get hitArea(){return this.events._hitAreaShape!==null?this.events._hitAreaProxy:null},set hitArea(e){e!==this.events._hitAreaProxy&&(this.events._hitAreaShape=e??null)},raycast(e,t){return this.events._raycast(e,t)}};function Ie(e,t){return Number.isFinite(e)?Math.max(t,Math.floor(e)):t}function Ll(e,t,s,r,i,n){const o=Ie(r,3),a=Ie(i,1),c=s*.5,l=(t-e)/s,u=1/Math.sqrt(1+l*l),h=l*u,d=1/o,f=1/a,p=o+1,m=new Float32Array(p),_=new Float32Array(p),g=Math.PI*2*d;for(let H=0;H<p;H++){const N=H*g;m[H]=Math.sin(N),_[H]=Math.cos(N)}const b=e===0,y=t===0,v=p*(a+1),x=o*a*6-((b?o*3:0)+(y?o*3:0)),w=!n&&!b,T=!n&&!y,B=w?p+1:0,S=T?p+1:0,C=w?o*3:0,D=T?o*3:0,I=v+B+S,M=x+C+D,P=new Float32Array(I*3),A=new Float32Array(I*3),z=new Float32Array(I*2),k=new(I>65536?Uint32Array:Uint16Array)(M);let O=0,U=0,X=0,W=0;for(let H=0;H<=a;H++){const N=H*f,j=N*(t-e)+e,K=c-N*s;for(let J=0;J<=o;J++){const at=J*d,st=m[J],yt=_[J];P[O++]=j*yt,P[O++]=K,P[O++]=j*st,A[U++]=yt*u,A[U++]=h,A[U++]=st*u,z[X++]=at,z[X++]=N}}for(let H=0;H<a;H++){const N=b&&H===0,j=y&&H===a-1;for(let K=0;K<o;K++){const J=H*p+K,at=J+1,st=J+p,yt=st+1;N||(k[W++]=J,k[W++]=at,k[W++]=st),j||(k[W++]=at,k[W++]=yt,k[W++]=st)}}if(w){const H=O/3;P[O++]=0,P[O++]=c,P[O++]=0,A[U++]=0,A[U++]=1,A[U++]=0,z[X++]=.5,z[X++]=.5;for(let N=0;N<=o;N++){const j=_[N],K=m[N];P[O++]=e*j,P[O++]=c,P[O++]=e*K,A[U++]=0,A[U++]=1,A[U++]=0,z[X++]=j*.5+.5,z[X++]=K*.5+.5}for(let N=0;N<o;N++)k[W++]=H,k[W++]=H+N+2,k[W++]=H+N+1}if(T){const H=O/3;P[O++]=0,P[O++]=-c,P[O++]=0,A[U++]=0,A[U++]=-1,A[U++]=0,z[X++]=.5,z[X++]=.5;for(let N=0;N<=o;N++){const j=_[N],K=m[N];P[O++]=t*j,P[O++]=-c,P[O++]=t*K,A[U++]=0,A[U++]=-1,A[U++]=0,z[X++]=j*.5+.5,z[X++]=K*.5+.5}for(let N=0;N<o;N++)k[W++]=H,k[W++]=H+N+1,k[W++]=H+N+2}return{positions:P,normals:A,uvs:z,indices:k}}var Fx=class El extends Y{static defaultOptions={...Y.defaultOptions,radius:1,height:2,radialSegments:32,heightSegments:1,openEnded:!1};constructor(t={}){const s={...El.defaultOptions,...t},{radius:r,height:i,radialSegments:n,heightSegments:o,openEnded:a}=s,c=Ll(0,r,i,n,o,a);super({...s,...c})}},zx=class Vl extends Y{static defaultOptions={...Y.defaultOptions,radiusTop:1,radiusBottom:1,height:2,radialSegments:32,heightSegments:1,openEnded:!1};constructor(t={}){const s={...Vl.defaultOptions,...t},{radiusTop:r,radiusBottom:i,height:n,radialSegments:o,heightSegments:a,openEnded:c}=s,l=Ll(r,i,n,o,a,c);super({...s,...l})}};const b_=1024,v_=2048;var w_=class{uid=_h("geometryAtlas");attributeKey;vertexStride=0;_vertexBuffer;_indexBuffer;_retiredBuffers=[];_retiredGeometries=[];_vertexCount=0;_indexCount=0;_deadVertexCount=0;_deadIndexCount=0;_liveAllocations=[];_vertexDirtyMin=1/0;_vertexDirtyMax=-1/0;_indexDirtyMin=1/0;_indexDirtyMax=-1/0;_bufferVersion=0;geometry;_attributeInfo;rebaseIndices;constructor(e){const{referenceGeometry:t,initialVertexCapacity:s=b_,initialIndexCapacity:r=v_,rebaseIndices:i=!1}=e;this.rebaseIndices=i,this.attributeKey=t.attributeKey;const n=t.attributes,o=Object.keys(n).sort();if(!o.some(c=>!n[c].instance))throw new Error("GeometryAtlas: reference geometry has no vertex attributes");let a=0;this._attributeInfo=[];for(const c of o){const l=n[c];if(l.instance)continue;const u=l.format,h=hr(u).stride;a=er(a);const d=a;a+=h,this._attributeInfo.push({name:c,format:u,offset:d,byteSize:h})}this.vertexStride=er(a),this._vertexBuffer=new ct({data:new Uint8Array(s*this.vertexStride),usage:G.VERTEX|G.COPY_DST,label:"GeometryAtlas-vertex",shrinkToFit:!1}),this._indexBuffer=new ct({data:new Uint32Array(r),usage:G.INDEX|G.COPY_DST,label:"GeometryAtlas-index",shrinkToFit:!1}),this.geometry=this._buildMergedGeometry()}add(e){const t=e._geometryAtlasAllocation;if(t&&t.atlas===this)return t;for(const g in e.attributes)if(e.attributes[g].instance)throw new Error(`GeometryAtlas: Cannot add geometry with instance attribute "${g}". The Atlas is for merging vertex data only; instance data would be lost.`);if(e.attributeKey!==this.attributeKey)throw new Error(`GeometryAtlas: attribute structure mismatch. Expected "${this.attributeKey}", got "${e.attributeKey}"`);const s=e.vertexCount,r=e.indexBuffer.data,i=r.length,n=this._vertexBuffer.data.byteLength/this.vertexStride,o=this._indexBuffer.data.length,a=this._vertexCount+s>n,c=this._indexCount+i>o;if(a||c){const g=this._vertexCount-this._deadVertexCount,b=this._indexCount-this._deadIndexCount,y=g+s<=n,v=b+i<=o;y&&v?this.defragment():((this._deadVertexCount>0||this._deadIndexCount>0)&&this.defragment(),this._ensureVertexCapacity(this._vertexCount+s),this._ensureIndexCapacity(this._indexCount+i))}const l=this._vertexCount,u=this._indexCount;this._vertexCount+=s,this._indexCount+=i;const h=this._vertexBuffer.data,d=this._indexBuffer.data,f=this.vertexStride,p=l*f,m=s*f;if(this._matchesAtlasLayout(e)){const g=e.attributes[this._attributeInfo[0].name].buffer.data;h.set(new Uint8Array(g.buffer,g.byteOffset,m),p)}else{const g=new Uint32Array(h.buffer);for(const{name:b,offset:y,byteSize:v}of this._attributeInfo){const x=e.attributes[b],w=x.buffer.data,T=x.stride??v,B=x.offset??0;if(((w.byteOffset|B|T|v)&3)===0){const S=new Uint32Array(w.buffer,w.byteOffset,w.byteLength>>2),C=T>>2,D=f>>2;let I=B>>2,M=p+y>>2;for(let P=0;P<s;P++)g[M]=S[I],v>4&&(g[M+1]=S[I+1]),v>8&&(g[M+2]=S[I+2]),v>12&&(g[M+3]=S[I+3]),I+=C,M+=D}else{const S=new Uint8Array(w.buffer,w.byteOffset,w.byteLength);let C=B,D=p+y;for(let I=0;I<s;I++){for(let M=0;M<v;M++)h[D+M]=S[C+M];C+=T,D+=f}}}}if(this._markVertexDirty(p,p+m),this.rebaseIndices)for(let g=0;g<i;g++)d[u+g]=r[g]+l;else d.set(r,u);this._markIndexDirty(u,u+i);const _={atlas:this,baseVertex:l,firstIndex:u,indexCount:i,vertexCount:s};return e._geometryAtlasAllocation=_,e._atlasVacated=!1,this._liveAllocations.push(_),_}remove(e){const t=e._geometryAtlasAllocation;if(!t||(e._geometryAtlasAllocation=null,e._atlasVacated=!0,this._vertexBuffer===null))return;this._deadVertexCount+=t.vertexCount,this._deadIndexCount+=t.indexCount;const s=this._liveAllocations.indexOf(t);s!==-1&&this._liveAllocations.splice(s,1)}update(){if(this._vertexDirtyMin<this._vertexDirtyMax){const e=this._vertexDirtyMax-this._vertexDirtyMin;this._vertexBuffer.update(e,this._vertexDirtyMin),this._vertexDirtyMin=1/0,this._vertexDirtyMax=-1/0}if(this._indexDirtyMin<this._indexDirtyMax){const e=this._indexDirtyMin*4,t=(this._indexDirtyMax-this._indexDirtyMin)*4;this._indexBuffer.update(t,e),this._indexDirtyMin=1/0,this._indexDirtyMax=-1/0}}_matchesAtlasLayout(e){const t=e.attributes,s=t[this._attributeInfo[0].name].buffer;for(const r of this._attributeInfo){const i=t[r.name];if(i.buffer!==s||i.stride!==this.vertexStride||(i.offset??0)!==r.offset)return!1}return!0}_buildMergedGeometry(){const e=new cs;for(const{name:t,format:s,offset:r}of this._attributeInfo)e.addAttribute(t,{buffer:this._vertexBuffer,format:s,stride:this.vertexStride,offset:r});return e.addIndex(this._indexBuffer),e}_markVertexDirty(e,t){e<this._vertexDirtyMin&&(this._vertexDirtyMin=e),t>this._vertexDirtyMax&&(this._vertexDirtyMax=t)}_markIndexDirty(e,t){e<this._indexDirtyMin&&(this._indexDirtyMin=e),t>this._indexDirtyMax&&(this._indexDirtyMax=t)}_retireCurrentGeometry(){this.geometry&&(this.geometry.indexBuffer=null,this._retiredGeometries.push(this.geometry))}_ensureVertexCapacity(e){const t=this._vertexBuffer.data;let s=t.byteLength/this.vertexStride;if(e<=s)return;for(;s<e;)s*=2;const r=new Uint8Array(s*this.vertexStride);r.set(t),this._retiredBuffers.push(this._vertexBuffer),this._vertexBuffer=new ct({data:r,usage:G.VERTEX|G.COPY_DST,label:"GeometryAtlas-vertex",shrinkToFit:!1}),this._markVertexDirty(0,this._vertexCount*this.vertexStride),this._retireCurrentGeometry(),this.geometry=this._buildMergedGeometry(),this._bufferVersion++}_ensureIndexCapacity(e){const t=this._indexBuffer.data;let s=t.length;if(e<=s)return;for(;s<e;)s*=2;const r=new Uint32Array(s);r.set(t),this._retiredBuffers.push(this._indexBuffer),this._indexBuffer=new ct({data:r,usage:G.INDEX|G.COPY_DST,label:"GeometryAtlas-index",shrinkToFit:!1}),this._markIndexDirty(0,this._indexCount),this._retireCurrentGeometry(),this.geometry=this._buildMergedGeometry(),this._bufferVersion++}destroy(){if(this._vertexBuffer!==null){this.geometry&&(this.geometry.indexBuffer=null),this.geometry?.destroy(!1),this.geometry=null,this._vertexBuffer.destroy(),this._indexBuffer.destroy();for(let e=0;e<this._retiredGeometries.length;e++)this._retiredGeometries[e].destroy(!1);this._retiredGeometries=null;for(let e=0;e<this._retiredBuffers.length;e++)this._retiredBuffers[e].destroy();this._retiredBuffers=null,this._vertexBuffer=null,this._indexBuffer=null,this._liveAllocations=null}}defragment(){if(this._deadVertexCount===0&&this._deadIndexCount===0)return;const e=this.vertexStride,t=this._vertexBuffer.data,s=this._indexBuffer.data;let r=0,i=0;const n=this.rebaseIndices;for(const o of this._liveAllocations){const a=o.baseVertex;if(a!==r){const c=a*e,l=r*e,u=o.vertexCount*e;t.copyWithin(l,c,c+u),o.baseVertex=r}if(r+=o.vertexCount,o.firstIndex!==i&&(s.copyWithin(i,o.firstIndex,o.firstIndex+o.indexCount),o.firstIndex=i),n&&a!==o.baseVertex){const c=o.baseVertex-a;for(let l=0;l<o.indexCount;l++)s[o.firstIndex+l]+=c}i+=o.indexCount}this._markVertexDirty(0,r*e),this._markIndexDirty(0,i),this._vertexCount=r,this._indexCount=i,this._deadVertexCount=0,this._deadIndexCount=0,this._bufferVersion++}};const Lo=Object.create(null);var Gl=class Ol{_atlases=Object.create(null);_rebaseIndices;_bufferVersion=0;constructor(t){this._rebaseIndices=t.rebaseIndices}static from(t){const s=t.rebaseIndices?"rebased":"geometryLocal";let r=Lo[s];return r||(r=new Ol(t),Lo[s]=r,Fe.register(r)),r}get bufferVersion(){return this._bufferVersion}allocate(t){const s=t.attributeKey;let r=this._atlases[s];const i=t._geometryAtlasAllocation;if(i&&i.atlas===r)return i;r||(r=new w_({referenceGeometry:t,rebaseIndices:this._rebaseIndices}),this._atlases[s]=r);const n=r._bufferVersion,o=r.add(t);return r._bufferVersion!==n&&this._bufferVersion++,o}update(){for(const t in this._atlases)this._atlases[t].update()}clear(){for(const t in this._atlases)this._atlases[t].destroy();this._atlases=Object.create(null)}};const S_=7;var kx=class Nl extends Y{static defaultOptions={...Y.defaultOptions,radius:1,detail:0};constructor(t={}){const s={...Nl.defaultOptions,...t},{radius:r}=s,i=s.detail,n=Number.isFinite(i)?Math.max(0,Math.min(S_,Math.floor(i))):0,o=(1+Math.sqrt(5))/2,a=[-1,o,0,1,o,0,-1,-o,0,1,-o,0,0,-1,o,0,1,o,0,-1,-o,0,1,-o,o,0,-1,o,0,1,-o,0,-1,-o,0,1],c=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],l=10*4**n+2,u=new Float32Array(l*3),h=new Float32Array(l*3),d=new Float32Array(l*2);let f=0;const p=(x,w,T)=>{const B=Math.sqrt(x*x+w*w+T*T),S=x/B,C=w/B,D=T/B,I=f,M=I*3;u[M]=S*r,u[M+1]=C*r,u[M+2]=D*r,h[M]=S,h[M+1]=C,h[M+2]=D;const P=.5+Math.atan2(D,S)/(2*Math.PI),A=.5-Math.asin(C)/Math.PI,z=I*2;return d[z]=P,d[z+1]=A,f++,I};for(let x=0;x<a.length;x+=3)p(a[x],a[x+1],a[x+2]);const m=new Map,_=(x,w)=>{const T=x<w?x:w,B=x<w?w:x,S=T*1048576+B,C=m.get(S);if(C!==void 0)return C;const D=T*3,I=B*3,M=(u[D]+u[I])/2,P=(u[D+1]+u[I+1])/2,A=(u[D+2]+u[I+2])/2,z=p(M,P,A);return m.set(S,z),z};let g=new Uint32Array(c.length);for(let x=0;x<c.length;x++)g[x]=c[x];let b=c.length/3;for(let x=0;x<n;x++){const w=new Uint32Array(b*4*3);let T=0;for(let B=0;B<b;B++){const S=B*3,C=g[S],D=g[S+1],I=g[S+2],M=_(C,D),P=_(D,I),A=_(I,C);w[T]=C,w[T+1]=M,w[T+2]=A,w[T+3]=D,w[T+4]=P,w[T+5]=M,w[T+6]=I,w[T+7]=A,w[T+8]=P,w[T+9]=M,w[T+10]=P,w[T+11]=A,T+=12}g=w,b*=4}const y=b*3,v=f>65536?new Uint32Array(y):new Uint16Array(y);for(let x=0;x<y;x++)v[x]=g[x];super({...s,positions:u,normals:h,uvs:d,indices:v})}},Rx=class $l extends Y{static defaultOptions={...Y.defaultOptions,radius:1,widthSegments:32,heightSegments:16};constructor(t={}){const s={...$l.defaultOptions,...t},{radius:r}=s,i=Ie(s.widthSegments,3),n=Ie(s.heightSegments,2),o=(i+1)*(n+1),a=(n-1)*i*2,c=new Float32Array(o*3),l=new Float32Array(o*3),u=new Float32Array(o*2),h=o<=65536?new Uint16Array(a*3):new Uint32Array(a*3),d=new Float64Array(n+1),f=new Float64Array(n+1);for(let v=0;v<=n;v++){const x=v/n*Math.PI;d[v]=Math.sin(x),f[v]=Math.cos(x)}const p=new Float64Array(i+1),m=new Float64Array(i+1);for(let v=0;v<=i;v++){const x=v/i*Math.PI*2;p[v]=Math.sin(x),m[v]=Math.cos(x)}let _=0,g=0;for(let v=0;v<=n;v++){const x=v/n,w=d[v],T=f[v];for(let B=0;B<=i;B++){const S=B/i,C=p[B],D=w*m[B],I=T,M=w*C;c[_]=D*r,c[_+1]=I*r,c[_+2]=M*r,l[_]=D,l[_+1]=I,l[_+2]=M,_+=3,u[g]=S,u[g+1]=x,g+=2}}const b=i+1;let y=0;for(let v=0;v<n;v++)for(let x=0;x<i;x++){const w=v*b+x,T=w+1,B=w+b,S=B+1;v!==0&&(h[y]=w,h[y+1]=T,h[y+2]=B,y+=3),v!==n-1&&(h[y]=T,h[y+1]=S,h[y+2]=B,y+=3)}super({...s,positions:c,normals:l,uvs:u,indices:h})}},Lx=class Ul extends Y{static defaultOptions={...Y.defaultOptions,radius:1,tube:.4,radialSegments:12,tubularSegments:48,arc:Math.PI*2,thetaStart:0,thetaLength:Math.PI*2};constructor(t={}){const s={...Ul.defaultOptions,...t},{radius:r,tube:i,arc:n,thetaStart:o,thetaLength:a}=s,c=Ie(s.radialSegments,3),l=Ie(s.tubularSegments,3),u=(c+1)*(l+1),h=c*l*6,d=new Float32Array(u*3),f=new Float32Array(u*3),p=new Float32Array(u*2),m=u>65536?new Uint32Array(h):new Uint16Array(h),_=new Float64Array(l+1),g=new Float64Array(l+1);for(let T=0;T<=l;T++){const B=T/l*n;_[T]=Math.cos(B),g[T]=Math.sin(B)}let b=0,y=0,v=0;for(let T=0;T<=c;T++){const B=o+T/c*a,S=Math.cos(B),C=Math.sin(B),D=T/c,I=r+i*S,M=i*C;for(let P=0;P<=l;P++){const A=_[P],z=g[P];d[b++]=I*A,d[b++]=M,d[b++]=I*z,f[y++]=S*A,f[y++]=C,f[y++]=S*z,p[v++]=P/l,p[v++]=D}}const x=l+1;let w=0;for(let T=1;T<=c;T++)for(let B=1;B<=l;B++){const S=x*T+B-1,C=x*(T-1)+B-1,D=x*(T-1)+B,I=x*T+B;m[w++]=S,m[w++]=I,m[w++]=C,m[w++]=C,m[w++]=I,m[w++]=D}super({...s,positions:d,normals:f,uvs:p,indices:m})}};const T_={float32:{View:Float32Array,scale:1,min:-1/0},snorm8:{View:Int8Array,scale:1/127,min:-1},unorm8:{View:Uint8Array,scale:1/255,min:-1/0},sint8:{View:Int8Array,scale:1,min:-1/0},uint8:{View:Uint8Array,scale:1,min:-1/0},snorm16:{View:Int16Array,scale:1/32767,min:-1},unorm16:{View:Uint16Array,scale:1/65535,min:-1/0},sint16:{View:Int16Array,scale:1,min:-1/0},uint16:{View:Uint16Array,scale:1,min:-1/0},sint32:{View:Int32Array,scale:1,min:-1/0},uint32:{View:Uint32Array,scale:1,min:-1/0}};function Ex(e,t,s,r){const i=e.getAttribute(t);if(!i)throw new Error(`[getAttributeData] The geometry has no ${t} attribute.`);const n=i.format,o=n&&T_[n.split("x",1)[0]],a=o&&hr(n);if(!a||s>a.size)throw new Error(`[getAttributeData] Can't read ${t}, stored as ${n??"no format"}, as ${s} floats per vertex.`);const{View:c,scale:l,min:u}=o,h=i.buffer.data,d=new c(h.buffer,h.byteOffset,Math.floor(h.byteLength/c.BYTES_PER_ELEMENT)),f=(i.stride||a.stride)/c.BYTES_PER_ELEMENT,p=(i.offset??0)/c.BYTES_PER_ELEMENT,m=Math.floor(d.length/f),_=m*s,g=r??new Float32Array(_);for(let b=0;b<m;b++){const y=b*f+p,v=b*s;for(let x=0;x<s;x++){const w=d[y+x]*l;g[v+x]=w<u?u:w}}return g}var Eo=class Hl{radius=0;phi=0;theta=0;type="spherical";constructor(t=1,s=0,r=0){this.radius=t,this.phi=s,this.theta=r}set(t,s,r){return this.radius=t,this.phi=s,this.theta=r,this}copyFrom(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}copyTo(t){return t.radius=this.radius,t.phi=this.phi,t.theta=this.theta,t}clone(){return new Hl().copyFrom(this)}equals(t){return t.radius===this.radius&&t.phi===this.phi&&t.theta===this.theta}makeSafe(){return this.phi=Z(this.phi,1e-6,Math.PI-1e-6),this}setFromPoint3D(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,s,r){return this.radius=Math.sqrt(t*t+s*s+r*r),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,r),this.phi=Math.acos(Z(s/this.radius,-1,1))),this}toString(){return`[@pixi/3d/math:Spherical radius=${this.radius} phi=${this.phi} theta=${this.theta}]`}};const C_={name:"effectFxh",attributes:{aPosition:"float32x2"},interStage:{vUv:"vec2<f32>"},bindings:{fxh:{uFxClip:"vec4<f32>",uFxTexel:"vec4<f32>",uFxInputClamp:"vec4<f32>",uFxInput2Clamp:"vec4<f32>"}},gpu:{header:`
fn linearDepth(d: f32) -> f32 {
  let n = fxh.uFxClip.x;
  let f = fxh.uFxClip.y;
  let z = d * 2.0 - 1.0;
  return 2.0 * n * f / (f + n - z * (f - n));
}
fn texel() -> vec2<f32> {
  return fxh.uFxTexel.xy;
}
fn viewTexel() -> vec2<f32> {
  return fxh.uFxTexel.xy * fxh.uFxTexel.w;
}
fn fxInputUv(uv: vec2<f32>, clampRect: vec4<f32>) -> vec2<f32> {
  return clamp(uv * (clampRect.xy + clampRect.zw), clampRect.xy, clampRect.zw);
}
`},gl:{header:`
float linearDepth(float d) {
  float n = uFxClip.x;
  float f = uFxClip.y;
  float z = d * 2.0 - 1.0;
  return 2.0 * n * f / (f + n - z * (f - n));
}
vec2 texel() {
  return uFxTexel.xy;
}
vec2 viewTexel() {
  return uFxTexel.xy * uFxTexel.w;
}
vec2 fxInputUv(vec2 uv, vec4 clampRect) {
  return clamp(uv * (clampRect.xy + clampRect.zw), clampRect.xy, clampRect.zw);
}
`}},D_={name:"effectColorRead",bindings:{fx:{uTexture:"texture_2d<f32>",uTextureSampler:"sampler"}},gpu:{header:`
fn sampleColor(uv: vec2<f32>) -> vec4<f32> {
  return textureSampleLevel(uTexture, uTextureSampler, fxInputUv(uv, fxh.uFxInputClamp), 0.0);
}
fn sampleColorLod(uv: vec2<f32>, lod: f32) -> vec4<f32> {
  return textureSampleLevel(uTexture, uTextureSampler, fxInputUv(uv, fxh.uFxInputClamp), lod);
}
fn inputTexel() -> vec2<f32> {
  return 1.0 / (vec2<f32>(textureDimensions(uTexture, 0)) * (fxh.uFxInputClamp.xy + fxh.uFxInputClamp.zw));
}
`},gl:{header:`
vec4 sampleColor(vec2 uv) {
  return textureLod(uTexture, fxInputUv(uv, uFxInputClamp), 0.0);
}
vec4 sampleColorLod(vec2 uv, float lod) {
  return textureLod(uTexture, fxInputUv(uv, uFxInputClamp), lod);
}
vec2 inputTexel() {
  return 1.0 / (vec2(textureSize(uTexture, 0)) * (uFxInputClamp.xy + uFxInputClamp.zw));
}
`}},B_={name:"effectColor2Read",bindings:{fx:{uTexture2:"texture_2d<f32>",uTexture2Sampler:"sampler"}},gpu:{header:`
fn sampleColor2(uv: vec2<f32>) -> vec4<f32> {
  return textureSampleLevel(uTexture2, uTexture2Sampler, fxInputUv(uv, fxh.uFxInput2Clamp), 0.0);
}
`},gl:{header:`
vec4 sampleColor2(vec2 uv) {
  return textureLod(uTexture2, fxInputUv(uv, uFxInput2Clamp), 0.0);
}
`}},I_={name:"effectDepthRead",bindings:{fx:{uFxDepthTexture:"texture_depth_2d"}},gpu:{header:`
fn fxDepthContent() -> vec2<f32> {
  return round(camera.uViewportUVScale * vec2<f32>(textureDimensions(uFxDepthTexture, 0)));
}
fn depthTexel() -> vec2<f32> {
  return 1.0 / fxDepthContent();
}
fn sampleDepth(uv: vec2<f32>) -> f32 {
  let content = fxDepthContent();
  let coord = min(vec2<i32>(clamp(uv, vec2<f32>(0.0), vec2<f32>(1.0)) * content), vec2<i32>(content) - 1);
  return textureLoad(uFxDepthTexture, coord, 0);
}
fn viewPos(uv: vec2<f32>) -> vec3<f32> {
  let lz = linearDepth(sampleDepth(uv));
  let ndc = uv * 2.0 - 1.0;
  return vec3<f32>(ndc.x * lz / fxh.uFxClip.z, ndc.y * lz / fxh.uFxClip.w, -lz);
}
`}},M_={name:"effectDepthRead",bindings:{fx:{uFxDepthTexture:"texture_2d<f32>"}},gl:{header:`
vec2 fxDepthContent() {
  return round(uViewportUVScale * vec2(textureSize(uFxDepthTexture, 0)));
}
vec2 depthTexel() {
  return 1.0 / fxDepthContent();
}
float sampleDepth(vec2 uv) {
  vec2 content = fxDepthContent();
  ivec2 coord = min(ivec2(clamp(uv, 0.0, 1.0) * content), ivec2(content) - 1);
  return texelFetch(uFxDepthTexture, coord, 0).r;
}
vec3 viewPos(vec2 uv) {
  float lz = linearDepth(sampleDepth(uv));
  vec2 ndc = uv * 2.0 - 1.0;
  return vec3(ndc.x * lz / uFxClip.z, ndc.y * lz / uFxClip.w, -lz);
}
`}},P_={bindGroups:[{name:"global",ubo:!0},"camera","fx","fxh"],gpu:`
{{header}}

@vertex
fn mainVertex(input: VertexInput) -> VertexOutput {
  var output: VertexOutput;
  output.position = vec4<f32>(input.aPosition, 0.0, 1.0);
  let uv = input.aPosition * 0.5 + 0.5;
  output.vUv = vec2<f32>(uv.x, mix(uv.y, 1.0 - uv.y, fxh.uFxTexel.z));
  return output;
}

@fragment
fn mainFragment(input: FragmentInput) -> @location(0) vec4<f32> {
  let fxColor = effect(input.vUv);
  var finalColor = fxColor.rgb;
  {{fragmentEnd}}
  return vec4<f32>(finalColor, fxColor.a);
}
`,gl:{vertex:`#version 300 es

{{header}}

void main() {
  vec2 uv = aPosition * 0.5 + 0.5;
  vUv = vec2(uv.x, mix(uv.y, 1.0 - uv.y, uFxTexel.z));
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`,fragment:`#version 300 es

{{header}}

out vec4 fragColor;

void main() {
  vec4 fxColor = effect(vUv);
  vec3 finalColor = fxColor.rgb;
  {{end}}
  fragColor = vec4(finalColor, fxColor.a);
}
`}},A_={gpu:"fn effect(uv: vec2<f32>) -> vec4<f32> { return sampleColor(uv); }",gl:"vec4 effect(vec2 uv) { return sampleColor(uv); }"},Vo=new WeakMap;let F_=0;function z_(e,t){let s=Vo.get(e);if(s)return s;const r=Object.create(null);if(t)for(const i in t.uniformStructures)r[i]=t.uniformStructures[i].type;return s={name:`effectFragment:${F_++}`,bindings:{fx:r},gpu:{header:e.gpu},gl:{header:e.gl}},Vo.set(e,s),s}function k_(e,t){const s={};e!==null&&Object.keys(e.uniformStructures).length>0&&(s.fx=e),t.color&&(s.uTexture=L.WHITE.source,s.uTextureSampler=new Je({scaleMode:"linear",addressMode:"clamp-to-edge"})),t.color2&&(s.uTexture2=L.WHITE.source,s.uTexture2Sampler=new Je({scaleMode:"linear",addressMode:"clamp-to-edge"})),t.depth&&(s.uFxDepthTexture=ki);const r=new gt(s);return{group:r,color:t.color?{group:r,slot:"uTexture"}:null,color2:t.color2?{group:r,slot:"uTexture2"}:null,depth:t.depth?{group:r,slot:"uFxDepthTexture"}:null}}const Go=[0,0,1,1];var jl=class extends re{_fragment;_uniforms;_reads;_writes;_extraBits;_isWebGL;_state;_fxBindGroup;_fxhBindGroup;_fxhUniforms;_colorBinding;_color2Binding;_depthBinding;_shader=null;_destroyed=!1;constructor(e){super({renderer:e.renderer,name:e.label??"fullscreen",bit:$.NONE}),this._fragment=e.fragment,this._uniforms=e.uniforms??null,this._reads=e.reads??{},this._writes=e.writes,this._extraBits=e.extraBits??[],this._isWebGL="gl"in e.renderer;const t=new zt;t.depthTest=!1,t.depthMask=!1,t.culling=!1,t.blend=this._writes===null||e.blendMode!==void 0,this._writes!==null&&e.blendMode&&(t.blendMode=e.blendMode),this._state=t;const s=k_(this._uniforms,this._reads);this._fxBindGroup=s.group,this._colorBinding=s.color,this._color2Binding=s.color2,this._depthBinding=s.depth,this._fxhUniforms=new jt({uFxClip:{value:new Float32Array(4),type:"vec4<f32>"},uFxTexel:{value:new Float32Array(4),type:"vec4<f32>"},uFxInputClamp:{value:new Float32Array(Go),type:"vec4<f32>"},uFxInput2Clamp:{value:new Float32Array(Go),type:"vec4<f32>"}}),this._fxhBindGroup=new gt({fxh:this._fxhUniforms})}setup(e){this._reads.color&&e.sample(this._reads.color,this._colorBinding),this._reads.color2&&e.sample(this._reads.color2,this._color2Binding),this._reads.depth&&e.sample(this._reads.depth,this._depthBinding),this._writes?e.writeColor(this._writes):(e.writeColor(e.defaultColor),e.writeDepth(e.defaultDepth))}render(e){this._shader||this._compile(),this._updateHeaderUniforms(e),this._shader.groups[0]=e.globalBindGroup,this._shader.groups[1]=ot(e.view3d.camera).bindGroup,this._shader.groups[2]=this._fxBindGroup,this._shader.groups[3]=this._fxhBindGroup,this.pipe.renderGeometry(ds(),this._shader,this._state)}_updateHeaderUniforms(e){const t=e.view3d.camera,s=ot(t).projection.elements,r=this._fxhUniforms.uniforms.uFxClip;r[0]=t.near,r[1]=t.far,r[2]=s[0],r[3]=this._isWebGL?s[5]:-s[5];const i=this._fxhUniforms.uniforms.uFxTexel;i[0]=1/e.activeViewport.width,i[1]=1/e.activeViewport.height;const n=e.renderer.renderTarget.isFrontFaceInverted();i[2]=(this._isWebGL?0:1)^(n!==e.defaultFrontFaceInverted?1:0),i[3]=e.activeViewport.width/e.viewport.width;const o=e.view3d._graph;this._reads.color&&o._inputClamp(this._reads.color,e,this._fxhUniforms.uniforms.uFxInputClamp),this._reads.color2&&o._inputClamp(this._reads.color2,e,this._fxhUniforms.uniforms.uFxInput2Clamp),this._fxhUniforms.update()}_compile(){const e=[C_];this._reads.color&&e.push(D_),this._reads.color2&&e.push(B_),this._reads.depth&&e.push(this._isWebGL?M_:I_),e.push(z_(this._fragment,this._uniforms),...this._extraBits),this._shader=this.pipe.renderer.material3d.compilePassShader(e,P_)}destroy(){this._destroyed||(this._destroyed=!0,this._shader?.destroy(),this._shader=null,this._fxBindGroup.destroy(),this._fxhBindGroup.destroy())}},R_=class extends jl{constructor(e){super({renderer:e.renderer,label:"output",fragment:A_,reads:{color:e.source},writes:e.writes??null,extraBits:Jc(e.toneMapping)})}},L_=class{enabled;requiredOutputs;constructor(e={}){this.enabled=e.enabled??!0}destroy(){}};const Oo=/\b(?:sampleDepth|viewPos|depthTexel)\s*\(/;var ql=class extends L_{stage;inputMips=!1;fragment;uniforms=null;constructor(e={}){super(e),this.stage=e.stage??"beforeToneMapping"}writeLane(e,t,s,r){e.uniforms[t][s]=r,e.update()}build(e,t){const s=this.fragment;if(!s)throw new Error(`${this.constructor.name}: provide a \`fragment\` or override \`build()\`.`);const r=Oo.test(s.gpu)||Oo.test(s.gl);e.addPass(new jl({renderer:t.renderer,label:this.constructor.name,fragment:s,uniforms:this.uniforms,reads:{color:t.input,depth:r?e.sceneDepth:void 0},writes:t.output}))}},Di=class extends tt{batch;constructor(e){const{size:t,parent:s,cull:r,instanceData:i,...n}=it(e);super({label:"BatchedMesh3D",...n}),this.batch=new Ic({size:t,renderData:this,instanceData:i}),this.batch.cull=r??"off",s?.addChild(this)}get items(){return this.batch.items}get cull(){return this.batch.cull}set cull(e){this.batch.cull=e}get size(){return this.batch.items.length}setMatrixAt(e,t){this.batch.setMatrixAt(e,t)}get matrices(){return this.batch.matrices}setInstanceDataAt(e,t,s,r,i,n){this.batch.setInstanceDataAt(e,t,s,r,i,n)}get instanceData(){return this.batch.instanceData}setGeometryAt(e,t){this.batch.setGeometryAt(e,t)}setMaterialAt(e,t){this.batch.setMaterialAt(e,t)}setVisibleAt(e,t){this.batch.setVisibleAt(e,t)}getVisibleAt(e){return this.batch.getVisibleAt(e)}setPassesAt(e,t){this.batch.setPassesAt(e,t)}invalidate(e){this.batch.invalidate(e)}unload(){if(this.destroyed)return;super.unload();const e=new Set,t=this.batch.items;for(let s=0;s<t.length;s++){const r=t[s].geometry;r&&(e.has(r)||(e.add(r),r.unload()),this.batch.invalidate(s))}this.batch.unload()}destroy(e){if(this.destroyed)return;super.destroy(e);const t=Ut(e,"geometry"),s=Ut(e,"material");if(t||s){const r=new Set,i=new Set;for(const n of this.batch.items)t&&n.geometry&&!r.has(n.geometry)&&(r.add(n.geometry),n.geometry.destroy(!0)),s&&n.material&&!i.has(n.material)&&(i.add(n.material),n.material.destroy(e))}this.batch.destroy()}},Wl=class Et extends tt{static defaultOptions={mode:"perspective",fov:60,zoom:1,near:.1,far:1e3,orthographicSize:5,clippingPlane:null,renderTexture:null};projection=new E;view=new E;viewProjection=new E;frustum=new kc;cullFrustum=this.frustum;mode;fov=0;zoom=0;near=0;far=0;orthographicSize=0;clippingPlane;renderTexture;_cameraData=null;viewport=new lt(0,0,1,1);jitter=new ls;_lookAtForwardIsPositiveZ=!1;constructor(t={}){const{mode:s,fov:r,zoom:i,near:n,far:o,orthographicSize:a,clippingPlane:c,renderTexture:l,...u}={...Et.defaultOptions,...it(t)};super({label:"Camera3D",...u}),this.mode=s,this.fov=r,this.zoom=i,this.near=n,this.far=o,this.orthographicSize=a,this.clippingPlane=c??null,this.renderTexture=l??null}usePerspective(t=Et.defaultOptions.fov,s=Et.defaultOptions.near,r=Et.defaultOptions.far){this.mode="perspective",this.fov=t,this.near=s,this.far=r}useOrthographic(t=Et.defaultOptions.orthographicSize,s=Et.defaultOptions.near,r=Et.defaultOptions.far){this.mode="orthographic",this.orthographicSize=t,this.near=s,this.far=r}resetHistory(){this._cameraData&&(this._cameraData._hasHistory=!1)}destroy(t){this.destroyed||(this._cameraData?.destroy(),this._cameraData=null,super.destroy(t))}computeProjection(t,s){if(this.mode==="perspective")s.makePerspective(2*Math.atan(this._tanHalfFovY()),t,this.near,this.far);else{const r=this.orthographicSize/this.zoom;s.makeOrthographic(-r,r,r/t,-r/t,this.near,this.far)}return s}_tanHalfFovY(){return Math.tan(this.fov*ft/2)/this.zoom}},Me=class extends tt{get color(){return this._color}set color(e){this._color.setValue(e)}intensity=0;castShadow=!1;get canCastShadow(){return this.castShadow}shadow;_lookAtForwardIsPositiveZ=!1;_color;_gpuShadowData=null;_shadowDataIndex=-1;_shadowRefreshRequested=!0;_autoShadowBounds=null;_autoShadowBoundsFrozen=!1;constructor(e){const{color:t,intensity:s,castShadow:r,shadow:i,...n}=e;super(n),this._color=new vt(t),this.intensity=s??1,this.castShadow=r??!1,this.shadow={bounds:void 0,cascades:void 0,update:1,maxDistance:void 0,lambda:.5,bias:void 0,normalBias:void 0},i&&(i.bounds!==void 0&&(this.shadow.bounds=i.bounds),i.cascades!==void 0&&(this.shadow.cascades=i.cascades),i.update!==void 0&&(this.shadow.update=i.update),i.maxDistance!==void 0&&(this.shadow.maxDistance=i.maxDistance),i.lambda!==void 0&&(this.shadow.lambda=i.lambda),i.bias!==void 0&&(this.shadow.bias=i.bias),i.normalBias!==void 0&&(this.shadow.normalBias=i.normalBias))}refreshShadows(){this._shadowRefreshRequested=!0}fitShadowBounds(){this._autoShadowBoundsFrozen=!1,this._shadowRefreshRequested=!0}_releaseShadowState(){this._gpuShadowData&&(gm(this._gpuShadowData),this._gpuShadowData=null)}destroy(e){this.destroyed||(this._releaseShadowState(),this._shadowDataIndex=-1,this._shadowRefreshRequested=!1,this._autoShadowBounds=null,this._autoShadowBoundsFrozen=!1,super.destroy(e))}},Vx=class Kl extends Me{static defaultOptions={color:16777215,intensity:.5};type="ambient";constructor(t={}){super({label:"AmbientLight",...Kl.defaultOptions,...it(t)})}get canCastShadow(){return!1}},Yl=class Xl extends Me{static defaultOptions={color:16777215,intensity:1,castShadow:!1};type="directional";constructor(t={}){super({label:"DirectionalLight",...Xl.defaultOptions,...it(t)})}},E_=class Zl extends Me{static defaultOptions={color:16777215,intensity:1,range:0,radius:.1};type="point";range=0;radius=.1;constructor(t={}){const{range:s,radius:r,...i}={...Zl.defaultOptions,...it(t)};super({label:"PointLight",...i}),this.range=s,this.radius=r,this.castShadow&&V("PointLight does not cast shadows; `castShadow` has no effect.")}get canCastShadow(){return!1}},V_=class Ql extends Me{static defaultOptions={color:16777215,intensity:1,castShadow:!1,range:0,radius:.1,coneAngle:60,penumbra:0};type="spot";range=0;radius=.1;coneAngle=0;penumbra=0;constructor(t={}){const{range:s,radius:r,coneAngle:i,penumbra:n,...o}={...Ql.defaultOptions,...it(t)};super({label:"SpotLight",...o}),this.range=s,this.radius=r,this.coneAngle=i,this.penumbra=n}};const ni=new E;let No=0;var G_=class Jl{static defaultOptions={};nodeCount=0;jointCount=0;parent;joints;inverseBindMatrices;localPosition;localRotation;localScale;worldMatrix;dirty=!0;_bonePitIndex=-1;_bonePitTick=-1;_worldId=++No;_destroyed=!1;_labelToIndex;_bindShapeInverse;_nodeWorldMatrix;_containerBones=[];constructor(t){t={...Jl.defaultOptions,...it(t)};const{parent:s,joints:r,inverseBindMatrices:i,labels:n,bindShapeMatrix:o}=t;this.nodeCount=s.length,this.jointCount=r.length,this.parent=s,this.joints=r,this.inverseBindMatrices=i,this.localPosition=new Float32Array(this.nodeCount*3),this.localRotation=new Float32Array(this.nodeCount*4),this.localScale=new Float32Array(this.nodeCount*3),this._nodeWorldMatrix=new Float32Array(this.nodeCount*16),this.worldMatrix=new Float32Array(this.jointCount*12);for(let a=0;a<this.nodeCount;a++){this.localRotation[a*4+3]=1,this.localScale[a*3+0]=1,this.localScale[a*3+1]=1,this.localScale[a*3+2]=1;const c=a*16;this._nodeWorldMatrix[c+0]=1,this._nodeWorldMatrix[c+5]=1,this._nodeWorldMatrix[c+10]=1,this._nodeWorldMatrix[c+15]=1}if(n){this._labelToIndex=Object.create(null);for(let a=0;a<n.length;a++)this._labelToIndex[n[a]]=a}o&&(ni.fromArray(o).getInverse(ni,!0),this._bindShapeInverse=new Float32Array(ni.elements))}indexOf(t){const s=this._labelToIndex[t];if(s===void 0)throw new Error(`Unknown bone label: ${t}`);return s}setLocalTRS(t,s,r,i,n,o,a,c,l=1,u=1,h=1){const d=t*3;this.localPosition[d+0]=s,this.localPosition[d+1]=r,this.localPosition[d+2]=i;const f=t*4;this.localRotation[f+0]=n,this.localRotation[f+1]=o,this.localRotation[f+2]=a,this.localRotation[f+3]=c;const p=t*3;this.localScale[p+0]=l,this.localScale[p+1]=u,this.localScale[p+2]=h,this.dirty=!0}updateWorld(){if(this._containerBones.length!==0&&this._syncContainerBones(),!!this.dirty){for(let t=0;t<this.nodeCount;t++){const s=this.parent[t];this._writeTRSToMat4(t,this._nodeWorldMatrix),s>=0?E.multiplyAffine(this._nodeWorldMatrix,t*16,this._nodeWorldMatrix,s*16,this._nodeWorldMatrix,t*16):this._bindShapeInverse!==void 0&&E.multiplyAffine(this._nodeWorldMatrix,t*16,this._bindShapeInverse,0,this._nodeWorldMatrix,t*16)}for(let t=0;t<this.jointCount;t++){const s=this.joints[t];E.multiplyAffineTo3x4(this.worldMatrix,t*12,this._nodeWorldMatrix,s*16,this.inverseBindMatrices,t*16)}this._worldId=++No,this.dirty=!1}}bindContainerBone(t,s){this._containerBones.push({boneIndex:t,src:s})}_syncContainerBones(){const t=this._containerBones;for(let s=0;s<t.length;s++){const{boneIndex:r,src:i}=t[s];i._localTransformDirty&&(i.updateLocalTransform(),i._localTransformDirty=!1);const n=i.localTransform.elements,o=i.quaternion,a=i.scale,c=r*3,l=r*4,u=this.localPosition,h=this.localRotation,d=this.localScale;(u[c]!==n[12]||u[c+1]!==n[13]||u[c+2]!==n[14]||h[l]!==Math.fround(o.x)||h[l+1]!==Math.fround(o.y)||h[l+2]!==Math.fround(o.z)||h[l+3]!==Math.fround(o.w)||d[c]!==Math.fround(a.x)||d[c+1]!==Math.fround(a.y)||d[c+2]!==Math.fround(a.z))&&(u[c]=n[12],u[c+1]=n[13],u[c+2]=n[14],h[l]=o.x,h[l+1]=o.y,h[l+2]=o.z,h[l+3]=o.w,d[c]=a.x,d[c+1]=a.y,d[c+2]=a.z,this.dirty=!0)}}destroy(){this._destroyed||(this._destroyed=!0,this._containerBones.length=0,this._bonePitIndex=-1,this._bonePitTick=-1)}_writeTRSToMat4(t,s){const r=t*3,i=t*4,n=t*3,o=t*16,a=this.localPosition[r+0],c=this.localPosition[r+1],l=this.localPosition[r+2],u=this.localRotation[i+0],h=this.localRotation[i+1],d=this.localRotation[i+2],f=this.localRotation[i+3],p=this.localScale[n+0],m=this.localScale[n+1],_=this.localScale[n+2],g=u+u,b=h+h,y=d+d,v=u*g,x=u*b,w=u*y,T=h*b,B=h*y,S=d*y,C=f*g,D=f*b,I=f*y;s[o+0]=(1-(T+S))*p,s[o+1]=(x+I)*p,s[o+2]=(w-D)*p,s[o+3]=0,s[o+4]=(x-I)*m,s[o+5]=(1-(v+S))*m,s[o+6]=(B+C)*m,s[o+7]=0,s[o+8]=(w+D)*_,s[o+9]=(B-C)*_,s[o+10]=(1-(v+T))*_,s[o+11]=0,s[o+12]=a,s[o+13]=c,s[o+14]=l,s[o+15]=1}};const O_=new E,$o=new F,Uo=new mt,Ho=new F;function tu(e,t){if(e instanceof ye)t.add(e.material);else if(e instanceof Di){const r=e.batch.items;for(let i=0;i<r.length;i++)r[i].material&&t.add(r[i].material)}const s=e.children;for(let r=0;r<s.length;r++){const i=s[r];i instanceof eu||tu(i,t)}}function jo(e,t){if(typeof t=="function"){const r=new Map;return e.map(i=>{let n=r.get(i);return n||r.set(i,n=t(i)),n})}if(Array.isArray(t))return e.map((r,i)=>t[i]??r);const s=t;return e.map(r=>r.label!==void 0&&s[r.label]||r)}var eu=class Bi extends tt{static defaultOptions={castShadow:!0,receiveShadow:!0,autoUpdate:!0,autoPlay:!1};source;player;skeletons=[];cameras=[];_builtMeshes=[];_materials;constructor(t){t instanceof Za&&(t={source:t});const{source:s,scene:r,castShadow:i,receiveShadow:n,autoUpdate:o,autoPlay:a,hitVolume:c,width:l,height:u,depth:h,parent:d,materials:f,...p}={...Bi.defaultOptions,...it(t)};super({label:"Model3D",...p}),this.source=s,f&&(this._materials=jo(s.materials,f));const m=s._descriptor,_=this.skeletons,g={nodeMap:{},detachedSkinnedNodes:new Map,castShadow:i,receiveShadow:n},{nodeMap:b,detachedSkinnedNodes:y}=g;if(m.skins&&m.skins.forEach(v=>{const x=new G_({parent:v.skeletonParent,joints:v.skeletonJoints,inverseBindMatrices:v.inverseBindMatrices,labels:v.skeletonLabels,bindShapeMatrix:v.bindShapeMatrix});if(_.push(x),!!v.skeletonNodes)for(let w=0;w<v.skeletonNodes.length;w++){const T=v.skeletonNodes[w],B=m.nodes?.[T];if(B){const S=B.position,C=B.rotation,D=B.scale;x.setLocalTRS(w,S?.[0]??0,S?.[1]??0,S?.[2]??0,C?.[0]??0,C?.[1]??0,C?.[2]??0,C?.[3]??1,D?.[0]??1,D?.[1]??1,D?.[2]??1)}b[T]={skeleton:x,boneIndex:w}}}),m.scenes&&m.scenes.length>0){let v=m.scenes[m.defaultScene??0];r&&(v=s.scene[r]||v),v.children&&v.children.forEach(x=>{const w=this._createNode(x,g);w.length&&this.addChild(...w)})}else if(m.nodes&&m.nodes.length>0){const v=this._createNode(0,g);v.length&&this.addChild(...v)}for(const[v,x]of y){const w=b[x];(w instanceof tt?w:this).addChild(b[v])}if(m.skins)for(let v=0;v<m.skins.length;v++){const x=_[v],w=m.skins[v].skeletonNodes;if(w)for(let T=0;T<w.length;T++){const B=w[T];if(y.has(B))continue;const S=b[B];S instanceof tt&&x.bindContainerBone(T,S)}}Object.keys(s.animations).length&&(this.player=new Ad({target:this,animations:s.animations,nodeMap:b,autoUpdate:o,autoPlay:a})),c!==void 0&&(this.hitVolume=c),l!==void 0&&(this.width=l),u!==void 0&&(this.height=u),h!==void 0&&(this.depth=h),d?.addChild(this)}_createMesh(t,s){const r=this.source.geometries[t.geometry];if(!r)return new tt;const i=t.materials||[],n=t.skin!==void 0?this.skeletons[t.skin]:void 0,o=r[0]?.morphTargetCount??0;let a;o>0&&(a=new Float32Array(o),t.weights&&t.weights.length===o&&a.set(t.weights));const c=(u,h)=>{const d=i[h],f=new ye({geometry:u,material:this.materials[d],skeleton:n,castShadow:s.castShadow,receiveShadow:s.receiveShadow,weights:a});return this._builtMeshes.push({mesh:f,index:d}),f};if(r.length===1)return c(r[0],0);const l=new tt;return r.forEach((u,h)=>l.addChild(c(u,h))),a&&(l.weights=a),l}_createLight(t){const s=this.source._descriptor.lights?.[t.light];if(!s)return new tt;const{type:r,color:i,intensity:n,range:o,coneAngle:a,penumbra:c}=s;return r===0?new Yl({color:i,intensity:n}):r===1?new E_({color:i,intensity:n,range:o}):r===2?new V_({color:i,intensity:n,range:o,coneAngle:a,penumbra:c}):new tt}_createCamera(t){const s=this.source._descriptor.cameras?.[t.camera];if(!s)return new tt;const{mode:r,fov:i,near:n,far:o,orthographicSize:a}=s,c=new Wl({mode:r===1?"orthographic":"perspective",fov:i,near:n,far:o,orthographicSize:a});return this.cameras.push(c),c}_createNode(t,s){const r=this.source._descriptor,i=r.nodes?.[t];if(!i)return[];const n=i.children?.flatMap(l=>this._createNode(l,s))??[];if(i.isJoint)return n;let o;i.geometry!==void 0?o=this._createMesh(i,s):i.light!==void 0?o=this._createLight(i):i.camera!==void 0?o=this._createCamera(i):o=new tt;const a=i.skin!==void 0?r.skins?.[i.skin]:void 0,c=a!==void 0&&i.geometry!==void 0;return c?a.bindShapeMatrix&&(O_.fromArray(a.bindShapeMatrix).decompose($o,Uo,Ho),o.position.copyFrom($o),o.quaternion.copyFrom(Uo),o.scale.copyFrom(Ho)):(i.position&&o.position.fromArray(i.position),i.scale&&o.scale.fromArray(i.scale),i.rotation&&o.quaternion.fromArray(i.rotation)),i.label&&(o.label=i.label),i.visible===!1&&(o.visible=!1),n.length&&o.addChild(...n),s.nodeMap[t]=o,c?(s.detachedSkinnedNodes.set(t,a.parentNode??-1),[]):[o]}get materials(){return this._materials??this.source.materials}set materials(t){this._materials=t&&jo(this.source.materials,t);const s=this.materials;for(const{mesh:r,index:i}of this._builtMeshes){let n=r.parent;for(;n&&n!==this;)n=n.parent;n&&(r.material=s[i])}}static from(t,s){return new Bi({...s,source:t})}unload(){super.unload();const t=new Set;tu(this,t);for(const s of t)s.unload()}destroy(t){if(!this.destroyed){this.player?.destroy(),this.player=void 0;for(const s of this.skeletons)s.destroy();this.skeletons=null,this.cameras=null,this._builtMeshes=null,this._materials=void 0,super.destroy(t)}}};function N_(e,t){const s=t.passes?.filter(S=>S.enabled)??[],r=s.filter(S=>S.stage==="beforeOpaque"),i=s.filter(S=>S.stage==="afterOpaque"),n=s.filter(S=>S.stage==="afterTransparent"),o=s.filter(S=>S.stage==="beforeToneMapping"),a=s.filter(S=>S.stage==="afterToneMapping");$_(e,o,a);const c=o.length>0,l=t.toneMapping,u=c&&l!=="custom"?l:void 0,h=td(t.passes??[],t.sceneOutputs),d=o.length+a.length,f=(t.composite??!1)||d>0||h.length>0,p=u||f&&d===0?["outputPass"]:[],m=[...o,...p,...a],_=m[0],g=_ instanceof ql&&_.inputMips,b=e.view.antialias&&h.every(S=>a_(e,S.format)),y=new Rm({globalTextureBindings:t.globalTextureBindings,defaultColor:S=>S.defaultTarget.colorTexture,defaultDepth:S=>S.defaultTarget.depthStencilTexture,sceneColor:f?{antialias:b,autoGenerateMipmaps:g,format:c?"rgba16float":void 0,label:"sceneColor"}:void 0,sceneDepth:f?{antialias:b,label:"sceneDepth"}:void 0,sceneOutputs:h}),v=y.createColor({autoGenerateMipmaps:!0,label:"opaqueColorCopy"}),x=y.createDepth({label:"opaqueDepthCopy"}),w={renderer:e,opaqueColor:v,opaqueDepth:x},T=U_(y,e);for(const S of r)S.build(y,w);y.addPass(new Zm({renderer:e,attachedOutputs:h})),y.addPass(new qm({renderer:e,attachedOutputs:h})),y.addPass(new Qm({renderer:e,attachedOutputs:h}));for(const S of i)S.build(y,w);y.addPass(new Ym({renderer:e,opaqueDepthHandle:x})),y.addPass(new Xm({renderer:e,opaqueColorHandle:v})),y.addPass(new xg({renderer:e,opaqueColorHandle:v,attachedOutputs:h})),y.addPass(new Km({renderer:e,opaqueColorHandle:v,opaqueDepthHandle:x})),y.addPass(new bg({renderer:e,attachedOutputs:h}));for(const S of n)S.build(y,w);let B=y.sceneColor;for(let S=0;S<m.length;S++){const C=m[S],D=m[S+1],I=D===void 0?null:y.createColor({autoGenerateMipmaps:D!=="outputPass"&&D.inputMips,format:u&&S>=o.length?"rgba8unorm":void 0,label:"effectChain"});C==="outputPass"?y.addPass(new R_({renderer:e,source:B,toneMapping:u,writes:I})):C.build(y,{...w,input:B,output:I}),I&&(B=I)}return y.compile(),{graph:y,handles:{opaqueColor:v,opaqueDepth:x,shadowMap:T}}}function $_(e,t,s){for(const r of[...t,...s])if(!(r instanceof ql))throw new Error(`${r.constructor.name}: the '${r.stage}' stage is reserved for PostEffect subclasses (extend PostEffect, or use a scene stage).`);t.length>0&&xc(e,`View3D, for the float scene that ${t[0].constructor.name} reads`)}function U_(e,t){let s;const r=e.importDepth(()=>s.renderTarget.depthStencilTexture);return s=t.renderPipes.view3d.createShadowPass({shadowMapHandle:r}),e.addPass(s),r}const H_=new Q,j_=new wt;function qo(e,t,s){const{center:r,radius:i}=j_.setFromBox(t.getLocalBounds(H_)),n=i>0?i:1,o=e._tanHalfFovY(),a=Math.atan(o),c=Math.atan(o*s),l=n/Math.sin(Math.min(c,a));e.near=l/100,e.far=l*100,e.position.set(r.x,r.y,r.z+l)}const q_=(()=>{const e=new tt;return e._worldVisible=1,e})();function W_(e){const t=e._childrenToUpdate,s=e._updateTick++;for(const r in t){const i=Number(r),n=t[r],o=n.list,a=n.index;for(let c=0;c<a;c++){const l=o[c];l._view3d===e&&l._relativeSceneDepth===i&&su(l,l.parent??q_,s,!1,!1)}fa(o,a),n.index=0}}function su(e,t,s,r,i){if(s===e._updateTick)return;e._updateTick=s,e.didChange=!1,r||=e._worldTransformDirty,i||=e._worldVisibleDirty,i&&(e._worldVisible=t._worldVisible*e._visible,e._storeWorldVisible()),e._worldVisible&&r&&(e._localTransformDirty&&(e.updateLocalTransform(),e._localTransformDirty=!1),E.multiplyAffine(e.worldTransform.elements,0,t.worldTransform.elements,0,e.localTransform.elements,0),e._worldTransformId++,e._storeWorldTransform()),e._worldVisibleDirty=!1,e._worldTransformDirty=e._worldVisible?!1:r;const n=e.children,o=n.length;for(let a=0;a<o;a++)su(n[a],e,s,r,i)}function ru(e,t,s){W_(e),c_(e),Yc(e.camera,s);const r=ot(e.camera).frame;if(r.width<=0||r.height<=0)return!1;e._syncShadowSampling(),K_(e),t._morphStoreBuffer.sync(e._morphedMeshes.items),Y_(e,t),X_(e,t),Z_(e,t),Q_(e);const i=e._meshBatches;for(let n=0;n<i.length;n++)i[n].applyEdits();return!0}function K_(e){e._bonePit.clear();const t=e._skinnedMeshes.items;for(let s=0;s<e._skinnedMeshes.items.length;s++){const r=t[s],i=r.skeleton;i.updateWorld();const n=e._bonePit.add(i);r._lastBonePitIndex!==n&&(r._lastBonePitIndex=n,r._markStoreDirty())}e._bonePit.update()}function Y_(e,t){const s=t.geometryDataStoreBuffer,r=e._renderablesToUpdate,i=r.list,n=r.index;for(let a=0;a<n;a++){const c=i[a];if(c.didRenderableUpdate=!1,c._view3d!==e)continue;const l=c.material,u=c.renderPassMask;u!==c._lastRenderPass&&e._sceneBatch.setPassesAt(e._meshSlots.getIndex(c),u);let h=!1;if(c._lastDescriptorDirtyId!==l._descriptorDirtyId&&(h=c._lastDescriptorDirtyId!==-1,c._lastDescriptorDirtyId=l._descriptorDirtyId,c._batchDirty=!0),c._lastRenderPass===0)continue;const d=c.geometry,f=d._geometryAtlasAllocation===null&&!d.dynamic;if(c._batchDirty||f){c._batchDirty=!1,h||=f&&d._atlasVacated,t.renderer.material3d.ensureMaterial(c,e._sceneBatch,e),d.dynamic||(d._geometryAtlasAllocation=t.atlasPool.allocate(d)),s.set(d);let p=c.renderPassMask&e._dirtyHookBits;for(;p;){const m=p&-p;e.passByBit[m].onRenderableDirty(c,e._sceneBatch,h),p^=m}}c._storeDirty&&(c._storeDirty=!1,e._sceneBatch.storeBuffer.set(c))}const o=r.index-n;for(let a=0;a<o;a++)i[a]=i[n+a];fa(i,o),r.index=o,e._sceneBatch.storeBuffer.update()}function X_(e,t){const s=t.geometryDataStoreBuffer;for(let r=1;r<e._meshBatches.length;r++){const i=e._meshBatches[r];i.writeBatchWorldMatrix(i.renderData.worldTransform);const n=i._dirtyIndices,o=i._dirtyCount;for(let a=0;a<o;a++){const c=i.items[n[a]];c._batchDirty=!1;const l=c._lastRenderPass;if(l===0)continue;const u=c.material;let h=c.geometry._geometryAtlasAllocation===null&&!c.geometry.dynamic&&c.geometry._atlasVacated;c._lastDescriptorDirtyId!==u._descriptorDirtyId&&(h||=c._lastDescriptorDirtyId!==-1,c._lastDescriptorDirtyId=u._descriptorDirtyId),t.renderer.material3d.ensureMaterial(c,i,e),c.geometry.dynamic||(c.geometry._geometryAtlasAllocation=t.atlasPool.allocate(c.geometry)),s.set(c.geometry),i.storeBuffer.u32Data[c._storeIndex*24+17]=u._materialIndex,i.storeBuffer.u32Data[c._storeIndex*24+18]=c.geometry._geometryDataIndex,i.storeBuffer.markDirty(c._storeIndex);let d=l&e._dirtyHookBits;for(;d;){const f=d&-d;e.passByBit[f].onRenderableDirty(c,i,h),d^=f}}i._dirtyCount=0,i.storeBuffer.update(),i.instanceStoreBuffer?.update()}}function Z_(e,t){const s=t.geometryDataStoreBuffer,r=t.atlasPool.bufferVersion;if(e._lastAtlasBufferVersion!==r){e._lastAtlasBufferVersion=r;const i=e._morphedMeshes.items;for(let n=0;n<i.length;n++)s.set(i[n].geometry)}}function Q_(e){for(let s=0;s<e._meshBatches.length;s++){const r=e._meshBatches[s],i=r.storeBuffer.bufferVersion;r._lastStoreBufferVersion!==i&&(r._lastStoreBufferVersion=i,r.invalidateDrawCaches())}const t=e._bonePit.bufferVersion;e._lastBonePitBufferVersion!==t&&(e._lastBonePitBufferVersion=t,e._invalidateDrawCaches())}var J_=class{items=[];count=0;_freeList=new Uint32Array(1024);_freeCount=0;_uidToIndex=new Map;add(e){let t;this._freeCount>0?t=this._freeList[--this._freeCount]:t=this.count++,this.items[t]=e,this._uidToIndex.set(e.uid,t)}remove(e){const t=this._uidToIndex.get(e.uid);if(t!==void 0){if(this.items[t]=null,this._uidToIndex.delete(e.uid),this._freeCount>=this._freeList.length){const s=new Uint32Array(this._freeList.length*2);s.set(this._freeList),this._freeList=s}this._freeList[this._freeCount++]=t}}getIndex(e){return this._uidToIndex.get(e.uid)??-1}};const ty={linear:Pg,exponential:Mg,exp2:Ig},ey=-1,Wo=new fr,le=new ls,ue=new E,It=new E,Bt=new F,sy=new we;var ry=class Ii extends yh{static defaultOptions={width:256,height:256,anchor:0,shadowQuality:"medium",shadowFilter:"pcf",toneMapping:"none",exposure:1,autoResize:!1};allowChildren=!1;renderPipeId="view3d";batched=!1;root;events;_camera;_anchor=new xh({_onUpdate:()=>this.onViewUpdate()});_width=0;_height=0;autoResize;_frameOnResize=!1;_userOnRender=null;_onRender=t=>{this.autoResize&&this._resize(t.screen.width,t.screen.height),this._userOnRender?.(t)};get onRender(){return this._userOnRender}set onRender(t){this._userOnRender=t??null}lights=[];shadowQuality;_shadowFilter="pcf";exposure=1;_background=null;_toneMapping="none";_toneMappingBit=Ns.none;_fog=null;_fogBit=null;_environment=null;_envBit=vo;_meshSlots=new J_;meshes=new ts("_allMeshIndex");_skinnedMeshes=new ts("_skinnedMeshIndex");_morphedMeshes=new ts("_morphedMeshIndex");_sceneBatch=new Ic({items:this._meshSlots.items});_meshBatches=[this._sceneBatch];_meshBatchesDirtyId=0;passByBit=Object.create(null);_dirtyHookBits=0;_graph;_passesInitialized=!1;_graphGlobalData=null;_buildGraph;_composite;_compositeRequested=!1;_passes=[];_passesEnabledKey=0;_lightDataList=new Sm;_shadowDataList=new n_;_hasShadows=!1;_bonePit=new Yp;_lastBonePitBufferVersion=0;_lastAtlasBufferVersion=0;_childrenToUpdate=Object.create(null);_renderablesToUpdate={list:[],index:0};_updateTick=0;constructor(t={}){super({});const{root:s,camera:r,width:i,height:n,anchor:o,shadowQuality:a,shadowFilter:c,environment:l,background:u,toneMapping:h,exposure:d,fog:f,cull:p,composite:m,resolution:_,graph:g,passes:b,parent:y,autoResize:v,...x}={...Ii.defaultOptions,...it(t)};this.events=new __(this),this.shadowQuality=a,this._shadowFilter=c,this.environment=l??null,this.background=u??null,this._toneMapping=h,this.exposure=d,this._composite=m??!1,this.resolution=_??"inherit",this._buildGraph=g,b&&(this._passes=b.slice()),f&&(this.fog=f),this.anchor=o,this._width=i,this._height=n,this.autoResize=v,this.root=s??new tt,this._attach(this.root),this._sceneBatch.cull=p??"gpu",this.camera=r??new Wl,Object.assign(this,x),y?.addChild(this)}static from(t,s={}){const{scene:r,castShadow:i,receiveShadow:n,autoUpdate:o,autoPlay:a,materials:c,light:l,...u}=s,h=new eu({source:t,scene:r,castShadow:i,receiveShadow:n,autoUpdate:o,autoPlay:a,materials:c}),d=u.camera??h.cameras[0],f=new Ii({...u,root:h,camera:d});return d||(f.autoResize?f._frameOnResize=!0:qo(f.camera,h,f.width/f.height)),l!==!1&&!f.lights.length&&f.camera.addChild(new Yl),f}get camera(){return this._camera}set camera(t){if(this._camera!==t&&(this._camera=t,t._view3d!==this)){if(t.parent!==null)throw new Error("Camera3D is parented under a Container3D that isn't in this View3D's scene graph. Add the camera (or its ancestor) to view3d.root first.");this.root.addChild(t)}}get anchor(){return this._anchor}set anchor(t){typeof t=="number"?this._anchor.set(t):this._anchor.copyFrom(t)}get width(){return this._width}set width(t){this.setSize(t,this._height)}get height(){return this._height}set height(t){this.setSize(this._width,t)}setSize(t,s){this.autoResize=!1,typeof t=="object"&&(s=t.height??t.width,t=t.width),this._resize(t,s??t)}_resize(t,s){t===this._width&&s===this._height||(this._width=t,this._height=s,this.onViewUpdate(),this._frameOnResize&&(this._frameOnResize=!1,qo(this._camera,this.root,t/s)))}getSize(t){return t||={},t.width=this._width,t.height=this._height,t}worldToScreen(t,s,r=!1){const i=this._camera;if(i.getGlobalTransform(It,r),It.getInverse(It),Bt.copyFrom(t).applyAffineMatrix4(It),i.mode==="perspective"&&Bt.z>=0)return null;const n=this._width,o=this._height,{x:a,y:c,width:l,height:u}=i.viewport,h=l*n,d=u*o;return!(h>0)||!(d>0)?(pt("View3D.worldToScreen:degenerate","View3D.worldToScreen: view size or camera viewport has zero area."),null):(i.computeProjection(h/d,ue),Bt.applyMatrix4(ue),le.x=(a-this._anchor.x)*n+(Bt.x*.5+.5)*h,le.y=(c-this._anchor.y)*o+(.5-Bt.y*.5)*d,this.getGlobalTransform(Wo,r).apply(le,s))}screenToRay(t,s=new we,r=!1){const i=this._camera,n=this._width,o=this._height,{x:a,y:c,width:l,height:u}=i.viewport,h=l*n,d=u*o;if(!(h>0)||!(d>0))return pt("View3D.screenToRay:degenerate","View3D.screenToRay: view size or camera viewport has zero area."),s.origin.set(0),s.direction.set(0),s;this.getGlobalTransform(Wo,r).applyInverse(t,le);const f=(le.x-(a-this._anchor.x)*n)/h*2-1,p=1-(le.y-(c-this._anchor.y)*o)/d*2;return i.computeProjection(h/d,ue),ue.getInverse(ue),Bt.set(f,p,ey).applyMatrix4(ue),i.getGlobalTransform(It,r),i.mode==="perspective"?(It.extractPosition(s.origin),Bt.applyAffineMatrix4(It),s.direction.copyFrom(Bt).subtract(s.origin).normalize()):(Bt.z=0,Bt.applyAffineMatrix4(It,s.origin),s.direction.set(0,0,-1).transformDirection(It)),s}screenToWorld(t,s,r,i=!1){const n=this.screenToRay(t,sy,i);return typeof s=="number"?n.at(s,r):n.intersectPlane(s,r)}get toneMapping(){return this._toneMapping}set toneMapping(t){if(this._toneMapping!==t){if(this._toneMapping=t,this._passesInitialized&&this._graph.sceneIsLinear){this._teardownGraph();return}this._toneMappingBit=Ns[t],this._invalidateMaterialShaders()}}get cull(){return this._sceneBatch.cull}set cull(t){this._sceneBatch.cull=t}resolution;get shadowFilter(){return this._shadowFilter}set shadowFilter(t){this._shadowFilter!==t&&(this._shadowFilter=t,this._invalidateMaterialShaders())}get fog(){return this._fog}set fog(t){if(this._fog===t)return;this._fog=t;const s=t?ty[t.type??"linear"]:null;s!==this._fogBit&&(this._fogBit=s,this._invalidateMaterialShaders())}get passes(){return this._passes}set passes(t){this._passes=t?t.slice():[],this._passesInitialized&&this._teardownGraph()}_computePassesKey(){let t=0;for(let s=0;s<this._passes.length;s++)this._passes[s].enabled&&(t|=1<<(s&31));return t}_teardownGraph(){this._graph.unload();for(let t=0;t<this.lights.length;t++)this.lights[t].refreshShadows();this._graph.destroy(),this._passesInitialized=!1,this._graphGlobalData=null,this._invalidateMaterialShaders()}get environment(){return this._environment}set environment(t){if(this._environment===t)return;this._environment=t;const s=t===null?vo:t instanceof bt?Dg:Bg;s!==this._envBit&&(this._envBit=s,this._invalidateMaterialShaders())}get background(){return this._background}set background(t){this._background=t===null||t instanceof bt||typeof t=="object"&&"skyColor"in t?t:vt.shared.setValue(t).toNumber()}_syncShadowSampling(){if(this._hasShadows)return;const t=this.lights;let s=0;for(let r=0;r<t.length;r++){const i=t[r];if(!(!i._worldVisible||i.type==="ambient")){if(s>=32)return;if(s++,!!i.canCastShadow){this._hasShadows=!0,this._invalidateMaterialShaders();return}}}}_invalidateMaterialShaders(){const t=this.meshes.items;for(let s=0;s<t.length;s++)t[s]._markBatchDirty();for(let s=1;s<this._meshBatches.length;s++){const r=this._meshBatches[s],i=r.items;for(let n=0;n<i.length;n++)i[n]._batchDirty=!0;if(r._dirtyIndices){for(let n=0;n<i.length;n++)r._dirtyIndices[n]=n;r._dirtyCount=i.length}}}_onRenderableUpdate(t){const s=this._renderablesToUpdate;s.list[s.index++]=t}updateBounds(){const t=this._bounds,s=this._width,r=this._height,{x:i,y:n}=this._anchor;t.minX=-i*s,t.maxX=t.minX+s,t.minY=-n*r,t.maxY=t.minY+r}_attach(t,s=Ke(t)){t._updateTick=-1,t._view3d=this,t===this.root?t._relativeSceneDepth=0:t._relativeSceneDepth=t.parent._relativeSceneDepth+1,t.didChange=!0,this._onChildUpdate(t);const r=t._eventMode,i=r==="none"||!t._interactiveChildren||s===0?0:r==="static"||r==="dynamic"?2:s,n=t.children;for(let o=0;o<n.length;o++)this._attach(n[o],i);t instanceof Di?(this._meshBatches.push(t.batch),this._meshBatchesDirtyId++):t instanceof ye?(this._meshSlots.add(t),this.meshes.add(t),t.skeleton&&this._skinnedMeshes.add(t),t._morph&&this._morphedMeshes.add(t),t.geometry._meshes.add(t),t.material._meshes.add(t),t._markBatchDirty()):t instanceof Me&&this.lights.push(t),s!==0&&(t._isPickCandidate()||s===2&&r!=="none"&&t._hasPickVolume())&&this.events._addInteractive(t),t._hitVolumeInput!==null&&this.events._clipVolumeCount++}_detach(t){const s=t.children;for(let r=0;r<s.length;r++)this._detach(s[r]);if(t instanceof Di){const r=this._meshBatches.indexOf(t.batch);r>0&&(this._meshBatches.splice(r,1),this._meshBatchesDirtyId++)}else if(t instanceof ye){const r=this._meshSlots.getIndex(t);this._sceneBatch.setPassesAt(r,0),this._meshSlots.remove(t),this.meshes.remove(t),this._sceneBatch.storeBuffer.remove(t),t.geometry._meshes.remove(t),t.material._meshes.remove(t),t.didRenderableUpdate=!1,t._lastWorldVisible=1,t._lastBonePitIndex=-1,t.skeleton&&this._skinnedMeshes.remove(t),t._morph&&(this._morphedMeshes.remove(t),t._morph._store?.freeSlot(t._morph))}else if(t instanceof Me){const r=this.lights.indexOf(t);r>-1&&this.lights.splice(r,1),t._releaseShadowState()}t._pickIndex!==-1?this.events._removeInteractive(t):this.events._clearPickState(t),t._hitVolumeInput!==null&&this.events._clipVolumeCount--,t._view3d=null}_onChildUpdate(t){let s=this._childrenToUpdate[t._relativeSceneDepth];s||(s=this._childrenToUpdate[t._relativeSceneDepth]={index:0,list:[]}),s.list[s.index++]=t}_invalidateDrawCaches(){for(let t=0;t<this._meshBatches.length;t++)this._meshBatches[t].invalidateDrawCaches()}_invalidateBundleCaches(){for(let t=0;t<this._meshBatches.length;t++)this._meshBatches[t].invalidateBundleCaches()}_releasePooledTextures(){this._passesInitialized&&(this._graph._releaseTransients(),this._invalidateBundleCaches())}addChild(...t){throw new Error("View3D.addChild() is not available. Use view.root.addChild() instead.")}removeChild(...t){throw new Error("View3D.removeChild() is not available. Use view.root.removeChild() instead.")}removeChildren(t,s){throw new Error("View3D.removeChildren() is not available. Use view.root.removeChildren() instead.")}removeChildAt(t){throw new Error("View3D.removeChildAt() is not available. Use view.root.removeChildAt() instead.")}getChildAt(t){throw new Error("View3D.getChildAt() is not available. Use view.root.getChildAt() instead.")}setChildIndex(t,s){throw new Error("View3D.setChildIndex() is not available. Use view.root.setChildIndex() instead.")}getChildIndex(t){throw new Error("View3D.getChildIndex() is not available. Use view.root.getChildIndex() instead.")}addChildAt(t,s){throw new Error("View3D.addChildAt() is not available. Use view.root.addChildAt() instead.")}swapChildren(t,s){throw new Error("View3D.swapChildren() is not available. Use view.root.swapChildren() instead.")}reparentChild(...t){throw new Error("View3D.reparentChild() is not available. Use view.root.reparentChild() instead.")}reparentChildAt(t,s){throw new Error("View3D.reparentChildAt() is not available. Use view.root.reparentChildAt() instead.")}_ensureInitialized(t,s,r){const i=this.resolution==="inherit"?r:this.resolution,n=this._composite||i!==r;if(this._passesInitialized){const o=this._passes.length>0&&this._passesEnabledKey!==this._computePassesKey(),a=n!==this._compositeRequested&&!(n&&this._graph.sceneColor!==this._graph.defaultColor);(o||a)&&this._teardownGraph()}if(this._passesInitialized){if(this._graphGlobalData!==s)throw new Error("View3D: a view renders with one renderer; its render graph was built for another")}else{this._graphGlobalData=s;const o={composite:n,passes:this._passes,toneMapping:this._toneMapping,globalTextureBindings:s.globalTextureBindings};this._graph=this._buildGraph?this._buildGraph(t,o):N_(t,o).graph,this._graph.compile(),this._toneMappingBit=this._graph.sceneIsLinear?null:Ns[this._toneMapping],this._passesEnabledKey=this._computePassesKey(),this._compositeRequested=n;for(const a in this.passByBit)delete this.passByBit[a];this._dirtyHookBits=0;for(const a of this._graph.passes){const c=a;if(c.bit===$.NONE)continue;const l=this.passByBit[c.bit];if(c.camera){if(l)continue}else if(l&&!l.camera)throw new Error(`Render pass "${c.name}" is used twice in this view; give the second one a camera.`);this.passByBit[c.bit]=c,this._dirtyHookBits|=c.bit}for(const a of this._graph.passes){const c=a;if(!(c.bit===$.NONE||!c.descriptor)&&this.passByBit[c.bit]!==c)throw new Error(`Render pass "${c.name}" has a descriptor, but another pass owns that name. Put the descriptor there, or give this pass its own name.`)}this._passesInitialized=!0}this._graph.resolution=this._graph.sceneColor===this._graph.defaultColor?r:i}unload(){if(!this.destroyed){for(let t=0;t<this._meshBatches.length;t++)this._meshBatches[t].unload();for(let t=0;t<this.lights.length;t++){const s=this.lights[t];s._gpuShadowData&&(s._releaseShadowState(),s.refreshShadows())}this._bonePit.unload(),this._passesInitialized&&this._teardownGraph(),super.unload()}}destroy(t){if(this.destroyed)return;this.unload();const s=this.root;s instanceof ye&&!s.destroyed&&(s.geometry._meshes.remove(s),s.material._meshes.remove(s),s.didRenderableUpdate=!1),Ut(t,"children")?this.root.destroy(t):(this.root.removeChildren(0,this.root.children.length),this.root._view3d=null),this._passesInitialized&&this._graph&&this._graph.destroy(),this._bonePit.destroy();const r=this._morphedMeshes.items;for(let i=0;i<r.length;i++){const n=r[i]._morph;n._store?.freeSlot(n)}this._sceneBatch.destroy(),this._meshSlots.items.length=0,this._meshSlots.count=0,this.meshes=null,this._skinnedMeshes=null,this._morphedMeshes=null,this._childrenToUpdate=null,this._renderablesToUpdate=null,this.events.destroy(),this.passByBit=null,this._dirtyHookBits=0,super.destroy(t),this.lights=null,this._meshBatches=null}},iu=class{globalUniformGroup;globalBindGroup;globalTextureBindings;lastMaterialStoreBufferVersion=-1;lastAtlasBufferVersion=-1;lastMorphStoreBufferVersion=-1;lastGeometryStoreBufferVersion=-1;_destroyed=!1;constructor(e,t,s){this.globalUniformGroup=e,this.globalBindGroup=t,this.globalTextureBindings=s}destroy(){this._destroyed||(this._destroyed=!0,this.globalBindGroup.destroy(),this.globalUniformGroup.buffer?.destroy())}};function iy(){_s.push({type:"mat4x4<f32>",test:e=>e.value.elements?.length===16,uniform:`
        gl.uniformMatrix4fv(ud[name].location, false, uv[name].elements);
        `,ubo:`
        var v = uv[name].elements;
        for(var i=0;i<16;i++)
        {
            data[offset + i] = v[i];
        }
    `}),_s.push({type:"mat3x3<f32>",test:e=>e.value.elements?.length===9,uniform:`
        gl.uniformMatrix3fv(ud[name].location, false, uv[name].elements);
        `,ubo:`
        var v = uv[name].elements;
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];
    `}),_s.push({type:"vec3<f32>",test:e=>e.type==="vec3<f32>"&&e.size===1&&e.value.x!==void 0,uniform:`
        cv = ud[name].value;
        v = uv[name];

        if(cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.z)
        {
            cv[0] = v.x;
            cv[1] = v.y;
            cv[2] = v.z;
            gl.uniform3f(ud[name].location, v.x, v.y, v.z);
        }
        `,ubo:`
        v = uv[name];
        data[offset] = v.x;
        data[offset + 1] = v.y;
        data[offset + 2] = v.z;
    `}),_s.push({type:"vec3<f32>",test:e=>e.type==="vec3<f32>"&&e.value.r!==void 0&&e.value.g!==void 0&&e.value.b!==void 0,uniform:`
        cv = ud[name].value;
        v = uv[name];

        if(cv[0] !== v.r || cv[1] !== v.g || cv[2] !== v.b)
        {
            cv[0] = v.r;
            cv[1] = v.g;
            cv[2] = v.b;
            gl.uniform3f(ud[name].location, v.r, v.g, v.b);
        }
        `,ubo:`
        v = uv[name];
        data[offset] = v.r;
        data[offset + 1] = v.g;
        data[offset + 2] = v.b;
    `})}ke.add(up,cp,kd,wp);ke.mixin(tt,y_);ke.mixin(ry,x_);const ny=[{extension:{type:nt.WebGLLoader,name:"pixijs-3d"},load:()=>di(()=>Promise.resolve().then(()=>qy),void 0,import.meta.url)},{extension:{type:nt.WebGPULoader,name:"pixijs-3d"},load:()=>di(()=>Promise.resolve().then(()=>Px),void 0,import.meta.url)}];iy();ke.add(...ny);const As=1e-6,Yt=2*Math.PI,oy=Math.cos(70*(Math.PI/180)),Ko=new F(0,1,0),q=new F,Fs=new Fc,He=new we,oi=new F,je=new F,zs=new F;var Gx=class Us extends ia{static defaultOptions={enabled:!0,autoUpdate:!0,minDistance:0,maxDistance:1/0,minZoom:0,maxZoom:1/0,minPolarAngle:0,maxPolarAngle:Math.PI,minAzimuthAngle:-1/0,maxAzimuthAngle:1/0,enableDamping:!1,dampingFactor:.05,enableZoom:!0,zoomSpeed:1,enableRotate:!0,rotateSpeed:1,enablePan:!0,panSpeed:1,screenSpacePanning:!0,zoomToCursor:!1,autoRotate:!1,autoRotateSpeed:2,mouseButtons:{left:"rotate",middle:"zoom",right:"pan"},touches:{one:"rotate",two:"zoom-pan"},preventContextMenu:!0};view;enabled;target=new F;minDistance=0;maxDistance=0;minZoom=0;maxZoom=0;minPolarAngle=0;maxPolarAngle=0;minAzimuthAngle=0;maxAzimuthAngle=0;enableDamping;dampingFactor=0;enableZoom;zoomSpeed=0;enableRotate;rotateSpeed=0;enablePan;panSpeed=0;screenSpacePanning;zoomToCursor;autoRotate;autoRotateSpeed=0;mouseButtons;touches;preventContextMenu;_up=new F(0,1,0);_quat=new mt;_quatInverse=new mt;_autoUpdate=!1;_gesture="none";_savedTarget=new F;_savedPosition=new F;_savedZoom=1;_lastPosition=new F;_lastQuaternion=new mt;_lastTarget=new F;_emittingChange=!1;_spherical=new Eo;_sphericalDelta=new Eo;_scale=1;_panOffset=new F;_rotateStart=new rt;_rotateEnd=new rt;_rotateDelta=new rt;_panStart=new rt;_panEnd=new rt;_panDelta=new rt;_pinchStart=0;_pinchCenter=new rt;_zoomStartY=0;_zoomDirection=new F;_zoomCursorGlobal=new rt;_performCursorZoom=!1;_pointers=[];_pointerPositions=new Map;_local=new rt;constructor(t){super();const s={...Us.defaultOptions,...it(t)};this.view=t.view,this.enabled=s.enabled,this.minDistance=s.minDistance,this.maxDistance=s.maxDistance,this.minZoom=s.minZoom,this.maxZoom=s.maxZoom,this.minPolarAngle=s.minPolarAngle,this.maxPolarAngle=s.maxPolarAngle,this.minAzimuthAngle=s.minAzimuthAngle,this.maxAzimuthAngle=s.maxAzimuthAngle,this.enableDamping=s.enableDamping,this.dampingFactor=s.dampingFactor,this.enableZoom=s.enableZoom,this.zoomSpeed=s.zoomSpeed,this.enableRotate=s.enableRotate,this.rotateSpeed=s.rotateSpeed,this.enablePan=s.enablePan,this.panSpeed=s.panSpeed,this.screenSpacePanning=s.screenSpacePanning,this.zoomToCursor=s.zoomToCursor,this.autoRotate=s.autoRotate,this.autoRotateSpeed=s.autoRotateSpeed,this.mouseButtons={...Us.defaultOptions.mouseButtons,...t.mouseButtons},this.touches={...Us.defaultOptions.touches,...t.touches},this.preventContextMenu=s.preventContextMenu,s.target&&this.target.copyFrom(s.target),this.up=s.up??Ko,this.saveState();const r=this.view;r.on("pointerdown",this._onPointerDown),r.on("globalpointermove",this._onPointerMove),r.on("pointerup",this._onPointerUp),r.on("pointerupoutside",this._onPointerUp),r.on("pointercancel",this._onPointerUp),r.on("wheel",this._onWheel),r.on("contextmenu",this._onContextMenu),this.autoUpdate=s.autoUpdate,this.update()}get camera(){return this.view.camera}get up(){return this._up}set up(t){this._up.copyFrom(t).normalize(),this._quat.setFromUnitVectors(this._up,Ko),this._quatInverse.copyFrom(this._quat).inverse()}get autoUpdate(){return this._autoUpdate}set autoUpdate(t){t!==this._autoUpdate&&(this._autoUpdate=t,t?Qs.shared.add(this._onTick,void 0,ca.HIGH):Qs.shared.remove(this._onTick))}get polarAngle(){return this._spherical.phi}get azimuthAngle(){return this._spherical.theta}get distance(){return q.copyFrom(this.camera.position).distanceTo(this.target)}destroy(){this.autoUpdate=!1;const t=this.view;t.off("pointerdown",this._onPointerDown),t.off("globalpointermove",this._onPointerMove),t.off("pointerup",this._onPointerUp),t.off("pointerupoutside",this._onPointerUp),t.off("pointercancel",this._onPointerUp),t.off("wheel",this._onWheel),t.off("contextmenu",this._onContextMenu),this._pointers=null,this._pointerPositions=null,this._gesture="none",this.removeAllListeners()}saveState(){this._savedTarget.copyFrom(this.target),this._savedPosition.copyFrom(this.camera.position),this._savedZoom=this.camera.zoom}reset(){this.target.copyFrom(this._savedTarget),this.camera.position.copyFrom(this._savedPosition),this.camera.zoom=this._savedZoom,this._emitChange(),this.update(),this._gesture="none"}rotate(t,s){this._sphericalDelta.theta-=t,this._sphericalDelta.phi-=s,this.update()}pan(t,s){this._pan(t,s),this.update()}zoom(t){this._scale/=t,this.update()}update(t){const s=this.camera;if(q.copyFrom(s.position).subtract(this.target),q.applyQuaternion(this._quat),this._spherical.setFromPoint3D(q),this.autoRotate&&this._gesture==="none"){const o=t?t.deltaTime:1;this._sphericalDelta.theta-=Yt/3600*this.autoRotateSpeed*o}this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let r=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(r)&&isFinite(i)&&(r<-Math.PI?r+=Yt:r>Math.PI&&(r-=Yt),i<-Math.PI?i+=Yt:i>Math.PI&&(i-=Yt),r<=i?this._spherical.theta=Z(this._spherical.theta,r,i):this._spherical.theta=this._spherical.theta>(r+i)/2?Math.max(r,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Z(this._spherical.phi,this.minPolarAngle,this.maxPolarAngle),this._spherical.makeSafe(),this.enableDamping?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset);let n=!1;if(this.zoomToCursor&&this._performCursorZoom||s.mode==="orthographic")this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),n=o!==this._spherical.radius}if(q.setFromSpherical(this._spherical),q.applyQuaternion(this._quatInverse),s.position.set(this.target.x+q.x,this.target.y+q.y,this.target.z+q.z),s.lookAt(this.target),this.enableDamping?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o;if(s.mode==="perspective"){const a=q.magnitude();o=this._clampDistance(a*this._scale);const c=a-o;s.position.set(s.position.x+this._zoomDirection.x*c,s.position.y+this._zoomDirection.y*c,s.position.z+this._zoomDirection.z*c),s.lookAt(this.target),n=!!c}else{const a=s.zoom;je.copyFrom(this.view.screenToRay(this._zoomCursorGlobal,He).origin),s.zoom=Z(s.zoom/this._scale,this.minZoom,this.maxZoom),n=a!==s.zoom,this.view.screenToRay(this._zoomCursorGlobal,He),s.position.add(je).subtract(He.origin),o=q.magnitude()}if(oi.copyFrom(s.position),this.screenSpacePanning)this.target.set(0,0,-1).transformDirection(s.worldTransform).multiplyScalar(o).add(oi);else if(je.copyFrom(oi),zs.set(0,0,-1).transformDirection(s.worldTransform),Math.abs(this._up.dot(zs))<oy)s.lookAt(this.target);else{Fs.setFromNormalAndCoplanarPoint(this._up,this.target);const a=zs.dot(Fs.normal);if(Math.abs(a)>As){const c=-(je.dot(Fs.normal)+Fs.constant)/a;c>=0&&this.target.copyFrom(je).addScaledVector(zs,c)}}}else if(s.mode==="orthographic"){const o=s.zoom;s.zoom=Z(s.zoom/this._scale,this.minZoom,this.maxZoom),n=o!==s.zoom}return this._scale=1,this._performCursorZoom=!1,n||this._lastPosition.distanceToSquared(s.position)>As||8*(1-this._lastQuaternion.dot(s.quaternion))>As||this._lastTarget.distanceToSquared(this.target)>As?(this._lastPosition.copyFrom(s.position),this._lastQuaternion.copyFrom(s.quaternion),this._lastTarget.copyFrom(this.target),this._emitChange(),!0):!1}_emitChange(){if(!this._emittingChange){this._emittingChange=!0;try{this.emit("change")}finally{this._emittingChange=!1}}}_onTick=t=>{this.update(t)};_viewportHeight(){return this.view.height*this.camera.viewport.height}_viewportWidth(){return this.view.width*this.camera.viewport.width}_zoomScale(t){return Math.pow(.95,this.zoomSpeed*Math.abs(t*.01))}_rotateBy(t,s){const r=this._viewportHeight();this._sphericalDelta.theta-=Yt*t/r,this._sphericalDelta.phi-=Yt*s/r}_panLeft(t,s){q.setFromMatrixColumn(s,0),q.multiplyScalar(-t),this._panOffset.add(q)}_panUp(t,s){this.screenSpacePanning?q.setFromMatrixColumn(s,1):(q.setFromMatrixColumn(s,0),this._up.cross(q,q)),q.multiplyScalar(t),this._panOffset.add(q)}_pan(t,s){const r=this.camera,i=this._viewportHeight();if(r.mode==="perspective"){q.copyFrom(r.position).subtract(this.target);const n=q.magnitude()*r._tanHalfFovY();this._panLeft(2*t*n/i,r.worldTransform),this._panUp(2*s*n/i,r.worldTransform)}else{const n=this._viewportWidth(),o=2*r.orthographicSize/r.zoom;this._panLeft(t*o/n,r.worldTransform),this._panUp(s*o*(i/n)/i,r.worldTransform)}}_clampDistance(t){return Z(t,this.minDistance,this.maxDistance)}_setZoomCursor(t){this.zoomToCursor&&(this._performCursorZoom=!0,this._zoomCursorGlobal.copyFrom(t),this.view.screenToRay(t,He),this._zoomDirection.copyFrom(He.direction))}_toLocal(t){return this.view.toLocal(t.global,void 0,this._local,!0),this._local}_trackPointer(t,s){let r=this._pointerPositions.get(t);r===void 0&&(r=new rt,this._pointerPositions.set(t,r)),r.copyFrom(s)}_otherPointer(t){const s=t===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions.get(s)}_touchCenter(t,s,r){if(this._pointers.length===1)return r.copyFrom(s);const i=this._otherPointer(t);return r.set(.5*(s.x+i.x),.5*(s.y+i.y))}_touchSpread(t,s){const r=this._otherPointer(t),i=s.x-r.x,n=s.y-r.y;return Math.sqrt(i*i+n*n)}_onPointerDown=t=>{if(!this.enabled||this._pointers.includes(t.pointerId))return;this._pointers.push(t.pointerId);const s=this._toLocal(t);t.pointerType==="touch"?this._startTouch(t.pointerId,s):this._startMouse(t,s)};_onPointerMove=t=>{if(!this.enabled||!this._pointers.includes(t.pointerId))return;const s=this._toLocal(t);t.pointerType==="touch"?this._moveTouch(t.pointerId,s):this._moveMouse(s)};_onPointerUp=t=>{const s=this._pointers.indexOf(t.pointerId);if(s!==-1){if(this._pointers.splice(s,1),this._pointerPositions.delete(t.pointerId),this._pointers.length===0)this._gesture="none",this.emit("end");else if(this._pointers.length===1){const r=this._pointers[0];this._startTouch(r,this._pointerPositions.get(r))}}};_onWheel=t=>{if(!this.enabled||!this.enableZoom||this._gesture!=="none")return;let s=t.deltaY;t.deltaMode===1?s*=16:t.deltaMode===2&&(s*=100),t.ctrlKey&&(s*=10),this.emit("start"),this._setZoomCursor(t.global),s<0?this._scale*=this._zoomScale(s):s>0&&(this._scale/=this._zoomScale(s)),this.update(),this.emit("end")};_onContextMenu=t=>{this.enabled&&this.preventContextMenu&&t.preventDefault()};_startMouse(t,s){let r;switch(t.button){case 0:r=this.mouseButtons.left;break;case 1:r=this.mouseButtons.middle;break;case 2:r=this.mouseButtons.right;break;default:r="none"}const i=t.ctrlKey||t.metaKey||t.shiftKey;switch(i&&r==="rotate"?r="pan":i&&r==="pan"&&(r="rotate"),r){case"rotate":if(!this.enableRotate)return;this._rotateStart.copyFrom(s),this._gesture="rotate";break;case"zoom":if(!this.enableZoom)return;this._setZoomCursor(t.global),this._zoomStartY=s.y,this._gesture="zoom";break;case"pan":if(!this.enablePan)return;this._panStart.copyFrom(s),this._gesture="pan";break;default:this._gesture="none";return}this.emit("start")}_moveMouse(t){switch(this._gesture){case"rotate":if(!this.enableRotate)return;this._rotateEnd.copyFrom(t),this._rotateDelta.copyFrom(this._rotateEnd).subtract(this._rotateStart).multiplyScalar(this.rotateSpeed),this._rotateBy(this._rotateDelta.x,this._rotateDelta.y),this._rotateStart.copyFrom(this._rotateEnd);break;case"zoom":{if(!this.enableZoom)return;const s=t.y-this._zoomStartY;s>0?this._scale/=this._zoomScale(s):s<0&&(this._scale*=this._zoomScale(s)),this._zoomStartY=t.y;break}case"pan":if(!this.enablePan)return;this._panEnd.copyFrom(t),this._panDelta.copyFrom(this._panEnd).subtract(this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copyFrom(this._panEnd);break;default:return}this.update()}_startTouch(t,s){this._trackPointer(t,s);const r=this._pointers.length;switch(r===1?this.touches.one:r===2?this.touches.two:"none"){case"rotate":if(!this.enableRotate)return;this._touchCenter(t,s,this._rotateStart),this._gesture="touch-rotate";break;case"pan":if(!this.enablePan)return;this._touchCenter(t,s,this._panStart),this._gesture="touch-pan";break;case"zoom-pan":if(!this.enableZoom&&!this.enablePan)return;this.enableZoom&&(this._pinchStart=this._touchSpread(t,s)),this.enablePan&&this._touchCenter(t,s,this._panStart),this._gesture="touch-zoom-pan";break;case"zoom-rotate":if(!this.enableZoom&&!this.enableRotate)return;this.enableZoom&&(this._pinchStart=this._touchSpread(t,s)),this.enableRotate&&this._touchCenter(t,s,this._rotateStart),this._gesture="touch-zoom-rotate";break;default:this._gesture="none";return}this.emit("start")}_moveTouch(t,s){switch(this._trackPointer(t,s),this._gesture){case"touch-rotate":if(!this.enableRotate)return;this._touchRotate(t,s);break;case"touch-pan":if(!this.enablePan)return;this._touchPan(t,s);break;case"touch-zoom-pan":if(!this.enableZoom&&!this.enablePan)return;this.enableZoom&&this._touchPinch(t,s),this.enablePan&&this._touchPan(t,s);break;case"touch-zoom-rotate":if(!this.enableZoom&&!this.enableRotate)return;this.enableZoom&&this._touchPinch(t,s),this.enableRotate&&this._touchRotate(t,s);break;default:this._gesture="none";return}this.update()}_touchRotate(t,s){this._touchCenter(t,s,this._rotateEnd),this._rotateDelta.copyFrom(this._rotateEnd).subtract(this._rotateStart).multiplyScalar(this.rotateSpeed),this._rotateBy(this._rotateDelta.x,this._rotateDelta.y),this._rotateStart.copyFrom(this._rotateEnd)}_touchPan(t,s){this._touchCenter(t,s,this._panEnd),this._panDelta.copyFrom(this._panEnd).subtract(this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copyFrom(this._panEnd)}_touchPinch(t,s){const r=this._touchSpread(t,s);this._scale/=Math.pow(r/this._pinchStart,this.zoomSpeed),this._pinchStart=r;const i=this._touchCenter(t,s,this._pinchCenter);this._setZoomCursor(this.view.toGlobal(i,i,!0))}};const Ye={name:"globalGl",structs:{Light:$g,ShadowData:_l},bindings:{global:{uGlobalLightParams:"vec4<f32>",uTime:"f32",uFogColor:"vec3<f32>",uDisplayExposure:"f32",uFogParams:"vec3<f32>",uExposure:"f32",uHemisphereSky:"vec3<f32>",uHemisphereGround:"vec3<f32>",uHemisphereUp:"vec3<f32>",uEnvironmentMaxMipLevel:"f32",uLightData:"array<vec4<f32>, 128>",uShadowData:`array<vec4<f32>, ${Ft*6}>`,uEnvironmentTexture:"texture_cube<f32>",uBrdfLutTexture:"texture_2d<f32>",uMaterialStorage:"texture_2d<u32>",uShadowMap:"texture_depth_2d_array",uBonePitTexture:"texture_2d<f32>",uOpaqueDepthTexture:"texture_2d<f32>",uOpaqueColorTexture:"texture_2d<f32>",uMorphTexture:"texture_2d<f32>",uGeometryTexture:"texture_2d<u32>"}},gl:{header:`
const float LIGHT_DIRECTIONAL = 0.0;
const float LIGHT_POINT = 1.0;
const float LIGHT_SPOT = 2.0;
`}};function ay(){return{uEnvironmentMaxMipLevel:{value:0,type:"f32"}}}function cr(e,t){let s=e._gpuData[t.uid];if(!s){const r=Uc(e._lightDataList.data,e._shadowDataList.data,ay()),i=new gt({global:r,uEnvironmentTexture:Ot.source,uBrdfLutTexture:L.EMPTY.source,uMaterialStorage:Xt.source,uShadowMap:zi.source,uBonePitTexture:L.EMPTY.source,uOpaqueDepthTexture:L.EMPTY.source,uOpaqueColorTexture:L.EMPTY.source,uMorphTexture:L.EMPTY.source,uGeometryTexture:Xt.source,uMeshStoreTexture:Xt.source,uRenderInstanceTexture:Xt.source,batchTransform:t.material3d.batcher.batchTransform,uInstanceStoreTexture:Xt.source});s=new iu(r,i,{opaqueColor:{group:i,slot:"uOpaqueColorTexture"},opaqueDepth:{group:i,slot:"uOpaqueDepthTexture"},shadowMap:{group:i,slot:"uShadowMap"}}),e._gpuData[t.uid]=s}return s}var nu=class{static extension={type:[nt.WebGLSystem],name:"lighting3d"};_renderer;constructor(e){this._renderer=e}update(e,t){const s=e.passByBit[$.SHADOW];s?.beginFrame(e);const r=cr(e,this._renderer).globalUniformGroup.uniforms,i=r.uGlobalLightParams;i[0]=0,i[1]=0,i[2]=0;const n=e.environment;n!==null&&!(n instanceof bt)&&Ui(n,r.uHemisphereSky,r.uHemisphereGround,r.uHemisphereUp);const o=e._lightDataList;o.reset();for(let a=0;a<t.length;a++){const c=t[a];if(c._worldVisible){if(c.type==="ambient"){Ha(i,0,c.color,c.intensity);continue}o.count>=32||(s?.prepareShadow(c,e),o.add(c))}}i[3]=o.count}};function ou(e){const t=e?" * 2":"";return{name:e?"morphTargetNormalGl":"morphTargetGl",bindings:{global:{uMorphTexture:"texture_2d<f32>",uGeometryTexture:"texture_2d<u32>"}},gl:{vertex:{header:`
        vec4 fetchMorphTexel(int texel) {
          return texelFetch(uMorphTexture, ${Pt("texel")}, 0);
        }

        float fetchMorphWeight(int index) {
          return fetchMorphTexel(index >> 2)[index & 3];
        }

        uvec4 fetchGeometryMorphFacts(int geometryIndex) {
          int texel = geometryIndex * 2 + 1;
          return texelFetch(uGeometryTexture, ${Pt("texel")}, 0);
        }
      `,input:`
        if (morphData.x != 0.0) {
          uvec4 morphFacts = fetchGeometryMorphFacts(int(morphData.y));
          int morphTargetCount = int(morphFacts.y);
          int vidLocal = gl_VertexID - int(morphFacts.z);
          int morphDeltaTexel = int(morphFacts.x) / 4 + vidLocal * morphTargetCount${t};
          int morphWeightIndex = int(morphData.x);
          vec3 morphedPosition = position.xyz;${e?`
          vec3 morphedNormal = normal;`:""}
          for (int morphIndex = 0; morphIndex < morphTargetCount; morphIndex++) {
            float morphWeight = fetchMorphWeight(morphWeightIndex + morphIndex);
            if (morphWeight != 0.0) {
              morphedPosition += fetchMorphTexel(morphDeltaTexel + morphIndex${t}).xyz * morphWeight;${e?`
              morphedNormal += fetchMorphTexel(morphDeltaTexel + morphIndex * 2 + 1).xyz * morphWeight;`:""}
            }
          }
          position = vec4(morphedPosition, position.w);${e?`
          normal = normalize(morphedNormal);`:""}
        }
      `}}}}const au=ou(!1),cu=ou(!0);function Hs(e){return Number.isInteger(e)?`${e}.0`:`${e}`}function cy(e){const t=e.some(([i,n])=>i!==0||n!==0),s=([i,n])=>i===0&&n===0?"uv":`uv + vec2(${Hs(i)}, ${Hs(n)}) * texelSize`,r=["      float currentDepth = depth - params.x;"];if(t&&r.push("      float texelSize = 1.0 / params.z;"),r.push("      float fl = float(layer);",""),e.length===1)r.push(`      return texture(uShadowMap, vec4(${s(e[0])}, fl, currentDepth));`);else{const i=e.map(n=>`        texture(uShadowMap, vec4(${s(n)}, fl, currentDepth))`).join(` +
`);r.push(`      float shadow =
${i};`,"",`      return shadow / ${Hs(e.length)};`)}return r.join(`
`)}function ai(e){return{name:`shadowGl:${e}`,structs:{ShadowData:_l},bindings:{global:{uShadowMap:"texture_depth_2d_array",uShadowData:`array<vec4<f32>, ${Ft*6}>`}},gl:{header:`

    ShadowData getShadowData(int index) {
      int offset = index * 6;
      ShadowData sd;
      sd.lightSpaceMatrix = mat4(
        uShadowData[offset + 0],
        uShadowData[offset + 1],
        uShadowData[offset + 2],
        uShadowData[offset + 3]
      );
      sd.shadowParams = uShadowData[offset + 4];
      sd.cascadeSplits = uShadowData[offset + 5];
      return sd;
    }

    float sampleShadowLayer(int layer, mat4 lightSpaceMatrix, vec3 worldPos, vec3 normal, vec3 params, float NdotL) {
      vec3 biasedPos = worldPos + normal * (params.y * (1.0 - NdotL));
      vec4 lightSpacePos = lightSpaceMatrix * vec4(biasedPos, 1.0);
      vec3 projPos = lightSpacePos.xyz / lightSpacePos.w;

      vec2 uv = projPos.xy * 0.5 + 0.5;
      float depth = projPos.z * 0.5 + 0.5;

      vec3 uvd = vec3(uv, depth);
      if (any(notEqual(clamp(uvd, 0.0, 1.0), uvd))) {
        return 1.0;
      }

${cy(yl[e])}
    }

    float calculateShadow(
      Light light,
      vec3 worldPos,
      vec3 normal,
      float NdotL
    ) {
      int baseIndex = int(light.shadowDataIndex);

      if (baseIndex == -1) {
        return 1.0;
      }

      ShadowData base = getShadowData(baseIndex);
      int last = int(base.shadowParams.w) - 1;

      if (last < 1) {
        return sampleShadowLayer(baseIndex, base.lightSpaceMatrix, worldPos, normal, base.shadowParams.xyz, NdotL);
      }

      float viewDepth = -(uViewMatrix * vec4(worldPos, 1.0)).z;
      vec3 splits = base.cascadeSplits.xyz;

      vec3 crossed = step(splits, vec3(viewDepth));
      int cascadeIndex = int(min(dot(crossed, vec3(1.0)), float(last)));

      int idx = baseIndex + cascadeIndex;
      ShadowData sd = getShadowData(idx);
      float shadow = sampleShadowLayer(idx, sd.lightSpaceMatrix, worldPos, normal, sd.shadowParams.xyz, NdotL);

      if (cascadeIndex == last) {
        return shadow;
      }

      vec3 hot = vec3(float(cascadeIndex == 0), float(cascadeIndex == 1), float(cascadeIndex == 2));
      float splitFar = dot(splits, hot);
      float splitNear = dot(splits, vec3(hot.y, hot.z, 0.0));

      float band = max((splitFar - splitNear) * ${Hs(Vc)}, 1e-4);
      float blend = clamp((viewDepth - splitFar + band) / band, 0.0, 1.0);

      if (blend <= 0.0) {
        return shadow;
      }

      ShadowData nd = getShadowData(idx + 1);
      float next = sampleShadowLayer(idx + 1, nd.lightSpaceMatrix, worldPos, normal, nd.shadowParams.xyz, NdotL);

      return mix(shadow, next, blend);
    }
  `}}}const lu={hard:ai("hard"),pcf:ai("pcf"),"pcf-high":ai("pcf-high")},js={name:"skinningGl",attributes:{aJoints:"uint8x4",aWeights:"float32x4"},bindings:{global:{uBonePitTexture:"texture_2d<f32>"}},gl:{vertex:{header:`
        void getBoneRows(uint jointIndex, uint bonePitIndex, out vec4 r0, out vec4 r1, out vec4 r2) {
          int baseTexel = int(bonePitIndex + jointIndex) * 3;

          r0 = texelFetch(uBonePitTexture, ${Pt("baseTexel")}, 0);
          r1 = texelFetch(uBonePitTexture, ${Pt("baseTexel + 1")}, 0);
          r2 = texelFetch(uBonePitTexture, ${Pt("baseTexel + 2")}, 0);
        }
      `,input:`
        vec4 skinRow0, skinRow1, skinRow2;
        vec4 b0, b1, b2;

        getBoneRows(uint(aJoints.x), uint(bonePitIndex), b0, b1, b2);
        skinRow0 = b0 * aWeights.x;
        skinRow1 = b1 * aWeights.x;
        skinRow2 = b2 * aWeights.x;

        getBoneRows(uint(aJoints.y), uint(bonePitIndex), b0, b1, b2);
        skinRow0 += b0 * aWeights.y;
        skinRow1 += b1 * aWeights.y;
        skinRow2 += b2 * aWeights.y;

        getBoneRows(uint(aJoints.z), uint(bonePitIndex), b0, b1, b2);
        skinRow0 += b0 * aWeights.z;
        skinRow1 += b1 * aWeights.z;
        skinRow2 += b2 * aWeights.z;

        getBoneRows(uint(aJoints.w), uint(bonePitIndex), b0, b1, b2);
        skinRow0 += b0 * aWeights.w;
        skinRow1 += b1 * aWeights.w;
        skinRow2 += b2 * aWeights.w;

        position = vec4(dot(skinRow0, position), dot(skinRow1, position), dot(skinRow2, position), position.w);
        normal = vec3(dot(skinRow0.xyz, normal), dot(skinRow1.xyz, normal), dot(skinRow2.xyz, normal));
        tangent = vec3(dot(skinRow0.xyz, tangent), dot(skinRow1.xyz, tangent), dot(skinRow2.xyz, tangent));
      `}}},ly={float32:"float",float32x2:"vec2",float32x3:"vec3",float32x4:"vec4",sint32:"int",sint32x2:"ivec2",sint32x3:"ivec3",sint32x4:"ivec4",uint32:"uint",uint32x2:"uvec2",uint32x3:"uvec3",uint32x4:"uvec4",float16x2:"vec2",float16x4:"vec4",unorm8x2:"vec2",unorm8x4:"vec4",snorm8x2:"vec2",snorm8x4:"vec4",uint8x2:"uvec2",uint8x4:"uvec4",sint8x2:"ivec2",sint8x4:"ivec4",unorm16x2:"vec2",unorm16x4:"vec4",snorm16x2:"vec2",snorm16x4:"vec4",uint16x2:"uvec2",uint16x4:"uvec4",sint16x2:"ivec2",sint16x4:"ivec4"};function uy(e){const t=ly[e];return t||(V(`[compileAttributesGlsl] Unknown vertex format: "${e}"`),"vec4")}function hy(e,t,s){V(`[compileAttributesGlsl] Attribute "${e}" redefined with different format: "${s}" → "${t}". Keeping original.`)}function dy(e,t={}){const{useLocations:s=!0}=t,r=new Map;for(const o of e)if(o.attributes)for(const[a,c]of Object.entries(o.attributes))r.has(a)?r.get(a)!==c&&hy(a,c,r.get(a)):r.set(a,c);const i=[];let n=0;for(const[o,a]of r){const c=uy(a);s?i.push(`layout(location = ${n++}) in ${c} ${o};`):i.push(`in ${c} ${o};`)}return i.join(`
`)}const uu={collectData(e){if(e.stage==="vertex"){const t=e.data.glsl??={};t.attributes??=dy(e.bits,{useLocations:e.glslOptions?.useLocations})}},injectCode(e){return e.stage==="vertex"?{header:e.data.glsl.attributes}:{}}},Pe={f32:"float",i32:"int",u32:"uint","vec2<f32>":"vec2","vec3<f32>":"vec3","vec4<f32>":"vec4","vec2<i32>":"ivec2","vec3<i32>":"ivec3","vec4<i32>":"ivec4","vec2<u32>":"uvec2","vec3<u32>":"uvec3","vec4<u32>":"uvec4"},lr={...Pe,bool:"bool","mat2x2<f32>":"mat2","mat3x3<f32>":"mat3","mat4x4<f32>":"mat4","mat2x3<f32>":"mat2x3","mat2x4<f32>":"mat2x4","mat3x2<f32>":"mat3x2","mat3x4<f32>":"mat3x4","mat4x2<f32>":"mat4x2","mat4x3<f32>":"mat4x3","texture_2d<f32>":"sampler2D","texture_2d<u32>":"usampler2D","texture_2d<i32>":"isampler2D","texture_2d_array<f32>":"sampler2DArray","texture_3d<f32>":"sampler3D","texture_cube<f32>":"samplerCube",texture_depth_2d:"sampler2DShadow",texture_depth_2d_array:"sampler2DArrayShadow",texture_depth_cube:"samplerCubeShadow",texture_depth_cube_array:"samplerCubeArrayShadow",sampler:"",sampler_comparison:""};function hu(e){const t=e.match(/^array<(.+),\s*(\d+)>$/);return t?{baseType:t[1],size:t[2]}:null}function du(e){const t=hu(e);if(t){const r=lr[t.baseType]??t.baseType;return r?{glslType:r,arraySize:t.size}:null}const s=lr[e];return s!==void 0?s||null:e}const fy=new Set(["sampler2D","usampler2D","isampler2D","sampler2DArray","sampler3D","samplerCube","sampler2DShadow","sampler2DArrayShadow","samplerCubeShadow","samplerCubeArrayShadow"]);function Yi(e){return`u${rs(e)}`}function os(e,t){return`${e}_${t}`}function py(e){const t=hu(e),s=t?t.baseType:e;return/^mat[234]x2</.test(s)?!t&&s==="mat2x2<f32>":!t||s.startsWith("vec4")||s.startsWith("mat")}function my(e){const t=lr[e];return t!==void 0&&t||e}function ci(e,t,s){V(`[collectBindingsGlsl] Binding "${e}" redefined with different type: "${s}" → "${t}". Keeping original.`)}function gy(e,t){const s=us(t),r=Object.create(null);for(const{name:n}of s)r[n]={uniformGroups:Object.create(null),resources:Object.create(null),uniformBuffers:Object.create(null)};const i=Object.create(null);for(const n of e)if(n.structs)for(const[o,a]of Object.entries(n.structs))o in i||(i[o]=a);for(const n of e)if(n.bindings)for(const[o,a]of Object.entries(n.bindings)){if(!a)continue;const c=rs(o),l=o in r;for(const{name:u,spec:h,uniformGroup:d}of Re(a,o)){const f=hs(h);if(mr(f))continue;if(gr(f)){if(!l)continue;const b=Ea(f);if(!b){V(`[collectBindingsGlsl] Bit "${n.name}" binding "${u}" has invalid uniform buffer type: "${f}". Expected format: uniform<StructName>`);continue}const y=r[o].uniformBuffers;u in y?y[u]!==b&&ci(u,b,y[u]):(y[u]=b,i[b]??={});continue}const p=du(f);if(!p)continue;const m=typeof p=="object",_=m?p.glslType:p,g=m?p.arraySize:void 0;if(fy.has(_)){if(l){const b=r[o].resources;u in b?b[u]!==_&&ci(u,_,b[u]):b[u]=_}}else{const b=l?d:o;if(l){const v=r[o].uniformGroups[b]??=Object.create(null);u in v||(v[u]={glslType:_,arraySize:g})}if(b!==o)continue;c in i||(i[c]={});const y=i[c];y[u]&&y[u]!==f?ci(u,f,y[u]):y[u]=f}}}return{groups:s,bindGroups:r,structs:i}}function _y(e,t,s){if(!py(s))throw new Error(`[emitBindingsGlsl] Field "${t}" of uniform block "${e}" is "${s}", which std140 lays out differently from WGSL. A buffer-backed block takes scalars, vectors, mat2x2<f32>, matrices of vec3 or vec4 columns, and arrays of 16-byte elements.`);if(s==="mat2x2<f32>")return[`  vec2 ${os(t,0)};`,`  vec2 ${os(t,1)};`];const r=du(s);return[`  ${qs(t,typeof r=="object"?r:{glslType:r})};`]}function qs(e,t){return t.arraySize?`${t.glslType} ${e}[${t.arraySize}]`:`${t.glslType} ${e}`}function yy(e,t){const{groups:s,bindGroups:r}=e;for(const n in r){const{uniformBuffers:o}=r[n];for(const a in o){const c=o[a];if(Object.keys(t[c]??{}).length===0)throw new Error(`[emitBindingsGlsl] Binding "${a}" is "uniform<${c}>", but no bit declares fields for a "${c}" struct.`)}}const i=[];for(const n in t){const o=n.charAt(0).toLowerCase()+n.slice(1);if(r[o]?.uniformGroups[o])continue;const a=t[n];i.push(`struct ${n} {`);for(const[c,l]of Object.entries(a))i.push(`  ${my(l)} ${c};`);i.push("};")}for(const{name:n,ubo:o}of s){const a=r[n],c=a.uniformGroups[n];if(c&&o){i.push(`layout(std140) uniform ${n} {`);for(const l in c)i.push(`  ${qs(l,c[l])};`);i.push("};")}else if(c)for(const l in c)i.push(`uniform ${qs(l,c[l])};`);for(const l in a.resources)i.push(`uniform ${a.resources[l]} ${l};`);for(const l in a.uniformBuffers){const u=t[a.uniformBuffers[l]];i.push(`layout(std140) uniform ${l} {`);for(const h in u)i.push(..._y(l,h,u[h]));i.push(`} ${Yi(l)};`)}for(const l in a.uniformGroups){if(l===n)continue;const u=a.uniformGroups[l];for(const h in u)i.push(`uniform ${qs(h,u[h])};`)}}return i.join(`
`)}const fu={collectData(e){const t=e.data.glsl??={};t.bindingGroups===void 0&&(t.bindingGroups=gy(e.bits,e.template),e.data.structs=t.bindingGroups.structs)},injectCode(e){const t=e.data.glsl;return t.bindings??=yy(t.bindingGroups,e.data.structs),{header:t.bindings}}},xy="{{writeOutputs}}";function pu(e){return`frag${e[0].toUpperCase()}${e.slice(1)}`}function by(e,t){const s=["struct Outputs {"];for(const r in e)s.push(`  ${Pe[e[r]]} ${r};`);s.push("};","");for(let r=0;r<t.length;r++)e[t[r]]&&s.push(`layout(location = ${r}) out ${Pe[e[t[r]]]} ${pu(t[r])};`);return s.join(`
`)}const mu={collectData(e){e.templateString.includes(xy)&&(e.data.outputs=Sa(e.bits))},injectCode(e){const t=e.data.outputs;if(!t)return{};const s=e.outputLocations,r=[],i=[];for(const n in t)r.push(`${Pe[t[n]]}(0)`);for(let n=0;n<s.length;n++)t[s[n]]&&i.push(`${pu(s[n])} = outputs.${s[n]};`);return{header:by(t,s),declareOutputs:`Outputs outputs = Outputs(${r.join(", ")});`,writeOutputs:i.join(`
`)}}},gu={collectData(e){e.data.groupMap||(e.data.groupMap=qg(e.bits,e.template))}},_u={collectData(e){e.data.headers||(e.data.headers=e.bits.map(t=>t.gl?.header).filter(t=>!!(t&&/\S/.test(t))))},injectCode(e){return{header:e.data.headers.join(`
`)}}},vy=new Set(["position","frontFacing","sampleIndex","sampleMask"]);function Yo(e){return e==="i32"||e==="u32"||e.includes("<i32>")||e.includes("<u32>")}function Xo(e){const t=Pe[e];return t||(V(`[compileInterStageGlsl] Unknown inter-stage type: "${e}"`),"vec4")}function wy(e,t,s){V(`[compileInterStageGlsl] Inter-stage variable "${e}" redefined with different type: "${s}" → "${t}". Keeping original.`)}function Sy(e,t={}){const{useLocations:s=!0}=t,r=new Map;for(const a of e)if(a.interStage)for(const[c,l]of Object.entries(a.interStage))vy.has(c)||(r.has(c)?r.get(c)!==l&&wy(c,l,r.get(c)):r.set(c,l));const i=[];let n=0;for(const[a,c]of r){const l=Xo(c),u=Yo(c)?"flat ":"";s?i.push(`layout(location = ${n++}) ${u}out ${l} ${a};`):i.push(`${u}out ${l} ${a};`)}const o=[];n=0;for(const[a,c]of r){const l=Xo(c),u=Yo(c)?"flat ":"";s?o.push(`layout(location = ${n++}) ${u}in ${l} ${a};`):o.push(`${u}in ${l} ${a};`)}return{vertex:i.join(`
`),fragment:o.join(`
`)}}const yu={collectData(e){const t=e.data.glsl??={};t.interStage??=Sy(e.bits,{useLocations:e.glslOptions?.useLocations})},injectCode(e){const t=e.data.glsl.interStage;return{header:e.stage==="vertex"?t.vertex:t.fragment}}},xu={collectData(e){e.data.overrides=Cl(e.bits)},injectCode(e){const t=e.glslOptions?.overrides??{};return{header:r_(e.data.overrides,t)}}},ks="#version 300 es",Ty=`precision highp float;
precision highp int;
precision highp sampler2D;
precision highp usampler2D;
precision highp isampler2D;
precision highp sampler3D;
precision highp samplerCube;
precision highp sampler2DArray;
precision highp sampler2DShadow;
precision highp samplerCubeShadow;
precision highp sampler2DArrayShadow;`,bu={preCompile(e){const{templateString:t}=e;if(!t.includes(ks)){V(`[compileShader] ${e.stage==="vertex"?"Vertex":"Fragment"} template has no '${ks}' line - highp precision will not be declared.`);return}e.templateString=t.replace(ks,`${ks}
${Ty}`)}},Cy=/\{\{(.*?)\}\}/g;function Dy(e){const t=new Set;for(const s of Object.values(e))for(const r of s)if(r)for(const i of r.matchAll(Cy))t.add(i[1]);return t}function By(e,t,s){const r=Ki(e),i=Dy(t);for(const[n,o]of Object.entries(t))o.some(a=>a&&/\S/.test(a))&&!r.has(n)&&!i.has(n)&&V(`[compileShader] ${s==="vertex"?"Vertex":"Fragment"} generated code for slot {{${n}}} but template doesn't have it.`)}const vu={injectCode(e){if(!e.stage)return{};const t=bi(e.bits,"gl",e.stage),s={};for(const[i,n]of Object.entries(t))s[i]=n.join(`
`);const r={};for(const[i,n]of Object.entries(s))r[i]=[n];return By(e.templateString,r,e.stage),s}};function Iy(e,t){if(e.type==="mat2x2<f32>")return`mat2(uintBitsToFloat(${t}.xy), uintBitsToFloat(${t}.zw))`;const s=`${t}${e.swizzle}`;return e.scalar==="u32"?s:e.scalar==="i32"?`${e.type==="vec4<i32>"?"ivec4":"int"}(${s})`:`uintBitsToFloat(${s})`}function Xi(e){const t=[];t.push(`${e.struct} ${e.name}(uint index) {`),t.push(`  int base = ${e.base};`),t.push(`  ${e.struct} m;`);for(const[s,r]of Tl(e.fields,e.read)){t.push(`  uvec4 t${s} = ${e.load(`base + ${s}`)};`);for(const i of r)t.push(`  m.${i.name} = ${Iy(i,`t${s}`)};`)}return t.push("  return m;"),t.push("}"),t.join(`
`)}function My(e){const{layout:t,loaded:s,varyings:r}=e,i={},n=["Instance instance = getInstance(renderInstance.x);"],o=["Instance instance;"];for(const a of r){const c=t.struct[a],l=wl(a),u=c==="vec4<f32>"?`floatBitsToUint(instance.${a})`:c==="vec4<i32>"?`uvec4(instance.${a})`:`instance.${a}`,h=c==="vec4<f32>"?`uintBitsToFloat(${l})`:c==="vec4<i32>"?`ivec4(${l})`:l;i[l]="vec4<u32>",n.push(`${l} = ${u};`),o.push(`instance.${a} = ${h};`)}return{name:`instanceAccess:${t.key}`,interStage:i,bindings:{global:{uInstanceStoreTexture:"texture_2d<u32>"}},gl:{vertex:{header:Xi({name:"getInstance",struct:"Instance",fields:t.struct,read:s,base:`int(index) * ${t.stride/4}`,load:a=>`texelFetch(uInstanceStoreTexture, ${Pt(a)}, 0)`}),storeAccess:n.join(`
  `)},fragment:r.length?{storeAccess:o.join(`
  `)}:void 0}}}const wu={collectData(e){if(!Cr(e.bits))return;const t=Sl(e.bits,"gl",e.instanceLayout,e.template);e.bits=[...e.bits,My(t)]}};function Zo(e,t,s){t&&/\S/.test(t)&&!e.includes("{{header}}")&&V(`[compileShader] ${s==="vertex"?"Vertex":"Fragment"} template missing {{header}} slot - bindings, attributes, and inter-stage variables will not be injected.`)}function Ws(e){const{bits:t,template:s,extraPlugins:r,instanceLayout:i,outputLocations:n=me,...o}=e,a=Bl(t),c=[wu,bu,gu,xu,fu,yu,mu,uu,_u,vu],l=r?[...r,...c]:c,u={bits:a,template:s,templateString:s.gl.vertex,data:{},stage:"vertex",glslOptions:o,instanceLayout:i,outputLocations:n},h=wi(u,l);Zo(s.gl.vertex,u.data.headers.join(""),"vertex");const d={bits:a,template:s,templateString:s.gl.fragment,data:u.data,stage:"fragment",glslOptions:o,instanceLayout:i,outputLocations:n},f=wi(d,l);return Zo(s.gl.fragment,d.data.headers.join(""),"fragment"),{vertex:h,fragment:f,structs:d.data.structs??{},groupMap:d.data.groupMap,bits:d.bits}}function Py(e){return Xi({name:"getMaterial",struct:"Material",fields:e,base:"int(index)",load:t=>`texelFetch(uMaterialStorage, ${Pt(t)}, 0)`})}const Su={injectCode(e){const t=e.data.structs?.Material;return t?{textureGetters:Py(t),storeAccess:"Material material = getMaterial(vMaterialIndex);"}:{}}},li=Yi("material");function Ay(e){const t=["Material getMaterial() {","  Material m;"];for(const s in e){const r=e[s]==="mat2x2<f32>"?`mat2(${li}.${os(s,0)}, ${li}.${os(s,1)})`:`${li}.${s}`;t.push(`  m.${s} = ${r};`)}return t.push("  return m;","}"),t.join(`
`)}const Fy={injectCode(e){const t=e.data.structs?.Material;return t?{textureGetters:Ay(t),storeAccess:"Material material = getMaterial();"}:{}}},Qo={atlas:null,indexCount:void 0,firstIndex:void 0},zy=new Float32Array(24);var Tu=class{batchTransform=new jt({uBatchWorldMatrix:{value:new E,type:"mat4x4<f32>"}},{isStatic:!0,ubo:!1});build(e){const{renderables:t,list:s,globalBindGroup:r,passBit:i,bindsMaterial:n}=e,o=t.count,a=s.commandList;if(o===0)return 0;a.clear(),this._ensureCapacity(s,o);const c=t.indices,l=t.items,u=s.glData,h=u.indexStaging;let d=l[c[0]],f=d._passCache[i],p=f.shader,m=f.batchKey,_=d.geometry,g=ss(m,f.state),b=f.topology,y=d.material,v=_._geometryAtlasAllocation||Qo,x=v.atlas?v.atlas.geometry:_,w=v.firstIndex,T=v.indexCount,B=0,S=y;n&&a.captureMaterialTextures(y),h[0]=d._storeIndex;for(let C=1;C<o;C++){d=l[c[C]],f=d._passCache[i],h[C]=d._storeIndex;const D=d.material,I=f.batchKey!==m;if(!I&&(!n||D===y))continue;if(!I&&y._textureSetId===D._textureSetId){y=D;continue}this._recordCommand(a,s.drawData,r,n?S._getMergedBindGroup():void 0,p,g,x,w,T,B,C-B,b,m,n?S._textureSetId:0,n),B=C;const M=D!==y;y=D,I&&(m=f.batchKey,_=d.geometry,p=f.shader,g=ss(m,f.state),b=f.topology,v=_._geometryAtlasAllocation||Qo,x=v.atlas?v.atlas.geometry:_,w=v.firstIndex,T=v.indexCount),S=D,n&&M&&a.captureMaterialTextures(D)}return this._recordCommand(a,s.drawData,r,n?S._getMergedBindGroup():void 0,p,g,x,w,T,B,o-B,b,m,n?S._textureSetId:0,n),a.endBuild(),u.lastVisibilityDirtyId=-1,o}draw(e,t,s,r,i){const n=t.glData.indexTexture;if(!n)return;const o=r!==null&&s.cull!=="off";(o||t.glData.lastVisibilityDirtyId!==s._visibilityDirtyId)&&this._compact(t,s,o?r:null,n),this.batchTransform.uniforms.uBatchWorldMatrix=s.renderData.worldTransform,this.batchTransform.update();const a=e.gl,c=e.shader,l=e.geometry,u=e.state,h=t.commandList,d=h.count,f=t.drawData.drawCalls;for(let p=0;p<d;p++){const m=p*5;if(f[m+1]===0||f[m]===0)continue;const _=h.commands[p];_.shader.groups[0]=_.globalBindGroup,_.shader.groups[1]=i.bindGroup,_.batchBindGroup&&(_.shader.groups[2]=_.batchBindGroup),c.bind(_.shader),l.bind(_.geometry,c._activeProgram),_.state&&u.set(_.state);const g=c._getProgramData(c._activeProgram).uniformData.uInstanceBase?.location;g!==void 0&&a.uniform1i(g,f[m+4]),l.draw(_.topology,f[m],f[m+2],f[m+1])}}_compact(e,t,s,r){const i=e.glData,n=e.commandList.count,o=e.drawData.drawCalls,a=e.view.count,c=t.storeBuffer.visible;s!==null&&t._ensureSpheres();const l=t.storeBuffer.boundingSpheres,u=i.indexStaging,h=r.data,d=s!==null?fs(s.planesData,t.storeBuffer.data):null,f=d??zy;let p=a,m=0;for(let _=0;_<n;_++){const g=o[_*5+4],b=_+1<n?o[(_+1)*5+4]:a;let y=g;for(let v=g;v<b;v++){const x=u[v];if(c[x]!==0){if(d!==null){const w=x*4,T=l[w+3];if(T>=0){const B=l[w],S=l[w+1],C=l[w+2];if(f[0]*B+f[1]*S+f[2]*C+f[3]<-T||f[4]*B+f[5]*S+f[6]*C+f[7]<-T||f[8]*B+f[9]*S+f[10]*C+f[11]<-T||f[12]*B+f[13]*S+f[14]*C+f[15]<-T||f[16]*B+f[17]*S+f[18]*C+f[19]<-T||f[20]*B+f[21]*S+f[22]*C+f[23]<-T)continue}}h[y]!==x&&(h[y]=x,y<p&&(p=y),m=y+1),y++}}o[_*5+1]=y-g}r.upload(p,m),e.glData.lastVisibilityDirtyId=t._visibilityDirtyId}_ensureCapacity(e,t){const s=e.glData,r=s.indexTexture??=new im(Math.max(256,t));r.ensureCapacity(t),(!s.indexStaging||s.indexStaging.length<r.data.length)&&(s.indexStaging=new Uint32Array(r.data.length))}_recordCommand(e,t,s,r,i,n,o,a,c,l,u,h,d,f,p){const m=e.next();m.geometry=o,m.shader=i,m.globalBindGroup=s,m.batchBindGroup=r,m.state=n,m.topology=h,m.batchKey=d,m.textureSetId=f,m.merged=p,e.captureGeometry(o);const _=(e.count-1)*5,g=t.ensureCapacity(e.count);g[_]=c??(o.indexCount||o.indexBuffer.data.length),g[_+1]=u,g[_+2]=a??0,g[_+3]=0,g[_+4]=l}};const Cu=256,Du=8,Bu=32,Iu=256*Bu*Du*Cu,ky={"point-list":0,"line-list":1,"line-strip":2,"triangle-list":3,"triangle-strip":4},Jo=new Map;let Ry=0;function Ly(e){let t=Jo.get(e);return t===void 0&&(t=Ry++,Jo.set(e,t)),t}function Mu(e,t,s){const r=((t.data*Bu+t._blendModeId)*Du+ky[s])*Cu+Ly(t.polygonOffset);return e*Iu+r}function Ey(e,t,s){const r=[`vec4 ${e}Direct(vec2 uv) {`,`  return textureLod(uMaterialTexture${t}, uv, 0.0);`,"}"];return s&&r.push(`vec4 ${e}(vec2 uv) {`,`  return texture(uMaterialTexture${t}, uv);`,"}"),r}function Pu(e){return{collectData(t){t.bits.some(s=>s.name.startsWith("materialBindings:"))||t.bits.unshift(al(t.bits,e))},injectCode(t){let s=0;const r=[],i=t.stage==="fragment";for(const n of t.bits)if(n.textures)for(const o of n.textures){const a=`sample${o[0].toUpperCase()}${o.slice(1)}`;r.push(...Ey(a,s,i)),s++}return{textureGetters:r.join(`
`)}}}}const Vy=new ee({}),Gy={merged:[vi,Su,Pu("merged")]},Oy=`#version 300 es

{{header}}
{{textureGetters}}

void main() {
  mat4 modelMatrix;

  vec4 position;
  vec3 normal = vec3(0.0, 0.0, 1.0);
  vec3 tangent = vec3(0.0);
  vec2 uv = vec2(0.0);

  {{input}}

  {{storeAccess}}

  {{beforeTransform}}

  vec4 worldPosition = modelMatrix * position;
  mat3 modelMatrix3 = mat3(modelMatrix);

  vec3 normalScale = 1.0 / vec3(
    dot(modelMatrix3[0], modelMatrix3[0]),
    dot(modelMatrix3[1], modelMatrix3[1]),
    dot(modelMatrix3[2], modelMatrix3[2])
  );
  vec3 worldNormal = modelMatrix3 * (normal * normalScale);
  gl_Position = uViewProjectionMatrix * worldPosition;

  {{afterTransform}}

  {{end}}

  vPosition = worldPosition.xyz;
  vNormal   = worldNormal;
  vUV       = uv;
}`,Ny=`#version 300 es

{{header}}

{{textureGetters}}

void main() {
  {{declareOutputs}}
  vec3 normal = normalize(vNormal);
  vec3 albedo = vec3(1.0);
  vec3 finalColor;
  float alpha = 1.0;

  {{storeAccess}}

  {{material}}

  finalColor = albedo;

  {{lighting}}

  finalColor *= inputExposure(uExposure, uDisplayExposure);

  {{end}}

  outputs.color = vec4(finalColor * alpha, alpha);

  {{writeOutputs}}
}`,$y={name:"layout",overrideDefs:{HAS_UVS:{type:"u32",required:!0}},outputs:{color:"vec4<f32>"},interStage:{vNormal:"vec3<f32>",vUV:"vec2<f32>",vPosition:"vec3<f32>",vMaterialIndex:"u32"}},Uy={bindGroups:[{name:"global",ubo:!0},"camera","batch"],gl:{vertex:Oy,fragment:Ny}};var Au=class{static extension={type:[nt.WebGLSystem],name:"material3d"};batcher=new Tu;_destroyed=!1;_renderer;_shaderCache=new Map;constructor(e){this._renderer=e}computeBatchKey(e,t){const s=e._passCache[t];return Mu(s.shader.uid,s.state,s.topology)}compilePassShader(e,t){const s=Ws({bits:[Ye,ve,...e],template:t,useLocations:!1});return tr(s.bits,t),Jt.from({gl:s,groups:{},groupMap:s.groupMap})}compileIsolatedShader(e,t,s){const r=Ws({bits:e,template:t,useLocations:!1});return Jt.from({gl:r,groups:s,groupMap:r.groupMap})}compileShader(e,t,s,r,i=!1,n={useLocations:!1},o="direct"){const a=[];let c="";(e.includeGlobal??!0)&&(a.push(Ye),c+=`${Ye.name}|`),(e.includeCamera??!0)&&(a.push(ve),c+=`${ve.name}|`),a.push(...e.bitsGl),c+=e.keyGl;const l=pl(t.geometry.attributes.aPosition.format);Te(l),a.push(l),c+=`|${l.name}`,t._morph&&(t.geometry.hasMorphNormals?(a.push(cu),c+="|morphN"):(a.push(au),c+="|morph")),t.skeleton&&(Te(js),a.push(js),c+=`|${js.name}`),s.instanceStoreBuffer&&Cr(a)&&(c+=`|inst:${s.instanceStoreBuffer.layout.key}`),c+=`|${o}`;let u=this._shaderCache.get(c);if(!u){const h=Ws({bits:a,template:e.template,extraPlugins:r,instanceLayout:s.instanceStoreBuffer?.layout,...n,overrides:e.overrides,outputLocations:e.outputLocations});tr(h.bits,e.template),u={shader:Jt.from({gl:h,groups:{},overrides:e.overrides,groupMap:h.groupMap}),layout:Na(h.bits)},this._shaderCache.set(c,u)}return i&&(Ua(u.layout,t.material),$a(u.layout,t.material)),u.shader}ensureMaterial(e,t,s){const r=e.material;this._renderer.renderPipes.view3d.materialStoreBuffer.register(r);const i=this.compileShader(this._materialDescriptor(e,s),e,t,Gy.merged,!0,{useLocations:!1},"merged"),n=r._passBit&$.MATERIAL_PASS_MASK,o=r._passes[n],a=o&&o.state||r.state,c=o&&o.topology||r.topology||e.geometry.topology,l=e._passCache[n];return l?(l.shader=i,l.state=a,l.topology=c,l.lastGeometryUid=-1):e._passCache[n]=new Ai(i,a,c),i}_materialDescriptor(e,t){const s=e.geometry,r=e.material,i=r.fog?t._fogBit:null,n=t._toneMappingBit,o=!!s.attributes.aColor&&r.vertexColors,a=rl(r,n,!!i||o),c=r.getPrimaryDescriptor(t),l=[Ye,$y,Lg,a];s.attributes.aNormal&&l.push(hl),s.attributes.aUV&&l.push(bl(s.attributes.aUV.format)),r.doubleSided&&l.push(il),r.flatShading&&l.push(nl);const u=r.textures.normal;u&&u!==yr&&s.attributes.aUV&&l.push(s.attributes.aTangent?xl:dl),o&&l.push(vl);const h=e.material.lit;e.billboardMode!=="none"&&l.push(ul(e.billboardMode,h));const d=!!s.attributes.aTangent;for(let m=0;m<c.bitsGl.length;m++){const _=c.bitsGl[m];l.push(d?ac(_):_)}r.alphaMode==="opaque"&&l.push(sl),i&&l.push(i),a!==ji&&n&&l.push(r._skipsToneCurve?Sr:n),h&&l.push(e.receiveShadow&&t._hasShadows?lu[t.shadowFilter]:fl,vr(n!==null));const f=t.passByBit[r._passBit&$.MATERIAL_PASS_MASK],p=Pa(l,f,!!c.template);return Vy.update({bitsGl:l,template:c.template??Uy,overrides:{HAS_UVS:s.attributes.aUV?1:0,...c.overrides},outputLocations:p,includeGlobal:!1})}destroy(){if(!this._destroyed){this._destroyed=!0;for(const{shader:e}of this._shaderCache.values())e.destroy();this._shaderCache=null}}};function Fu(e){const{pipe:t,bit:s,bindsMaterial:r,session:i,alwaysRebuild:n,sortBatch:o}=e,{view3d:a}=i,c=t.renderer.material3d.batcher,l=e.camera??a.camera,u=ot(l),h=l.cullFrustum;u.setViewport(i.activeViewport);for(const d of a._meshBatches){if(!d.renderData._worldVisible)continue;const f=d.drawLists[s];if(!f)continue;const p=f.view;if(p.count===0)continue;let m;o?(o(p,d,u.position),m=f.isDrawStale()||f.isOrderStale()):m=f.nextBuild(a._updateTick,n),m&&(f.claimDrawBuilt(),c.build({renderables:p,list:f,globalBindGroup:i.globalBindGroup,passBit:s,bindsMaterial:r})),i.globalBindGroup.setResource(d.storeBuffer.texture.source,"uMeshStoreTexture"),f.glData.indexTexture&&i.globalBindGroup.setResource(f.glData.indexTexture.texture.source,"uRenderInstanceTexture"),i.globalBindGroup.setResource(d.instanceStoreBuffer?.texture.source??Xt.source,"uInstanceStoreTexture"),c.draw(t.renderer,f,d,h,u)}}const zu={name:"shadowGlobalGl",bindings:{global:{uBonePitTexture:"texture_2d<f32>",uMorphTexture:"texture_2d<f32>",uGeometryTexture:"texture_2d<u32>"}}},Hy={bindGroups:[{name:"global",ubo:!0},"camera"],gl:{vertex:`#version 300 es

{{header}}

void main() {
  mat4 modelMatrix;

  vec4 position;
  vec3 normal = vec3(0.0);
  vec3 tangent = vec3(0.0);

  {{input}}

  vec4 worldPosition = modelMatrix * position;
  gl_Position = uViewProjectionMatrix * worldPosition;

  {{end}}
}`,fragment:`#version 300 es
out vec4 fragColor;

{{header}}

void main() {
    fragColor = vec4(0.);
}`}};var ku=class extends el{constructor(e){const t=Ei();t.depthTest=!0,t.culling=!0,t.clockwiseFrontFace=!0,t.blend=!1,super({renderer:e.renderer,name:"shadow",description:"Renders shadow-casting scene geometry into each light shadow map.",bit:$.SHADOW,shadowMapHandle:e.shadowMapHandle,descriptor:{shaderDescriptor:{bitsGl:[zu,Rg],template:Hy,includeGlobal:!1},state:t}})}_applyZRangeFix=!1;render(e){const{view3d:t,lights:s}=e;if(!s.find(o=>o.canCastShadow))return;this._bindShadowSource(t,this.renderTarget.depthStencilTexture),this.pipe.renderer.colorMask.setMask(0);const r=this.pipe.renderer.material3d.batcher,i=e.globalBindGroup,n=s.some(o=>o.castShadow&&o._gpuShadowData&&o._shadowDataIndex>=0);for(const o of t._meshBatches){if(!o.renderData._worldVisible)continue;const a=o.drawLists[this.bit];if(!a)continue;const c=a.view;c.count===0||!n||a.nextBuild(t._updateTick)&&(a.claimDrawBuilt(),r.build({renderables:c,list:a,globalBindGroup:i,passBit:this.bit,bindsMaterial:!1}))}for(const o of s){if(!yi(o))continue;const a=Be(o);for(let c=0;c<a;c++){const l=this._cascadeSlot(o,c);if(!l.needsRender)continue;const u=l.cameraData.frustum;this.pipe.renderer.renderTarget.bind({target:this.renderTarget,clear:!0,layer:o._shadowDataIndex+c});for(const h of t._meshBatches){if(!h.renderData._worldVisible)continue;const d=h.drawLists[this.bit];!d||d.view.count===0||(i.setResource(h.storeBuffer.texture.source,"uMeshStoreTexture"),d.glData.indexTexture&&i.setResource(d.glData.indexTexture.texture.source,"uRenderInstanceTexture"),r.draw(this.pipe.renderer,d,h,u,l.cameraData))}}this._completeShadowUpdate(o)}this.pipe.renderer.colorMask.setMask(15),e.activeTarget=null}};const jy=13421772,ta=new vt;var Ru=class{static extension={type:[nt.WebGLPipes],name:"view3d"};renderer;_brdfLutTexture;_destroyed=!1;_colorOutputDraw=null;_iblEnvironmentMap=new Map;_onEnvironmentDestroy=e=>{this._iblEnvironmentMap.get(e)?.source.unload(),this._iblEnvironmentMap.delete(e)};_viewport=new lt;_sortForwardByDistance=(e,t,s)=>{t.isUserBatch?Sg(e,s,t.storeBuffer.data,t.renderData.worldTransform):wg(e,s)};_forwardOptions={pipe:this,bit:0,bindsMaterial:!1,camera:null,session:null,alwaysRebuild:!0,sortBatch:void 0};materialStoreBuffer;_morphStoreBuffer=new Ac;geometryDataStoreBuffer=new Mc;atlasPool=Gl.from({rebaseIndices:!0});_managedViews;constructor(e){this.renderer=e,this._managedViews=new Il(e),e.runners.contextChange.add(this)}contextChange(){this.materialStoreBuffer??=new Pc({alignment:this.renderer.limits.minUniformBufferOffsetAlignment,rendererType:this.renderer.type})}createShadowPass(e){return new ku({renderer:this.renderer,shadowMapHandle:e.shadowMapHandle})}prepareForward(e,t){}renderForward(e,t){const s=this._forwardOptions;s.bit=e.bit,s.bindsMaterial=e.bindsMaterial,s.camera=e.camera,s.session=t,s.alwaysRebuild=!xi(e),s.sortBatch=e.sort==="distance"?this._sortForwardByDistance:void 0,Fu(s),s.camera=null,s.session=null}renderGeometry(e,t,s){this.renderer.encoder.draw({geometry:e,shader:t,state:s})}setViewport(e){this.renderer.gl.viewport(e.x,e.y,e.width,e.height)}_depthClearState=null;clearDepth(e){if(!this._depthClearState){const r=new zt;r.depthMask=!0,r.depthTest=!1,r.culling=!1,r.blend=!1,this._depthClearState=r}const t=this.renderer.gl,s=e.activeViewport;this.renderer.state.set(this._depthClearState),t.enable(t.SCISSOR_TEST),t.scissor(s.x,s.y,s.width,s.height),this.renderer.renderTarget.clear(this.renderer.renderTarget.renderTarget,dt.DEPTH),t.disable(t.SCISSOR_TEST)}copyColor(e,t,s){const{target:r,viewport:i}=e;if(!r.colorTexture)return;const n=t.frame,o=t.source.resolution;this.renderer.renderTarget.copyToTexture(r,t,{x:i.x,y:i.y},{width:i.width,height:i.height},{x:Math.round(n.x*o),y:Math.round(n.y*o)}),s.activeTarget=null}outputColor(e,t,s,r){const{target:i}=e;if(!i.colorTexture)return;const n=this.renderer.renderTarget;(this._colorOutputDraw??=new tl(this.renderer)).draw(this,e,t,r),n.finishRenderPass(),s.activeTarget=null}generateMips(e,t){const s=t.view3d._graph.getTexture(e,t).source;this.renderer.renderTarget.bind({target:t.defaultTarget,clear:dt.NONE}),t.activeTarget=null,s.updateMipmaps()}resolveColor(){this.renderer.renderTarget.finishRenderPass()}copyDepth(e,t,s){const{target:r,viewport:i}=e;r.depthStencilTexture&&(this.renderer.renderTarget.copyDepthTexture(r,t,{x:i.x,y:i.y},{width:i.width,height:i.height},{x:0,y:0}),s.activeTarget=null)}validateRenderable(){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(){}execute(e){if(!e.isRenderable)return;const t=cr(e,this.renderer),s=this.renderer.renderTarget.renderTarget;e._ensureInitialized(this.renderer,t,s.colorTexture.source.resolution),this._managedViews.track(e);const r=e.environment;r&&(this._brdfLutTexture||=Hc({renderer:this.renderer}),t.globalBindGroup.setResource(this._brdfLutTexture.source,"uBrdfLutTexture"));const i=this._prefilteredEnvironment(r);t.globalBindGroup.setResource(i,"uEnvironmentTexture"),t.globalUniformGroup.uniforms.uEnvironmentMaxMipLevel=i.mipLevelCount-1;const n=e.lights;if(e._meshSlots.count===0&&e._meshBatches.length===1)return;const o={view3d:e,lights:n,defaultTarget:s,defaultFrontFaceInverted:!1,activeTarget:null,needsDepthClear:!0,viewport:this._viewport,activeViewport:this._viewport,globalBindGroup:t.globalBindGroup,globalUniformGroup:t.globalUniformGroup,renderer:this.renderer};ru(e,this,o)&&(t.globalBindGroup.setResource(e._bonePit.texture.source,"uBonePitTexture"),t.globalBindGroup.setResource(this._morphStoreBuffer.texture.source,"uMorphTexture"),t.globalBindGroup.setResource(this.geometryDataStoreBuffer.texture.source,"uGeometryTexture"),this.atlasPool.update(),this.materialStoreBuffer.update(),this.geometryDataStoreBuffer.update(),Ec(this.atlasPool,this.materialStoreBuffer,t,this._morphStoreBuffer)&&e._invalidateDrawCaches(),t.globalBindGroup.setResource(this.materialStoreBuffer.texture.source,"uMaterialStorage"),this.prepareView(o),e._graph.run(o))}destroy(){if(!this._destroyed){this._destroyed=!0,this._managedViews.destroy(),this._colorOutputDraw?.destroy(),this._colorOutputDraw=null,this._brdfLutTexture?.destroy(!0),this._brdfLutTexture=void 0;for(const[e,t]of this._iblEnvironmentMap)e.off("destroy",this._onEnvironmentDestroy),t.destroy(!0);this._iblEnvironmentMap=null,this.renderer.runners.contextChange.remove(this),this.materialStoreBuffer.destroy(),this.materialStoreBuffer=null,this._morphStoreBuffer.destroy(),this.geometryDataStoreBuffer.destroy(),this._depthClearState=null}}_prefilteredEnvironment(e){if(!(e instanceof bt)||e.source.destroyed)return Ot.source;let t=this._iblEnvironmentMap.get(e.source);return t||(t=bc({renderer:this.renderer,sourceTexture:e}),this._iblEnvironmentMap.set(e.source,t),e.source.once("destroy",this._onEnvironmentDestroy)),t.source}prepareView(e){const{view3d:t,lights:s}=e;this.renderer.lighting3d.update(t,s),this._updateGlobalUniforms(t)}_updateGlobalUniforms(e){const{fog:t}=e,s=cr(e,this.renderer),r=s.globalUniformGroup.uniforms;if(r.uTime=performance.now()/1e3,r.uExposure=e.exposure,r.uDisplayExposure=Math.pow(e.exposure,1/2.2),t){ta.setValue(t.color??jy),At(r.uFogColor,0,ta,e.exposure);const i=r.uFogParams;i[0]=t.near||0,i[1]=t.far||99999999,i[2]=t.density||0}s.globalUniformGroup.update()}};ke.add(nu,Au,Ru);const qy=Object.freeze(Object.defineProperty({__proto__:null,GL_STATE_KEY_RANGE:Iu,LightingSystemGl:nu,MaterialSystemGl:Au,Mesh3DBatcherGl:Tu,ShadowRenderPassGl:ku,View3DPipeGl:Ru,WGSL_TO_GLSL_BINDING_TYPE:lr,WGSL_TO_GLSL_TYPE:Pe,compileGlslSource:Ws,createTexturesPluginGl:Pu,generateGlslStructAccessor:Xi,getGlobalGlData:cr,globalBitGl:Ye,glslAttributesPlugin:uu,glslBindingsPlugin:fu,glslFragmentOutputsPlugin:mu,glslGroupMapPlugin:gu,glslHeadersPlugin:_u,glslInterStagePlugin:yu,glslOverridesPlugin:xu,glslPrecisionPlugin:bu,glslStageSlotsPlugin:vu,instanceAccessPluginGl:wu,mat2ColumnMember:os,materialTextureAccessPluginGl:Su,materialUniformAccessPluginGl:Fy,morphTargetBitGl:au,morphTargetNormalBitGl:cu,packGlBatchKey:Mu,renderForwardBatchesGl:Fu,shadowBitsGl:lu,shadowGlobalBitGl:zu,skinningBitGl:js,uniformBlockInstanceName:Yi},Symbol.toStringTag,{value:"Module"})),Lu=`
struct DrawArgs {
  indexCount: u32,
  instanceCount: atomic<u32>,
  firstIndex: u32,
  baseVertex: u32,
  firstInstance: u32,
};
`,Wy=`
${Lu}
@group(0) @binding(0) var<storage, read_write> drawCalls: array<DrawArgs>;

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let k = gid.x;
  if (k >= arrayLength(&drawCalls)) { return; }
  atomicStore(&drawCalls[k].instanceCount, 0u);
}
`,Ky=`
${Lu}
struct Frustum { planes: array<vec4<f32>, 6> };

@group(0) @binding(0) var<storage, read>       srcInstances: array<u32>;
@group(0) @binding(1) var<storage, read_write> dstInstances: array<u32>;
@group(0) @binding(2) var<storage, read_write> drawCalls:    array<DrawArgs>;
@group(0) @binding(3) var<storage, read>       store:        array<u32>;
@group(0) @binding(4) var<storage, read>       geomBounds:   array<vec4<f32>>;
@group(0) @binding(5) var<uniform>             frustum:      Frustum;

const STRIDE: u32 = 24u;
const GEOM_LANE: u32 = 18u;
const VIS_LANE: u32 = 19u;
const NO_BOUNDS: u32 = 0xffffffffu;

fn loadMatrix(base: u32) -> mat4x4<f32> {
  return mat4x4<f32>(
    bitcast<f32>(store[base + 0u]),  bitcast<f32>(store[base + 1u]),  bitcast<f32>(store[base + 2u]),  bitcast<f32>(store[base + 3u]),
    bitcast<f32>(store[base + 4u]),  bitcast<f32>(store[base + 5u]),  bitcast<f32>(store[base + 6u]),  bitcast<f32>(store[base + 7u]),
    bitcast<f32>(store[base + 8u]),  bitcast<f32>(store[base + 9u]),  bitcast<f32>(store[base + 10u]), bitcast<f32>(store[base + 11u]),
    bitcast<f32>(store[base + 12u]), bitcast<f32>(store[base + 13u]), bitcast<f32>(store[base + 14u]), bitcast<f32>(store[base + 15u]),
  );
}

@compute @workgroup_size(64)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
  let i = gid.x;
  let instanceCount = arrayLength(&srcInstances);
  if (i >= instanceCount) { return; }

  let id = srcInstances[i];
  if (store[id * STRIDE + VIS_LANE] == 0u) { return; }

  var lo = 0u;
  var hi = arrayLength(&drawCalls) - 1u;
  while (lo < hi) {
    let mid = (lo + hi + 1u) >> 1u;
    if (drawCalls[mid].firstInstance <= i) { lo = mid; } else { hi = mid - 1u; }
  }

  let boundsSlot = store[id * STRIDE + GEOM_LANE];
  if (boundsSlot != NO_BOUNDS) {
    let sphere = geomBounds[boundsSlot * 2u];
    if (sphere.w >= 0.0) {
      let local = loadMatrix(id * STRIDE);
      let center = local * vec4<f32>(sphere.xyz, 1.0);
      let sx = dot(local[0].xyz, local[0].xyz);
      let sy = dot(local[1].xyz, local[1].xyz);
      let sz = dot(local[2].xyz, local[2].xyz);
      let radius = sphere.w * sqrt(max(sx, max(sy, sz)));
      for (var p = 0u; p < 6u; p = p + 1u) {
        let plane = frustum.planes[p];
        if (dot(plane.xyz, center.xyz) + plane.w < -radius) { return; }
      }
    }
  }

  let slot = atomicAdd(&drawCalls[lo].instanceCount, 1u);
  dstInstances[drawCalls[lo].firstInstance + slot] = id;
}
`;var Eu=class{static extension={type:[nt.WebGPUSystem],name:"compute3d"};_renderer;_zeroPipeline=null;_compactPipeline=null;_zeroBinds=new WeakMap;_compactBinds=new WeakMap;_jobs=[];_jobCount=0;_destroyed=!1;constructor(e){this._renderer=e}renderStart(){this._jobCount=0}dispatch(e,t,s,r,i,n,o,a){if(o===0||a===0)return;let c=this._jobs[this._jobCount];if(!c){const l=new Float32Array(24);c=this._jobs[this._jobCount]={drawCalls:null,src:null,dst:null,store:null,bounds:null,params:new ct({data:l,usage:G.UNIFORM|G.COPY_DST,label:"mesh3d_cull_frustum",shrinkToFit:!1}),paramsF32:l,commandCount:0,instanceCount:0}}c.drawCalls=e,c.src=t,c.dst=s,c.store=r,c.bounds=i,c.paramsF32.set(n),c.params.update(),c.commandCount=o,c.instanceCount=a,this._jobCount++}renderEnd(){const e=this._jobCount;if(this._jobCount=0,e===0)return;const t=this._renderer.gpu.device,s=this._renderer.buffer,r=this._zeroPipeline||this._buildPipeline(t,Wy,"_zeroPipeline"),i=this._compactPipeline||this._buildPipeline(t,Ky,"_compactPipeline"),n=t.createCommandEncoder(),o=this._jobs,a=n.beginComputePass();a.setPipeline(r);for(let l=0;l<e;l++){const u=o[l],h=s.getGPUBuffer(u.drawCalls);a.setBindGroup(0,this._zeroBindGroup(t,r,h,u.commandCount)),a.dispatchWorkgroups(Math.ceil(u.commandCount/64))}a.end();const c=n.beginComputePass();c.setPipeline(i);for(let l=0;l<e;l++){const u=o[l];c.setBindGroup(0,this._compactBindGroup(t,i,u,s)),c.dispatchWorkgroups(Math.ceil(u.instanceCount/64))}c.end(),t.queue.submit([n.finish()]);for(let l=0;l<e;l++)o[l].drawCalls=null,o[l].src=null,o[l].dst=null,o[l].store=null,o[l].bounds=null}_zeroBindGroup(e,t,s,r){const i=this._zeroBinds.get(s);if(i&&i.commandCount===r)return i.bindGroup;const n=e.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:s,offset:0,size:r*20}}]});return this._zeroBinds.set(s,{bindGroup:n,commandCount:r}),n}_compactBindGroup(e,t,s,r){const i=r.getGPUBuffer(s.src),n=r.getGPUBuffer(s.dst),o=r.getGPUBuffer(s.drawCalls),a=r.getGPUBuffer(s.store),c=r.getGPUBuffer(s.bounds),l=r.getGPUBuffer(s.params),u=this._compactBinds.get(o);if(u&&u.src===i&&u.dst===n&&u.drawCalls===o&&u.store===a&&u.bounds===c&&u.params===l&&u.commandCount===s.commandCount&&u.instanceCount===s.instanceCount)return u.bindGroup;const h=e.createBindGroup({layout:t.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:i,offset:0,size:s.instanceCount*4}},{binding:1,resource:{buffer:n,offset:0,size:s.instanceCount*4}},{binding:2,resource:{buffer:o,offset:0,size:s.commandCount*20}},{binding:3,resource:{buffer:a}},{binding:4,resource:{buffer:c}},{binding:5,resource:{buffer:l}}]});return this._compactBinds.set(o,{bindGroup:h,src:i,dst:n,drawCalls:o,store:a,bounds:c,params:l,commandCount:s.commandCount,instanceCount:s.instanceCount}),h}_buildPipeline(e,t,s){const r=e.createShaderModule({code:t}),i=e.createComputePipeline({layout:"auto",compute:{module:r,entryPoint:"main"}});return this[s]=i,i}destroy(){if(!this._destroyed){this._destroyed=!0;for(const e of this._jobs)e.params?.destroy();this._jobs=null,this._zeroPipeline=null,this._compactPipeline=null,this._zeroBinds=new WeakMap,this._compactBinds=new WeakMap,this._jobCount=0}}};const Xe={name:"global",structs:{Renderable:ml,RenderableInstance:gl,BoneMatrix:Wi,GeometryData:qi,Light:Ng},bindings:{global:{uGlobalLightParams:"vec4<f32>",uTime:"f32",uFogColor:"vec3<f32>",uDisplayExposure:"f32",uFogParams:"vec3<f32>",uExposure:"f32",uHemisphereSky:"vec3<f32>",uHemisphereGround:"vec3<f32>",uHemisphereUp:"vec3<f32>",uLightData:"array<vec4<f32>, 128>",uShadowData:`array<vec4<f32>, ${Ft*6}>`,uSampler:"sampler",uEnvironmentTexture:"texture_cube<f32>",uBrdfLutTexture:"texture_2d<f32>",uBrdfLutSampler:"sampler",uShadowMap:"texture_depth_2d_array",uShadowSampler:"sampler_comparison",uOpaqueDepthTexture:"texture_depth_2d",uOpaqueColorTexture:"texture_2d<f32>",uMaterialStorage:"texture_2d<u32>",uRenderableStorage:{type:"storage<Renderable>",visibility:"vertex"},uRenderableInstanceStorage:{type:"storage<RenderableInstance>",visibility:"vertex"},uBonePitStorage:{type:"storage<BoneMatrix>",visibility:"vertex"},uMorphStorage:{type:"storage<f32>",visibility:"vertex"},uGeometryStorage:{type:"storage<GeometryData>",visibility:"vertex"}}},gpu:{header:`
const LIGHT_DIRECTIONAL: f32 = 0.0;
const LIGHT_POINT: f32 = 1.0;
const LIGHT_SPOT: f32 = 2.0;
`}};function ur(e,t){let s=e._gpuData[t.uid];if(!s){const r=Uc(e._lightDataList.data,e._shadowDataList.data);t.ubo.ensureUniformGroup(r),r.buffer.autoGarbageCollect=!1;const i=new Je;i.addressMode="repeat";const n=new Je;n.compare="less";const o=new Je;o.addressMode="clamp-to-edge";const a=new gt({global:r,uSampler:i,uEnvironmentTexture:Ot.source,uBrdfLutTexture:L.EMPTY.source,uBrdfLutSampler:o,uShadowMap:zi.source,uShadowSampler:n,uOpaqueDepthTexture:ki,uOpaqueColorTexture:L.EMPTY.source,uMaterialStorage:Xt.source,uRenderableStorage:de,uRenderableInstanceStorage:de,uBonePitStorage:e._bonePit.bufferResource,uMorphStorage:de,uGeometryStorage:de,uInstanceStorage:de});s=new iu(r,a,{opaqueColor:{group:a,slot:"uOpaqueColorTexture"},opaqueDepth:{group:a,slot:"uOpaqueDepthTexture"},shadowMap:{group:a,slot:"uShadowMap"}}),e._gpuData[t.uid]=s}return s}var Vu=class{static extension={type:[nt.WebGPUSystem],name:"lighting3d"};_renderer;constructor(e){this._renderer=e}update(e,t){const s=e.passByBit[$.SHADOW];s?.beginFrame(e);const{_lightDataList:r,environment:i}=e;r.reset();const n=ur(e,this._renderer).globalUniformGroup.uniforms,o=n.uGlobalLightParams;o[0]=0,o[1]=0,o[2]=0,i!==null&&!(i instanceof bt)&&Ui(i,n.uHemisphereSky,n.uHemisphereGround,n.uHemisphereUp);for(let a=0;a<t.length;a++){const c=t[a];if(c._worldVisible){if(c.type==="ambient"){const l=c,u=l.color,h=l.intensity;Ha(o,0,u,h);continue}r.count>=32||(s?.prepareShadow(c,e),r.add(c))}}o[3]=r.count}};const Yy=`
  var<private> pos: array<vec2<f32>, 3> = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(-1.0, 3.0), vec2<f32>(3.0, -1.0));

  struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) texCoord: vec2<f32>,
  };

  @vertex
  fn vertexMain(@builtin(vertex_index) vertexIndex: u32) -> VertexOutput {
    var output: VertexOutput;
    output.texCoord = pos[vertexIndex] * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);
    output.position = vec4<f32>(pos[vertexIndex], 0.0, 1.0);
    return output;
  }

  @group(0) @binding(0) var imgSampler: sampler;
  @group(0) @binding(1) var img: texture_2d<f32>;

  @fragment
  fn fragmentMain(@location(0) texCoord: vec2<f32>) -> @location(0) vec4<f32> {
    return textureSample(img, imgSampler, texCoord);
  }
`;var Gu=class{static extension={type:[nt.WebGPUSystem],name:"mipChain3d"};_renderer;_shaderModule=null;_sampler=null;_pipelines=Object.create(null);_cache=Object.create(null);constructor(e){this._renderer=e}generate(e){if(e.mipLevelCount<=1)return;const t=this._renderer.gpu.device,s=this._renderer.encoder.commandEncoder,r=this._pipeline(t,e.format),{bindGroups:i,dstViews:n}=this._cache[e.uid]||this._buildCacheEntry(e);for(let o=0;o<n.length;o++){const a=s.beginRenderPass({colorAttachments:[{view:n[o],loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:0}}]});a.setPipeline(r),a.setBindGroup(0,i[o]),a.draw(3),a.end()}}_buildCacheEntry(e){const t=this._renderer.gpu.device,s=this._pipeline(t,e.format),r=this._renderer.texture.getGpuSource(e),i=[],n=[],o=s.getBindGroupLayout(0);for(let c=1;c<e.mipLevelCount;c++)n.push(r.createView({baseMipLevel:c,mipLevelCount:1,dimension:"2d"})),i.push(t.createBindGroup({layout:o,entries:[{binding:0,resource:this._sampler},{binding:1,resource:r.createView({baseMipLevel:c-1,mipLevelCount:1,dimension:"2d"})}]}));const a={bindGroups:i,dstViews:n};return this._cache[e.uid]=a,a}_pipeline(e,t){const s=this._pipelines[t];if(s)return s;this._shaderModule||=e.createShaderModule({code:Yy}),this._sampler||=e.createSampler({minFilter:"linear"});const r=e.createRenderPipeline({layout:"auto",vertex:{module:this._shaderModule,entryPoint:"vertexMain"},fragment:{module:this._shaderModule,entryPoint:"fragmentMain",targets:[{format:t}]}});return this._pipelines[t]=r,r}destroy(){this._shaderModule=null,this._sampler=null,this._pipelines=Object.create(null),this._cache=Object.create(null)}};function Ou(e){const t=e?8:4;return{name:e?"morphTargetNormal":"morphTarget",structs:{GeometryData:qi},bindings:{global:{uMorphStorage:"storage<f32>",uGeometryStorage:"storage<GeometryData>"}},gpu:{vertex:{input:`
        if (renderable.morphWeightIndex != 0u) {
          let geometryData = uGeometryStorage[renderable.geometryDataIndex];
          let vidLocal = vid - geometryData.baseVertex;
          let morphDeltaBase = geometryData.morphDeltaBase + vidLocal * geometryData.morphTargetCount * ${t}u;
          var morphedPosition = position.xyz;${e?`
          var morphedNormal = normal;`:""}
          for (var morphIndex = 0u; morphIndex < geometryData.morphTargetCount; morphIndex = morphIndex + 1u) {
            let weight = uMorphStorage[renderable.morphWeightIndex + morphIndex];
            if (weight != 0.0) {
              let deltaOffset = morphDeltaBase + morphIndex * ${t}u;
              morphedPosition += vec3<f32>(
                uMorphStorage[deltaOffset],
                uMorphStorage[deltaOffset + 1u],
                uMorphStorage[deltaOffset + 2u],
              ) * weight;${e?`
              morphedNormal += vec3<f32>(
                uMorphStorage[deltaOffset + 4u],
                uMorphStorage[deltaOffset + 5u],
                uMorphStorage[deltaOffset + 6u],
              ) * weight;`:""}
            }
          }
          position = vec4<f32>(morphedPosition, position.w);${e?`
          normal = normalize(morphedNormal);`:""}
        }
      `}}}}const Nu=Ou(!1),$u=Ou(!0);function Ks(e){return Number.isInteger(e)?`${e}.0`:`${e}`}function Xy(e){const t=e.some(([r,i])=>r!==0||i!==0),s=[];return t&&s.push("      let texel = 1.0 / sp.z;"),e.forEach(([r,i],n)=>{const o=r===0&&i===0?"uv":`uv + vec2<f32>(${Ks(r)}, ${Ks(i)}) * texel`;s.push(`      ${n===0?"var s = ":"s += "}textureSampleCompareLevel(uShadowMap, uShadowSampler, ${o}, idx, d);`)}),s.push(e.length===1?"      return s;":`      return s / ${Ks(e.length)};`),s.join(`
`)}function ui(e){return{name:`shadow:${e}`,bindings:{global:{uShadowMap:"texture_depth_2d_array",uShadowSampler:"sampler_comparison",uShadowData:`array<vec4<f32>, ${Ft*6}>`}},gpu:{header:`
    fn sampleShadowAtIndex(
      idx: i32,
      worldPos: vec3<f32>,
      normal: vec3<f32>,
      NdotL: f32,
    ) -> f32 {
      let slot = idx * 6;
      let lightSpaceMatrix = mat4x4<f32>(
        global.uShadowData[slot],
        global.uShadowData[slot + 1],
        global.uShadowData[slot + 2],
        global.uShadowData[slot + 3],
      );
      let sp = global.uShadowData[slot + 4];

      let biasedPos = worldPos + normal * (sp.y * (1.0 - NdotL));
      let lsp = lightSpaceMatrix * vec4<f32>(biasedPos, 1.0);
      let proj = lsp.xyz / lsp.w;

      let uv = proj.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5);

      if (any(uv < vec2<f32>(0.0)) || any(uv > vec2<f32>(1.0)) || proj.z < 0.0 || proj.z > 1.0) {
        return 1.0;
      }

      let d = proj.z - sp.x;

${Xy(yl[e])}
    }

    fn calculateShadow(
      shadowDataIndex: f32,
      cascadeCount: f32,
      worldPos: vec3<f32>,
      normal: vec3<f32>,
      NdotL: f32
    ) -> f32 {
      let baseIndex = i32(shadowDataIndex);

      if (baseIndex == -1) {
        return 1.0;
      }

      let last = i32(cascadeCount) - 1;

      if (last < 1) {
        return sampleShadowAtIndex(baseIndex, worldPos, normal, NdotL);
      }

      let viewDepth = -(camera.uViewMatrix * vec4<f32>(worldPos, 1.0)).z;
      let splits = global.uShadowData[baseIndex * 6 + 5].xyz;

      let crossed = step(splits, vec3<f32>(viewDepth));
      let cascadeIndex = i32(min(dot(crossed, vec3<f32>(1.0)), f32(last)));

      let shadow = sampleShadowAtIndex(baseIndex + cascadeIndex, worldPos, normal, NdotL);

      if (cascadeIndex == last) {
        return shadow;
      }

      let hot = vec3<f32>(f32(cascadeIndex == 0), f32(cascadeIndex == 1), f32(cascadeIndex == 2));
      let splitFar = dot(splits, hot);
      let splitNear = dot(splits, vec3<f32>(hot.y, hot.z, 0.0));

      let band = max((splitFar - splitNear) * ${Ks(Vc)}, 1e-4);
      let blend = saturate((viewDepth - splitFar + band) / band);

      if (blend <= 0.0) {
        return shadow;
      }

      let next = sampleShadowAtIndex(baseIndex + cascadeIndex + 1, worldPos, normal, NdotL);

      return mix(shadow, next, blend);
    }
  `}}}const Uu={hard:ui("hard"),pcf:ui("pcf"),"pcf-high":ui("pcf-high")},Ys={name:"skinning",attributes:{aJoints:"uint8x4",aWeights:"float32x4"},structs:{BoneMatrix:Wi},bindings:{global:{uBonePitStorage:"storage<BoneMatrix>"}},gpu:{vertex:{header:`
        fn getBoneRows(idx: u32, bonePitIndex: u32) -> mat3x4<f32> {
            return uBonePitStorage[(bonePitIndex) + idx].rows;
        }
      `,input:`
        var skinRows =
            getBoneRows(input.aJoints.x, renderable.bonePitIndex) * input.aWeights.x +
            getBoneRows(input.aJoints.y, renderable.bonePitIndex) * input.aWeights.y +
            getBoneRows(input.aJoints.z, renderable.bonePitIndex) * input.aWeights.z +
            getBoneRows(input.aJoints.w, renderable.bonePitIndex) * input.aWeights.w;

        position = vec4<f32>(dot(skinRows[0], position), dot(skinRows[1], position), dot(skinRows[2], position), position.w);
        normal = vec3<f32>(dot(skinRows[0].xyz, normal), dot(skinRows[1].xyz, normal), dot(skinRows[2].xyz, normal));
        tangent = vec3<f32>(dot(skinRows[0].xyz, tangent), dot(skinRows[1].xyz, tangent), dot(skinRows[2].xyz, tangent));
      `}}};function Zy(e,t){if(e.type==="mat2x2<f32>")return`mat2x2<f32>(bitcast<vec2<f32>>(${t}.xy), bitcast<vec2<f32>>(${t}.zw))`;const s=`${t}${e.swizzle}`;return e.scalar==="u32"?s:`bitcast<${e.type}>(${s})`}function Zi(e){const t=[];t.push(`fn ${e.name}(index: u32) -> ${e.struct} {`),t.push(`  let base = ${e.base};`),t.push(`  var m: ${e.struct};`);for(const[s,r]of Tl(e.fields,e.read)){t.push(`  let t${s} = ${e.load(`base + ${s}`)};`);for(const i of r)t.push(`  m.${i.name} = ${Zy(i,`t${s}`)};`)}return t.push("  return m;"),t.push("}"),t.join(`
`)}function Qy(e){const{layout:t,loaded:s,varyings:r}=e,i={},n=["let instance = getInstance(inst.id);"],o=["var instance: Instance;"];for(const a of r){const c=t.struct[a],l=wl(a),u=c==="vec4<u32>"?`instance.${a}`:`bitcast<vec4<u32>>(instance.${a})`,h=c==="vec4<u32>"?`input.${l}`:`bitcast<${c}>(input.${l})`;i[l]="vec4<u32>",n.push(`output.${l} = ${u};`),o.push(`instance.${a} = ${h};`)}return{name:`instanceAccess:${t.key}`,interStage:i,bindings:{global:{uInstanceStorage:{type:"storage<vec4<u32>>",visibility:"vertex"}}},gpu:{vertex:{header:Zi({name:"getInstance",struct:"Instance",fields:t.struct,read:s,base:`index * ${t.stride/4}u`,load:a=>`uInstanceStorage[${a}]`}),storeAccess:n.join(`
  `)},fragment:r.length?{storeAccess:o.join(`
  `)}:void 0}}}const Hu={collectData(e){if(!Cr(e.bits))return;const t=Sl(e.bits,"gpu",e.instanceLayout,e.template);e.bits=[...e.bits,Qy(t)]}},Jy={float32:"f32",float32x2:"vec2<f32>",float32x3:"vec3<f32>",float32x4:"vec4<f32>",sint32:"i32",sint32x2:"vec2<i32>",sint32x3:"vec3<i32>",sint32x4:"vec4<i32>",uint32:"u32",uint32x2:"vec2<u32>",uint32x3:"vec3<u32>",uint32x4:"vec4<u32>",float16x2:"vec2<f32>",float16x4:"vec4<f32>",unorm8x2:"vec2<f32>",unorm8x4:"vec4<f32>",snorm8x2:"vec2<f32>",snorm8x4:"vec4<f32>",uint8x2:"vec2<u32>",uint8x4:"vec4<u32>",sint8x2:"vec2<i32>",sint8x4:"vec4<i32>",unorm16x2:"vec2<f32>",unorm16x4:"vec4<f32>",snorm16x2:"vec2<f32>",snorm16x4:"vec4<f32>",uint16x2:"vec2<u32>",uint16x4:"vec4<u32>",sint16x2:"vec2<i32>",sint16x4:"vec4<i32>"};function tx(e){const t=Jy[e];return t||(V(`[compileAttributesWgsl] Unknown vertex format: "${e}"`),"vec4<f32>")}function ex(e){const t=Object.keys(e);if(t.length===0)return"";const s=[];s.push("struct VertexInput {");let r=0;for(const i of t){const n=tx(e[i]);s.push(`  @location(${r++}) ${i}: ${n},`)}return s.push("}"),s.join(`
`)}const ju={collectData(e){e.data.attributes=Hg(e.bits)},injectCode(e){return{header:ex(e.data.attributes)}}};function sx(e){return{groupIndex:e,bindingIndex:0,resources:Object.create(null),storages:Object.create(null),uniformBuffers:Object.create(null),uniformGroups:Object.create(null)}}function hi(e,t,s){V(`[collectBindings] Binding "${e}" redefined with different type: "${s}" → "${t}". Keeping original.`)}function rx(e,t,s){V(`[collectBindings] Bit "${e}" binding "${t}" has invalid storage type: "${s}". Expected format: storage<StructName>`)}function ix(e,t,s){V(`[collectBindings] Bit "${e}" binding "${t}" has invalid uniform buffer type: "${s}". Expected format: uniform<StructName>`)}function qu(e,t){const s=Object.create(null);us(t).forEach(({name:i},n)=>{s[i]=sx(n)});const r=Object.create(null);for(const i of e)if(i.structs)for(const[n,o]of Object.entries(i.structs))n in r||(r[n]=o);for(const i of e)if(i.bindings)for(const[n,o]of Object.entries(i.bindings)){if(!o)continue;const a=n in s;for(const{name:c,spec:l,uniformGroup:u}of Re(o,n)){const h=hs(l);if(Fi.has(h)){if(a){const d=s[n].resources;c in d?d[c]!==h&&hi(c,h,d[c]):d[c]=h}}else if(mr(h)){if(a){const d=hd(h);if(!d){rx(i.name,c,h);continue}const f=s[n].storages;c in f||(f[c]=d)}}else if(gr(h)){if(a){const d=Ea(h);if(!d){ix(i.name,c,h);continue}const f=s[n].uniformBuffers;c in f?f[c]!==d&&hi(c,d,f[c]):(f[c]=d,r[d]??={})}}else{const d=a?u:n,f=rs(d);f in r||(r[f]={});const p=r[f];p[c]&&p[c]!==h?hi(c,h,p[c]):p[c]=h,a&&(s[n].uniformGroups[d]=!0)}}}return{structs:r,bindGroups:s}}function Wu(e){const{bindGroups:t}=e,s=Object.create(null);for(const r in t){const i=t[r],n=[];let o=i.bindingIndex;i.uniformGroups[r]&&n.push({name:r,binding:o++,kind:"uniform",type:rs(r)});for(const a in i.resources)n.push({name:a,binding:o++,kind:"resource",type:i.resources[a]});for(const a in i.storages)n.push({name:a,binding:o++,kind:"storage",type:i.storages[a]});for(const a in i.uniformBuffers)n.push({name:a,binding:o++,kind:"uniform",type:i.uniformBuffers[a]});for(const a in i.uniformGroups)a!==r&&n.push({name:a,binding:o++,kind:"uniform",type:rs(a)});s[r]={groupIndex:i.groupIndex,entries:n}}return s}function Ku(e){const{structs:t,bindGroups:s}=e;for(const n in s){const{uniformBuffers:o}=s[n];for(const a in o){const c=o[a];if(Object.keys(t[c]??{}).length===0)throw new Error(`[emitBindingsWgsl] Binding "${a}" is "uniform<${c}>", but no bit declares fields for a "${c}" struct.`)}}const r=[];for(const n in t){const o=t[n];r.push(`struct ${n} {`);for(const[a,c]of Object.entries(o))r.push(`  ${a}: ${c},`);r.push("}")}const i=Wu(e);for(const n in i){const{groupIndex:o,entries:a}=i[n];for(const c of a){const l=`@group(${o}) @binding(${c.binding})`;c.kind==="uniform"?r.push(`${l} var<uniform> ${c.name}: ${c.type};`):c.kind==="resource"?r.push(`${l} var ${c.name}: ${c.type};`):r.push(`${l} var<storage, read> ${c.name}: array<${c.type}>;`)}}return r.join(`
`)}const Yu={collectData(e){e.data.bindings=qu(e.bits,e.template),e.data.structs=e.data.bindings.structs},injectCode(e){return{header:Ku(e.data.bindings)}}},nx="{{fragmentWriteOutputs}}";function ox(e,t){const s=["struct Outputs {"];for(const r in e)s.push(`  ${r}: ${e[r]},`);s.push("}","","struct FragmentOutput {");for(let r=0;r<t.length;r++)e[t[r]]&&s.push(`  @location(${r}) ${t[r]}: ${e[t[r]]},`);return s.push("}"),s.join(`
`)}const Xu={collectData(e){e.templateString.includes(nx)&&(e.data.outputs=Sa(e.bits))},injectCode(e){const t=e.data.outputs;if(!t)return{};const s=e.outputLocations;return{header:ox(t,s),fragmentDeclareOutputs:"var outputs: Outputs;",fragmentWriteOutputs:`return FragmentOutput(${s.filter(r=>t[r]).map(r=>`outputs.${r}`).join(", ")});`}}};function ax(e){return e.charAt(0).toUpperCase()+e.slice(1)}function as(e,t){return`${e}${ax(t)}`}function cx(e){const t=Ki(e);for(const s of t)if(!(s==="header"||s==="textureGetters"||s.startsWith("vertex")||s.startsWith("fragment"))){const r=as("vertex",s),i=as("fragment",s);V(`[compileShader] Template slot {{${s}}} is not prefixed with "vertex" or "fragment". Did you mean {{${r}}} or {{${i}}}?`)}}const Zu={collectData(e){cx(e.templateString),e.data.headers=e.bits.map(t=>t.gpu?.header).filter(t=>!!t?.trim())},injectCode(e){return{header:e.data.headers.join(`

`)}}},lx=new Set(["position","frontFacing","sampleIndex","sampleMask"]);function ea(e){return e==="i32"||e==="u32"||e.includes("<i32>")||e.includes("<u32>")}function ux(e,t,s){V(`[compileInterStageWgsl] Inter-stage variable "${e}" redefined with different type: "${s}" → "${t}". Keeping original.`)}function hx(e){const t=Object.create(null);for(const s of e)if(s.interStage)for(const[r,i]of Object.entries(s.interStage))lx.has(r)||(r in t?t[r]!==i&&ux(r,i,t[r]):t[r]=i);return t}function dx(e){const t=[],s=Object.keys(e);t.push("struct VertexOutput {"),t.push("  @builtin(position) position: vec4<f32>,");let r=0;for(const i of s){const n=e[i],o=ea(n)?" @interpolate(flat)":"";t.push(`  @location(${r++})${o} ${i}: ${n},`)}t.push("}"),t.push(""),t.push("struct FragmentInput {"),t.push("  @builtin(position) position: vec4<f32>,"),t.push("  @builtin(front_facing) frontFacing: bool,"),r=0;for(const i of s){const n=e[i],o=ea(n)?" @interpolate(flat)":"";t.push(`  @location(${r++})${o} ${i}: ${n},`)}return t.push("}"),t.join(`
`)}const Qu={collectData(e){e.data.interStage=hx(e.bits)},injectCode(e){return{header:dx(e.data.interStage)}}},Ju={collectData(e){e.data.overrides=Cl(e.bits)},injectCode(e){return{header:e_(e.data.overrides)}}},fx=/\{\{(.*?)\}\}/g;function px(e){const t=new Set;for(const s of e)if(s)for(const r of s.matchAll(fx))t.add(r[1]);return t}function mx(e,t){const s=Ki(e),r=px(Object.values(t));for(const[i,n]of Object.entries(t))n&&/\S/.test(n)&&!s.has(i)&&!r.has(i)&&V(`[compileShader] Generated code for slot {{${i}}} but template doesn't have it. Slot names are prefixed with stage: vertex.input → {{vertexInput}}, fragment.end → {{fragmentEnd}}.`)}const th={collectData(e){e.data.vertexSlots=bi(e.bits,"gpu","vertex"),e.data.fragmentSlots=bi(e.bits,"gpu","fragment")},injectCode(e){const t={};for(const[s,r]of Object.entries(e.data.vertexSlots))t[as("vertex",s)]=r.join(`
`);for(const[s,r]of Object.entries(e.data.fragmentSlots))t[as("fragment",s)]=r.join(`
`);return mx(e.templateString,t),t}};function gx(e,t){const s=bh(e),r=vh(s),i=Object.create(null);for(const n of t)if(n.bindings){for(const[o,a]of Object.entries(n.bindings))if(a)for(const{name:c,spec:l}of Re(a,o))c in i||(i[c]=ld(l))}for(const n of s.groups){const o=i[n.name];if(!o||o==="both")continue;const a=r[n.group]?.find(c=>c.binding===n.binding);a&&(a.visibility=o==="vertex"?Js.VERTEX:Js.FRAGMENT)}return r}const _x=`diagnostic(off, derivative_uniformity);
`;function Xs(e){const{bits:t,template:s,extraPlugins:r,instanceLayout:i,outputLocations:n=me}=e,o=[Hu,Ju,Yu,ju,Qu,Xu,Zu,th],a=r?[...r,...o]:o,c={bits:Bl(t),template:s,templateString:s.gpu,data:{},instanceLayout:i,outputLocations:n},l=`${_x}${wi(c,a)}`;return{vertex:{source:l,entryPoint:"mainVertex"},fragment:{source:l,entryPoint:"mainFragment"},structs:c.data.structs||{},gpuLayout:gx(l,c.bits),bits:c.bits}}function yx(e){return Zi({name:"getMaterial",struct:"Material",fields:e,base:"i32(index)",load:t=>`textureLoad(uMaterialStorage, ${pd(t)}, 0)`})}const eh={injectCode(e){const t=e.data.structs?.Material;if(!t)return{};const s="var material = getMaterial(vMaterialIndex);";return{textureGetters:yx(t),vertexStoreAccess:s,fragmentStoreAccess:s}}};function xx(e,t){const s=`uMaterialTexture${t}, uMaterialSampler${t}`;return[`fn ${e}Direct(uv: vec2<f32>) -> vec4<f32> {`,`  return textureSampleGrad(${s}, uv, vec2<f32>(0.0), vec2<f32>(0.0));`,"}",`fn ${e}(uv: vec2<f32>) -> vec4<f32> {`,`  return textureSample(${s}, uv);`,"}"]}function Mi(e){return{collectData(t){t.bits.some(s=>s.name.startsWith("materialBindings:"))||t.bits.unshift(al(t.bits,e))},injectCode(t){let s=0;const r=[];for(const i of t.bits)if(i.textures)for(const n of i.textures){const o=`sample${n[0].toUpperCase()}${n.slice(1)}`;r.push(...xx(o,s)),s++}return{textureGetters:r.join(`
`)}}}}const bx=new ee({}),vx=new wh({}),sa={direct:[vi,Mi("direct")],merged:[vi,eh,Mi("merged")]},wx=`


{{header}}
{{textureGetters}}
{{vertexHeader}}

@vertex
fn mainVertex(input: VertexInput,
  @builtin(instance_index) ii: u32,
  @builtin(vertex_index) vid: u32
) -> VertexOutput {
  var output: VertexOutput;

  var position: vec4<f32>;
  var normal = vec3<f32>(0.0, 0.0, 1.0);
  var tangent = vec3<f32>(0.0);
  var uv = vec2<f32>(0.0);
  
  let inst = uRenderableInstanceStorage[ii];
  let renderable = uRenderableStorage[inst.id];
  let vMaterialIndex = renderable.materialIndex;
  {{vertexStoreAccess}}

  let batchWorldMatrix = uRenderableStorage[0].transform;
  var modelMatrix = batchWorldMatrix * renderable.transform;

  {{vertexInput}}

  {{vertexBeforeTransform}}

  var worldPosition = modelMatrix * position;
  let modelMatrix3 = mat3x3<f32>(modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz);

  let normalScale = 1.0 / vec3<f32>(
    dot(modelMatrix3[0], modelMatrix3[0]),
    dot(modelMatrix3[1], modelMatrix3[1]),
    dot(modelMatrix3[2], modelMatrix3[2])
  );
  var worldNormal = modelMatrix3 * (normal * normalScale);
  var clipPosition = camera.uViewProjectionMatrix * worldPosition;

  {{vertexAfterTransform}}

  {{vertexEnd}}

  output.position       = clipPosition;
  output.vPosition      = worldPosition.xyz;
  output.vNormal        = worldNormal;
  output.vUV            = uv;
  output.vMaterialIndex = renderable.materialIndex;

  return output;
}

@fragment
fn mainFragment(input: FragmentInput) -> FragmentOutput {
  {{fragmentDeclareOutputs}}
  var normal = normalize(input.vNormal);
  var albedo: vec3<f32> = vec3<f32>(1.0);
  var finalColor: vec3<f32>;
  var alpha: f32 = 1.0;

  let vMaterialIndex = input.vMaterialIndex;
  {{fragmentStoreAccess}}

  {{fragmentMaterial}}

  finalColor = albedo;

  {{fragmentLighting}}

  finalColor *= inputExposure(global.uExposure, global.uDisplayExposure);

  {{fragmentEnd}}

  outputs.color = vec4<f32>(finalColor * alpha, alpha);

  {{fragmentWriteOutputs}}
}
`,Sx={name:"layout",overrideDefs:{HAS_UVS:{type:"u32",required:!0}},outputs:{color:"vec4<f32>"},interStage:{vNormal:"vec3<f32>",vUV:"vec2<f32>",vPosition:"vec3<f32>",vMaterialIndex:"u32"}},Tx={bindGroups:[{name:"global",ubo:!0},"camera","batch"],gpu:wx},Cx=[[Js.VERTEX,"vertex"],[Js.FRAGMENT,"fragment"]];function Dx(e,t,s,r,i){const{maxSamplersPerShaderStage:n,maxSampledTexturesPerShaderStage:o}=s;for(const[a,c]of Cx){let l=0,u=0,h=0,d=0;for(let w=0;w<e.length;w++){const T=e[w];if(T)for(const B of T)B.visibility&a&&(B.texture&&(l++,w===t&&h++),B.sampler&&(u++,w===t&&d++))}const f=u>n;if(!f&&l<=o)continue;const p=`${u} samplers`,m=`${n} (maxSamplersPerShaderStage)`,_=`${l} sampled textures`,g=`${o} (maxSampledTexturesPerShaderStage)`,[b,y,v]=f?[p,m,`Sampled textures: ${l} of ${g}`]:[_,g,`Samplers: ${u} of ${m}`],x=ge(i);throw new Error(`[MaterialSystemGpu] ${r.material.constructor.name}'s shader binds ${b} in the ${c} stage, but this device allows ${y}. ${v}. The engine's globals take ${u-d} samplers and ${l-h} sampled textures, and the material's ${x.length} texture slots take ${d} samplers and ${h} sampled textures: ${x.join(", ")}. Turn off a feature group or remove a texture slot.`)}}var sh=class{static extension={type:[nt.WebGPUSystem],name:"material3d"};batcher=new Kp(this);_destroyed=!1;_renderer;_shaderCache=new Map;constructor(e){this._renderer=e}computeBatchKey(e,t){const s=e._passCache[t];return this._renderer.pipeline.getPipelineKey(e.geometry,s.shader.gpuProgram,s.state,s.topology,s.shader._overrides??vx)}compilePassShader(e,t){const s=Xs({bits:[Xe,ve,...e],template:t});return tr(s.bits,t),Jt.from({gpu:s})}compileIsolatedShader(e,t,s){return Jt.from({gpu:Xs({bits:e,template:t}),groups:s})}compileShader(e,t,s,r,i,n="direct"){const o=[];let a="";(e.includeGlobal??!0)&&(o.push(Xe),a+=`${Xe.name}|`),(e.includeCamera??!0)&&(o.push(ve),a+=`${ve.name}|`),o.push(...e.bitsGpu),a+=e.keyGpu;const c=pl(t.geometry.attributes.aPosition.format);Te(c),o.push(c),a+=`|${c.name}`,t._morph&&(t.geometry.hasMorphNormals?(o.push($u),a+="|morphN"):(o.push(Nu),a+="|morph")),t.skeleton&&(Te(Ys),o.push(Ys),a+=`|${Ys.name}`),s.instanceStoreBuffer&&Cr(o)&&(a+=`|inst:${s.instanceStoreBuffer.layout.key}`),a+=`|${n}`;let l=this._shaderCache.get(a);if(!l){const u=Xs({bits:o,template:e.template,extraPlugins:r,instanceLayout:s.instanceStoreBuffer?.layout,outputLocations:e.outputLocations});tr(u.bits,e.template),Dx(u.gpuLayout,us(e.template).findIndex(h=>h.name==="batch"),this._renderer.gpu.device.limits,t,u.bits),l={shader:Jt.from({gpu:u,overrides:e.overrides}),layout:Na(u.bits)},this._shaderCache.set(a,l)}return i&&(Ua(l.layout,t.material),$a(l.layout,t.material)),l.shader}ensureMaterial(e,t,s){const r=e.material;this._renderer.renderPipes.view3d.materialStoreBuffer.register(r);const i=this.compileShader(this._materialDescriptor(e,s),e,t,sa.direct,!0),n=r._passBit&$.MATERIAL_PASS_MASK,o=r._passes[n],a=o&&o.state||r.state,c=o&&o.topology||r.topology||e.geometry.topology,l=e._passCache[n];return l?(l.shader=i,l.mergedShader=null,l.state=a,l.topology=c,l.lastGeometryUid=-1):e._passCache[n]=new Ai(i,a,c),i}ensureMergedShader(e,t,s){const r=e._passCache[e.material._passBit&$.MATERIAL_PASS_MASK];if(r.mergedShader)return r.mergedShader;const i=this._materialDescriptor(e,s);return r.mergedShader=this.compileShader(i,e,t,sa.merged,!0,"merged"),r.mergedShader}_materialDescriptor(e,t){const s=e.geometry,r=e.material,i=r.fog?t._fogBit:null,n=t._toneMappingBit,o=!!s.attributes.aColor&&r.vertexColors,a=rl(r,n,!!i||o),c=r.getPrimaryDescriptor(t),l=[Xe,Sx,a];s.attributes.aNormal&&l.push(hl),s.attributes.aUV&&l.push(bl(s.attributes.aUV.format)),r.doubleSided&&l.push(il),r.flatShading&&l.push(nl);const u=r.textures.normal;u&&u!==yr&&s.attributes.aUV&&l.push(s.attributes.aTangent?xl:dl),o&&l.push(vl);const h=e.material.lit;e.billboardMode!=="none"&&l.push(ul(e.billboardMode,h));const d=!!s.attributes.aTangent;for(let m=0;m<c.bitsGpu.length;m++){const _=c.bitsGpu[m];l.push(d?ac(_):_)}r.alphaMode==="opaque"&&l.push(sl),i&&l.push(i),a!==ji&&n&&l.push(r._skipsToneCurve?Sr:n),h&&l.push(e.receiveShadow&&t._hasShadows?Uu[t.shadowFilter]:fl,vr(n!==null));const f=t.passByBit[r._passBit&$.MATERIAL_PASS_MASK],p=Pa(l,f,!!c.template);return bx.update({bitsGpu:l,template:c.template??Tx,overrides:{HAS_UVS:s.attributes.aUV?1:0,...c.overrides},outputLocations:p,includeGlobal:!1})}destroy(){if(!this._destroyed){this._destroyed=!0;for(const{shader:e}of this._shaderCache.values())e.destroy();this._shaderCache=null}}};const rh=new Float32Array(24),Bx=4e3;function Qi(e,t,s,r,i){if(i.lastVisibilityDirtyId!==s._visibilityDirtyId){if(i.lastVisibilityDirtyId=s._visibilityDirtyId,i.direct||t.view.count<4e3){ps(t,s,null,i);return}e.dispatch(i.indirectDrawData.drawCallsBuffer,t.gpuData.instanceBuffer.buffer,i.survivors.buffer,s.storeBuffer.buffer,r,rh,t.commandList.count,t.view.count)}}function ps(e,t,s,r){const i=e.gpuData.instanceBuffer.data,n=r.survivors,o=r.indirectDrawData,a=n.data,c=o.drawCalls,l=e.commandList.count,u=e.view.count,h=t.storeBuffer.visible;s!==null&&t._ensureSpheres();const d=t.storeBuffer.boundingSpheres,f=s!==null,p=f?fs(s,t.storeBuffer.data):rh,m=p[0],_=p[1],g=p[2],b=p[3],y=p[4],v=p[5],x=p[6],w=p[7],T=p[8],B=p[9],S=p[10],C=p[11],D=p[12],I=p[13],M=p[14],P=p[15],A=p[16],z=p[17],k=p[18],O=p[19],U=p[20],X=p[21],W=p[22],H=p[23];let N=!1;for(let j=0;j<l;j++){const K=c[j*5+4],J=j+1<l?c[(j+1)*5+4]:u;let at=K;for(let yt=K;yt<J;yt++){const ne=i[yt];if(h[ne]!==0){if(f){const Wt=ne*4,xt=d[Wt+3];if(xt>=0){const St=d[Wt],Tt=d[Wt+1],Ct=d[Wt+2];if(m*St+_*Tt+g*Ct+b<-xt||y*St+v*Tt+x*Ct+w<-xt||T*St+B*Tt+S*Ct+C<-xt||D*St+I*Tt+M*Ct+P<-xt||A*St+z*Tt+k*Ct+O<-xt||U*St+X*Tt+W*Ct+H<-xt)continue}}a[at++]=ne}}const st=at-K;c[j*5+1]!==st&&(c[j*5+1]=st,N=!0)}N&&r.countsDirtyId++,n.upload(u),r.direct||o.upload(l)}function ih(e){const{pipe:t,bit:s,bindsMaterial:r,session:i,useBundles:n,sortBatch:o}=e;if(!n)return;const{view3d:a}=i,c=t.renderer.material3d.batcher,l=ot(e.camera??a.camera).position;for(const u of a._meshBatches){if(!u.renderData._worldVisible)continue;const h=u.drawLists[s];if(!h)continue;const d=h.view;if(d.count===0||!(o?h.isDrawStale():h.nextBuild(a._updateTick)))continue;o&&o(d,u,l);const f=h.gpuData;f.instanceBuffer.populateIds(d),c.render({renderables:d,globalBindGroup:i.globalBindGroup,commandList:h.commandList,drawData:h.drawData,passBit:s,bindsMaterial:r,batch:u,view3d:a}),f.instanceBuffer.upload(d.count)}}function nh(e){const{pipe:t,bit:s,cullResults:r,session:i,useBundles:n}=e;if(!n)return;const{view3d:o}=i,a=$i("forward"),c=t.geometryDataStoreBuffer.buffer,l=(e.camera??o.camera).cullFrustum.planesData;r.removeDetached(o);for(const u of o._meshBatches){if(!u.renderData._worldVisible)continue;const h=u.drawLists[s];if(!h||h.view.count===0)continue;h.claimDrawBuilt();const d=h.view.count<=a,f=r.ensure(u);f.sync(h,d);const p=Ni(u.cull,!d);if(p==="off"){Qi(t.renderer.compute3d,h,u,c,f);continue}if(p==="cpu"){ps(h,u,l,f);continue}const m=fs(l,u.storeBuffer.data);t.renderer.compute3d.dispatch(f.indirectDrawData.drawCallsBuffer,h.gpuData.instanceBuffer.buffer,f.survivors.buffer,u.storeBuffer.buffer,c,m,h.commandList.count,h.view.count)}}function oh(e){const{pipe:t,bit:s,bindsMaterial:r,cullResults:i,session:n,useBundles:o,sortBatch:a}=e,{view3d:c}=n,l=t.renderer.encoder,u=t.renderer.material3d.batcher,h=t.renderer.gc.now,d=e.camera??c.camera,f=ot(d),p=d.cullFrustum.planesData,m=t.geometryDataStoreBuffer.buffer,_=$i("forward");o||i.removeDetached(c);let g=0;for(const b of c._meshBatches){if(!b.renderData._worldVisible)continue;const y=b.drawLists[s];if(!y)continue;const v=y.view;if(v.count===0){if(y.claimDrawEmpty(),o){const w=i.get(b);w&&(w.bundle=null,w.claimBundleRecorded(y,f.bindGroup))}continue}const x=i.ensure(b);if(o&&x.direct&&b.cull!=="off"){x.bundle=null,Rs(n,b,x),y.claimDrawBuilt(),y.commandList.replayDirect(l,x.indirectDrawData,f);continue}if(o){const w=x.bundle;(!w||x.isBundleStale(y,f.bindGroup)||!l.isBundleValid(w))&&(Rs(n,b,x),l.beginBundle(`view3d pass ${s} batch ${b.uid}`),x.direct?y.commandList.replayDirect(l,x.indirectDrawData,f):y.commandList.replay(l,t.renderer.buffer,x.indirectDrawData,f,0,y.commandList.bodyCount),x.bundle=l.endBundle(),x.claimBundleRecorded(y,f.bindGroup))}else{let w=!0;a?(a(v,b,f.position),w=y.isDrawStale()||y.isOrderStale()):y.nextBuild(c._updateTick,!0);const T=y.gpuData;w&&(T.instanceBuffer.populateIds(v),u.render({renderables:v,globalBindGroup:n.globalBindGroup,commandList:y.commandList,drawData:y.drawData,passBit:s,bindsMaterial:r,batch:b,view3d:c}),T.instanceBuffer.upload(v.count));const B=v.count<=_;x.sync(y,B),Rs(n,b,x);const S=Ni(b.cull,!a&&!B);if(S==="gpu"){const C=fs(p,b.storeBuffer.data);t.renderer.compute3d.dispatch(x.indirectDrawData.drawCallsBuffer,T.instanceBuffer.buffer,x.survivors.buffer,b.storeBuffer.buffer,m,C,y.commandList.count,y.view.count)}else ps(y,b,S==="cpu"?p:null,x)}if(y.claimDrawBuilt(),o){const w=y.commandList;w.touch(h),Zs[g++]=x.bundle,!x.direct&&w.count>w.bodyCount&&(Rs(n,b,x),w.replay(l,t.renderer.buffer,x.indirectDrawData,f,w.bodyCount))}else x.direct?y.commandList.replayDirect(l,x.indirectDrawData,f):y.commandList.replay(l,t.renderer.buffer,x.indirectDrawData,f)}g>0&&(l.executeBundle(Zs),Zs.length=0)}function Rs(e,t,s){e.globalBindGroup.setResource(t.storeBuffer.bufferResource,"uRenderableStorage"),e.globalBindGroup.setResource(s.survivors.bufferResource,"uRenderableInstanceStorage"),e.globalBindGroup.setResource(t.instanceStoreBuffer?.bufferResource??de,"uInstanceStorage")}const Zs=[];Fe.register({clear:()=>{Zs.length=0}});const ah={name:"shadowGlobal",structs:{Renderable:ml,RenderableInstance:gl,BoneMatrix:Wi,GeometryData:qi},bindings:{global:{uRenderableStorage:{type:"storage<Renderable>",visibility:"vertex"},uRenderableInstanceStorage:{type:"storage<RenderableInstance>",visibility:"vertex"},uBonePitStorage:{type:"storage<BoneMatrix>",visibility:"vertex"},uMorphStorage:{type:"storage<f32>",visibility:"vertex"},uGeometryStorage:{type:"storage<GeometryData>",visibility:"vertex"}}}},Ix={bindGroups:[{name:"global",ubo:!0},"camera","local"],gpu:`

{{header}}
{{vertexHeader}}

@vertex
fn mainVertex(
  input: VertexInput,
  @builtin(instance_index) ii: u32,
  @builtin(vertex_index) vid: u32
) -> VertexOutput {
  var output: VertexOutput;

  var position: vec4<f32>;

  let renderable = uRenderableStorage[uRenderableInstanceStorage[ii].id];
  let batchWorldMatrix = uRenderableStorage[0].transform;

  var normal = vec3<f32>(0.0);
  var tangent = vec3<f32>(0.0);

  {{vertexInput}}

  let worldPosition = batchWorldMatrix * renderable.transform * position;
  let clipPosition = camera.uViewProjectionMatrix * worldPosition;

  output.position = clipPosition;

  {{vertexEnd}}

  return output;
}

@fragment
fn mainFragment(input: FragmentInput){
}
`};var ch=class extends el{_bundleRun=[];constructor(e){const t=Ei();t.depthTest=!0,t.depthMask=!0,t.culling=!0,t.clockwiseFrontFace=!1,t.blend=!1,super({renderer:e.renderer,name:"shadow",description:"Renders shadow-casting scene geometry into each light shadow map.",bit:$.SHADOW,shadowMapHandle:e.shadowMapHandle,descriptor:{shaderDescriptor:{bitsGpu:[ah],template:Ix,includeGlobal:!1},state:t}})}_applyZRangeFix=!0;prepare(e){const{view3d:t,lights:s}=e;this._bindShadowSource(t,this.renderTarget.depthStencilTexture);const r=this.pipe.renderer.material3d.batcher,i=this.pipe.renderer.compute3d,n=this.pipe.geometryDataStoreBuffer.buffer;for(const o of t._meshBatches){if(!o.renderData._worldVisible)continue;const a=o.drawLists[this.bit];if(!a)continue;const c=a.gpuData,l=a.view;if(l.count===0){a.claimDrawEmpty();continue}a.nextBuild(t._updateTick)&&(a.claimDrawBuilt(),c.instanceBuffer.populateIds(l),r.render({renderables:l,globalBindGroup:e.globalBindGroup,commandList:a.commandList,drawData:a.drawData,passBit:this.bit,bindsMaterial:!1,batch:o,view3d:t}),c.instanceBuffer.upload(l.count))}for(let o=0;o<s.length;o++){const a=s[o],c=a._gpuShadowData;if(!c||(c.cullResults?.removeDetached(t),!yi(a)))continue;const l=Be(a),u=c.cascades,h=c.cullResults??=new Qc,d=$i("shadow");for(let f=0;f<l;f++){const p=u?.[f];if(!p||!p.needsRender)continue;const m=p.cameraData.frustum;for(const _ of t._meshBatches){if(!_.renderData._worldVisible)continue;const g=_.drawLists[this.bit];if(!g||g.view.count===0)continue;if(f===0)for(let x=l;x<4;x++)h.remove(_,x);const b=g.view.count<=d,y=h.ensure(_,f);y.sync(g,b);const v=Ni(_.cull,!b);if(v==="off")Qi(i,g,_,n,y);else if(v==="cpu")ps(g,_,m.planesData,y);else{const x=fs(m.planesData,_.storeBuffer.data);i.dispatch(y.indirectDrawData.drawCallsBuffer,g.gpuData.instanceBuffer.buffer,y.survivors.buffer,_.storeBuffer.buffer,n,x,g.commandList.count,g.view.count)}}}}}render(e){const{view3d:t,lights:s}=e,r=this.pipe.renderer,i=r.encoder,n=r.pipeline;n.setColorMask(0);for(const o of s){if(!yi(o))continue;const a=this.getShadowGPUData(o).cullResults;if(!a)continue;const c=Be(o);for(let l=0;l<c;l++){const u=this._cascadeSlot(o,l);if(!u.needsRender)continue;const h=o._shadowDataIndex+l,d=u.cameraData.bindGroup;r.renderTarget.bind({target:this.renderTarget,clear:!0,layer:h}),r.ubo.updateUniformGroup(u.cameraData.uniformGroup),u.cameraData.uniformGroup.buffer.autoGarbageCollect=!1;for(const f of t._meshBatches){if(!f.renderData._worldVisible)continue;const p=f.drawLists[this.bit];if(!p||p.view.count===0)continue;const m=a.get(f,l);if(!m)continue;if(m.direct&&f.cull!=="off"){m.bundle=null,e.globalBindGroup.setResource(f.storeBuffer.bufferResource,"uRenderableStorage"),e.globalBindGroup.setResource(m.survivors.bufferResource,"uRenderableInstanceStorage"),p.commandList.replayDirect(i,m.indirectDrawData,u.cameraData);continue}const _=m.bundle;if(!_||m.isBundleStale(p,d)||!i.isBundleValid(_)){const{globalBindGroup:b}=e;b.setResource(f.storeBuffer.bufferResource,"uRenderableStorage"),b.setResource(m.survivors.bufferResource,"uRenderableInstanceStorage"),i.beginBundle(`shadow cascade ${l} batch ${f.uid}`),m.direct?p.commandList.replayDirect(i,m.indirectDrawData,u.cameraData):p.commandList.replay(i,r.buffer,m.indirectDrawData,u.cameraData,0,p.commandList.bodyCount),m.bundle=i.endBundle(),m.claimBundleRecorded(p,d)}const g=p.commandList;g.touch(r.gc.now),this._bundleRun.push(m.bundle),!m.direct&&g.count>g.bodyCount&&(e.globalBindGroup.setResource(f.storeBuffer.bufferResource,"uRenderableStorage"),e.globalBindGroup.setResource(m.survivors.bufferResource,"uRenderableInstanceStorage"),g.replay(i,r.buffer,m.indirectDrawData,u.cameraData,g.bodyCount))}this._bundleRun.length>0&&(i.executeBundle(this._bundleRun),this._bundleRun.length=0)}this._completeShadowUpdate(o)}n.setColorMask(15),e.activeTarget=null}};const Mx=13421772,ra=new vt,Ls=new lt,he={x:0,y:0};var lh=class{static extension={type:[nt.WebGPUPipes],name:"view3d"};renderer;_brdfLutTexture;_iblEnvironmentMap=new Map;_onEnvironmentDestroy=e=>{this._iblEnvironmentMap.get(e)?.source.unload(),this._iblEnvironmentMap.delete(e)};_viewport=new lt;_sortForwardByDistance=(e,t,s)=>{vg(e,t.storeBuffer.data,s)};_forwardOptions={pipe:this,bit:0,bindsMaterial:!1,cullResults:null,camera:null,session:null,useBundles:!1,sortBatch:void 0};materialStoreBuffer;_morphStoreBuffer=new Ac;geometryDataStoreBuffer=new Mc;atlasPool=Gl.from({rebaseIndices:!1});_managedViews;_destroyed=!1;_colorOutputDraw=null;constructor(e){this.renderer=e,this._managedViews=new Il(this.renderer),this.renderer.runners.contextChange.add(this)}contextChange(e){if(!e.device.features.has("indirect-first-instance"))throw new Error("@pixi/3d requires the WebGPU 'indirect-first-instance' feature (used by the batched indirect draw path).");this.materialStoreBuffer??=new Pc({alignment:this.renderer.limits.minUniformBufferOffsetAlignment,rendererType:this.renderer.type})}createShadowPass(e){return new ch({renderer:this.renderer,shadowMapHandle:e.shadowMapHandle})}renderForward(e,t){oh(this._fillForwardOptions(e,t,e.sort==="distance")),this._releaseForwardOptions()}prepareForward(e,t){if(!xi(e))return;const s=this._fillForwardOptions(e,t,!1);ih(s),nh(s),this._releaseForwardOptions()}_fillForwardOptions(e,t,s){const r=this._forwardOptions;return r.useBundles=xi(e),r.bit=e.bit,r.bindsMaterial=e.bindsMaterial,r.cullResults=e.cullResults,r.camera=e.camera,r.session=t,r.sortBatch=s?this._sortForwardByDistance:void 0,r}_releaseForwardOptions(){this._forwardOptions.cullResults=null,this._forwardOptions.camera=null,this._forwardOptions.session=null}renderGeometry(e,t,s){this.renderer.encoder.draw({geometry:e,shader:t,state:s})}setViewport(e){this.renderer.encoder.setViewport(e)}_depthClearShader=null;_depthClearState=null;clearDepth(e){this._depthClearShader||this._buildDepthClear();const{encoder:t,pipeline:s}=this.renderer;s.setColorMask(0),t.draw({geometry:ds(),shader:this._depthClearShader,state:this._depthClearState}),s.setColorMask(15)}_buildDepthClear(){const e=new zt;e.depthTest=!1,e.depthMask=!0,e.culling=!1,e.blend=!1,this._depthClearState=e,this._depthClearShader=Jt.from({gpu:{vertex:{entryPoint:"mainVertex",source:`
            struct VertexOutput { @builtin(position) position: vec4<f32> };

            @vertex
            fn mainVertex(@location(0) aPosition: vec2<f32>) -> VertexOutput {
              var output: VertexOutput;
              output.position = vec4<f32>(aPosition, 1.0, 1.0);
              return output;
            }
          `},fragment:{entryPoint:"mainFragment",source:`
            @fragment
            fn mainFragment() -> @location(0) vec4<f32> {
              return vec4<f32>(0.0, 0.0, 0.0, 1.0);
            }
          `}}})}copyColor(e,t,s){const{target:r,viewport:i}=e;if(!r.colorTexture)return;this.renderer.renderTarget.finishRenderPass();const n=t.frame,o=t.source.resolution;he.x=Math.round(n.x*o),he.y=Math.round(n.y*o),this.renderer.renderTarget.copyToTexture(r,t,Ls.copyFrom(i),Ls,he),s.activeTarget=null}outputColor(e,t,s,r){e.target.colorTexture&&(this.renderer.renderTarget.finishRenderPass(),(this._colorOutputDraw??=new tl(this.renderer)).draw(this,e,t,r),s.activeTarget=null)}generateMips(e,t){const s=t.view3d._graph.getTexture(e,t).source;this.renderer.renderTarget.finishRenderPass(),t.activeTarget=null,this.renderer.mipChain3d.generate(s)}resolveColor(){}copyDepth(e,t,s){const{target:r,viewport:i}=e;r.depthStencilTexture&&(this.renderer.renderTarget.finishRenderPass(),he.x=0,he.y=0,this.renderer.renderTarget.copyDepthTexture(r,t,Ls.copyFrom(i),Ls,he),s.activeTarget=null)}validateRenderable(){return!1}addRenderable(e,t){this.renderer.renderPipes.batch.break(t),t.add(e)}updateRenderable(){}execute(e){if(!e.isRenderable)return;const t=ur(e,this.renderer),s=this.renderer.renderTarget.renderTarget;e._ensureInitialized(this.renderer,t,s.colorTexture.source.resolution),this._managedViews.track(e);const r=e.environment;r&&(this._brdfLutTexture||=Hc({renderer:this.renderer}),t.globalBindGroup.setResource(this._brdfLutTexture.source,"uBrdfLutTexture"));const i=this._prefilteredEnvironment(r);t.globalBindGroup.getResource("uEnvironmentTexture")!==i&&(t.globalBindGroup.setResource(i,"uEnvironmentTexture"),e._invalidateBundleCaches());const n=e.lights;if(e._meshSlots.count===0&&e._meshBatches.length===1)return;const o={view3d:e,lights:n,defaultTarget:s,defaultFrontFaceInverted:!1,activeTarget:null,needsDepthClear:!0,viewport:this._viewport,activeViewport:this._viewport,globalBindGroup:t.globalBindGroup,renderer:this.renderer};ru(e,this,o)&&(t.globalBindGroup.setResource(this.materialStoreBuffer.texture.source,"uMaterialStorage"),t.globalBindGroup.setResource(e._bonePit.bufferResource,"uBonePitStorage"),t.globalBindGroup.setResource(this._morphStoreBuffer.bufferResource,"uMorphStorage"),t.globalBindGroup.setResource(this.geometryDataStoreBuffer.bufferResource,"uGeometryStorage"),this.materialStoreBuffer.update(),this.geometryDataStoreBuffer.update(),this.atlasPool.update(),Ec(this.atlasPool,this.materialStoreBuffer,t,this._morphStoreBuffer,this.geometryDataStoreBuffer)&&e._invalidateDrawCaches(),this.prepareView(o),e._graph.run(o))}destroy(){if(!this._destroyed){this._destroyed=!0,this._managedViews.destroy(),this._colorOutputDraw?.destroy(),this._colorOutputDraw=null,this._brdfLutTexture?.destroy(!0),this._brdfLutTexture=void 0;for(const[e,t]of this._iblEnvironmentMap)e.off("destroy",this._onEnvironmentDestroy),t.destroy(!0);this._iblEnvironmentMap=null,this.renderer.runners.contextChange.remove(this),this.materialStoreBuffer.destroy(),this.materialStoreBuffer=null,this._morphStoreBuffer.destroy(),this.geometryDataStoreBuffer.destroy(),this._depthClearShader?.destroy(),this._depthClearShader=null,this._depthClearState=null}}_prefilteredEnvironment(e){if(!(e instanceof bt)||e.source.destroyed)return Ot.source;let t=this._iblEnvironmentMap.get(e.source);return t||(t=bc({renderer:this.renderer,sourceTexture:e}),this._iblEnvironmentMap.set(e.source,t),e.source.once("destroy",this._onEnvironmentDestroy)),t.source}prepareView(e){const{view3d:t,lights:s}=e;this.renderer.lighting3d.update(t,s),this._updateGlobalUniforms(t)}_updateGlobalUniforms(e){const{fog:t}=e,s=ur(e,this.renderer).globalUniformGroup,r=s.uniforms;if(r.uTime=performance.now()/1e3,r.uExposure=e.exposure,r.uDisplayExposure=Math.pow(e.exposure,1/2.2),t){ra.setValue(t.color??Mx),At(r.uFogColor,0,ra,e.exposure);const i=r.uFogParams;i[0]=t.near||0,i[1]=t.far||99999999,i[2]=t.density||0}s.update(),this.renderer.ubo.updateUniformGroup(s)}};ke.add(Eu,Vu,Gu,sh,lh);const Px=Object.freeze(Object.defineProperty({__proto__:null,ComputeSystemGpu:Eu,GPU_VISIBILITY_MIN:Bx,LightingSystemGpu:Vu,MaterialSystemGpu:sh,MipChainSystemGpu:Gu,ShadowRenderPassGpu:ch,View3DPipeGpu:lh,buildWgslBindingMap:Wu,collectBindings:qu,compileWgslSource:Xs,computeForwardBatchesGpu:nh,createTexturesPluginGpu:Mi,emitBindingsWgsl:Ku,generateWgslStructAccessor:Zi,getGlobalGpuData:ur,globalBitGpu:Xe,instanceAccessPlugin:Hu,materialTextureAccessPlugin:eh,morphTargetBitGpu:Nu,morphTargetNormalBitGpu:$u,prefixSlotName:as,prepareForwardBatchesGpu:ih,produceCpuCompaction:ps,produceVisibilityCompaction:Qi,renderForwardBatchesGpu:oh,shadowBitsGpu:Uu,shadowGlobalBitGpu:ah,skinningBitGpu:Ys,wgslAttributesPlugin:ju,wgslBindingsPlugin:Yu,wgslFragmentOutputsPlugin:Xu,wgslHeadersPlugin:Zu,wgslInterStagePlugin:Qu,wgslOverridesPlugin:Ju,wgslStageSlotsPlugin:th},Symbol.toStringTag,{value:"Module"}));export{Vx as A,Di as B,Fx as C,Yl as D,Y as G,kx as I,ye as M,Gx as O,mt as Q,$ as R,Rx as S,Lx as T,F as V,zx as a,hc as b,E as c,ry as d,Ex as g,_e as s};
