
let arr = [];
let operator = [];
let justEvaluated = false;
let num = "";
let sub = {
    "+": (a,b)=>a+b,
    "-": (a,b)=>a-b,
    "*": (a,b)=>a*b,
    "/": (a,b)=> b === 0?"Err":a/b,
    "%": (a,b)=>a%b
}
let display = document.querySelector("#display")
const button = document.querySelector("#buttons")
button.addEventListener("click",function(elem){
    const btn = elem.target.closest("button");
    if(!btn){
        return;
    }
    else if(btn.classList.contains("d")){
        if(['+','-','*','/','%'].includes(btn.textContent)){
            if(num.length != 0){
                arr.push(Number(num));
                num = "";
            }
            operator.push(btn.textContent);
            justEvaluated = false;
        }
        else if(btn.classList.contains("nm")){
            if(justEvaluated){
                display.textContent = "cannot modify the answer!"
                return;
            }
            num+=`${btn.textContent}`
        }
        else if(btn.textContent == '='){
            arr.push((Number(num)));
            num = "";
            if((num == "" && arr.length == 0) || (arr.length !== operator.length+1)){
                display.textContent = "Error";
                return;
            }
            operate(arr,operator);
            justEvaluated = true;
            return;
            
        }
        display.textContent += `${btn.textContent}`;
    }
    else{
        if(btn.textContent == 'AC'){
            arr = [];
            num = "";
            operator=[];
            display.textContent = "";
            justEvaluated = false;
        }
        else if(btn.textContent == "C" || btn.textContent == '<--'){
            let str = display.textContent.slice(-1);
            display.textContent = display.textContent.slice(0,display.textContent.length - 1);
            if(['+','-','*','/','%'].includes(str)){
                operator.pop();
            }
            else{
                if(num.length > 0){
                    //that number is not appended inside the array so just shorten the num
                    num = num.slice(0,num.length-1);
                }
                else if(arr.length>0){
                    //this mean the now the number we are deleting should be deleted inside the array too
                    let size = arr.length;
                    let numb = `${arr[size-1]}`;
                    numb = numb.slice(0,numb.length-1);
                    if(numb === ""){
                        arr.pop();
                    }
                    else{
                        arr[size-1] = Number(numb);
                    }
                }
            }
        }
    }
})

function operate(arr,operator){
    let oplen = operator.length;
    while(oplen!= 0){
        const ele1 = arr[0];
        const ele2 = arr[1];
        const o = operator[0];
        const ans = sub[o](ele1,ele2);
        if(ans === "Err"){
            display.textContent = "Error";
            return;
        }

        arr.shift();
        arr.shift();
        arr.unshift(ans);
        operator.shift();
        oplen--;
    }
    if(isNaN(arr[0])){
        display.textContent = "Error, please select in right order"
        return;
    }
    display.textContent = `${arr[0]}`;
}

