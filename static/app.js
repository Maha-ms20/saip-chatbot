
class Chatbox {
  
   constructor() {
       this.args = {
           openButton: document.querySelector('.chatbox__button'),
           chatBox: document.querySelector('.chatbox__support'),
           sendButton: document.querySelector('.send__button'),
           
       }

       this.state = false; // chatbot is closed
       this.messages = []; // array to store msgs
   }
    display() {
     const {openButton, chatBox, sendButton} = this.args;
     const key = "";
     openButton.addEventListener('click',listener => this.toggleState(chatBox))
     sendButton.addEventListener('click',listener => this.onSendButton(chatBox))
    // const node = chatBox.querySelector('input');
    // node.addEventListener("keypress",({key:string})=> {

      // if (key==="Enter") {
       // document.getElementById("send").click();
       //  }
       document.getElementById("textbox").addEventListener("keyup", function(event) {
       event.preventDefault();
       if (event.keyCode === 13) {
           document.getElementById("send").click();
       }
   });

    // })



    }

   toggleState(chatbox) { // show or hide the box
     this.state = !this.state;

      if(this.state) {

        chatbox.classList.add('chatbox--active')
        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = '<div class="messages__item messages__item--visitor">' + "مرحبا بك" + '</div>'
        document.getElementById("cb").style.visibility = "hidden"; 
      } else {
          chatbox.classList.remove('chatbox--active')
          document.getElementById("cb").style.visibility = "visible"; 
      }


   }
   
   onSendButton(chatbox) {
       var textField = chatbox.querySelector('input'); // extract user input
       let text1 = textField.value
       if (text1 === "") {
           return;
       }
       let msg1 = { name:"user", message: text1 }
       this.messages.push(msg1);
       this.updateChatText(chatbox)
    textField.value = ''
 
var  html = '<div class="messages__item messages__item--visitor"><div class="chat-bubble" id="loading"><div class="typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div></div>'
const chatmessage = chatbox.querySelector('.chatbox__messages');
       chatmessage.innerHTML = html;
      

       fetch($SCRIPT_ROOT + '/predict', {
           method: 'POST',
           body: JSON.stringify({message: text1}),
           crossDomain: true,
           Headers: {
               'Content-Type': 'application/json; charset=UTF-8'
           },

   })
   //extract the response from chat.py
   .then(r => r.json())
   .then(r =>{
    let msg2 = { name:"فريدة", message: r.answer};
    this.messages.push(msg2)

    this.updateChatText(chatbox)
    textField.value = ''
   }).catch((error) => {

   /* console.error('error:', error); */
    this.updateChatText(chatbox)
    textField.value = ''
   });

   }

   updateChatText(chatbox) {
       var html = " ";
       this.messages.slice().reverse().forEach(function(item, ) {
         if (item.name === "فريدة")
         {
             html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
         } else {
            html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
         }


       });
      const chatmessage = chatbox.querySelector('.chatbox__messages');
       chatmessage.innerHTML = html;
       
   }
}

const chatbox = new Chatbox();
chatbox.display();
