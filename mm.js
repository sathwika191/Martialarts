var c = document.getElementById("mycanvas");
var ctx = c.getContext("2d");
let loadimage=(src,callback)=>{
   var img = document.createElement("img");
   img.onload = ()=> callback(img);
      img.src=src;
};
var imagepath=(framenumber,animation)=>{

 if(animation==="idle"){
       return 'idle'+'/'+framenumber+'.png'
    }
   else if(animation==="kick"){
       return 'kick'+'/'+framenumber+'.png'
    }
   else if(animation==="punch"){
       return'punch'+'/'+framenumber+'.png'
    }
   else if(animation==="block"){
       return 'block'+'/'+framenumber+'.png'
    }
   else if(animation==="backward"){
       return 'backward'+'/'+framenumber+'.png'
    }
  else if(animation==="forward"){
          return 'forward'+'/'+framenumber+'.png'
 }
};
let frames={
   idle:[1,2,3,4,5,6,7,8],
   kick:[1,2,3,4,5,6,7],
   punch:[1,2,3,4,5,6,7],
   backward:[1,2,3,4,5,6],
    forward:[1,2,3,4,5,6],
    block:[1,2,3,4,5,6,7,8,9],
};
//loading images
var loadimages=(callback)=>{
   var images={idle:[],kick:[],punch:[],backward:[],forward:[],block:[]};
   var imagesToLoad=0;
   ["idle","kick","punch","backward","block","forward"].forEach((animation)=>{
      let animationFrames=frames[animation];
      imagesToLoad=imagesToLoad+animationFrames.length;

         animationFrames.forEach((frameNumber) => {
             let path=imagepath(frameNumber,animation);
      loadimage(path,(image)=>{
         images[animation][frameNumber-1]=image;
         imagesToLoad=imagesToLoad-1;
         if(imagesToLoad===0){
            callback(images);
         }
      });
   });
   });
};
//drawing images
var animate=(ctx,images,animation,callback)=>{
   images[animation].forEach((image,index)=>{
      setTimeout(()=>{
         ctx.clearRect(100,150,500,500);
         ctx.drawImage(image,100,150,500,500);
      },index*100);
   });
   setTimeout(callback,images[animation].length*100);
};

loadimages((images)=>{
   var queuedAnimations=[];
  
   let aux=()=>{
      var selectedAnimation;
      if(queuedAnimations.length==0){
         selectedAnimation="idle";
       }else{
         selectedAnimation=queuedAnimations.shift();
        }
      animate(ctx,images,selectedAnimation,aux);

   };
   aux();
   document.getElementById("kick").onclick=()=>{
      queuedAnimations.push("kick");
         };
         document.getElementById("punch").onclick=()=>{
            queuedAnimations.push("punch");
         };
          document.getElementById("backward").onclick=()=>{
            queuedAnimations.push("backward");
         };
          document.getElementById("forward").onclick=()=>{
             queuedAnimations.push("forward");
          };
          document.getElementById("block").onclick=()=>{
             queuedAnimations.push("block");
          };
    
         
         document.addEventListener("keyup",(event) =>{
            const key=event.key;
             if(key==="Enter"){
                 queuedAnimations.push("kick");
             } else if(key=="ArrowUp") {
                 queuedAnimations.push("punch");
         }
        else if(key=="ArrowLeft") {
             queuedAnimations.push("backward");
     }
          else if(key=="ArrowRight") {
       queuedAnimations.push("forward");
 }
 else if(key=="ArrowDown") {
    queuedAnimations.push("block");
 }
});
});