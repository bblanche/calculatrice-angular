import { splitClasses } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  input:string = '';
  result:string = '';
  isOff:boolean = true;

  
 off(){
  this.result = '';
  this.input = ''; 
  this.isOff = true;
 }

  pressNum(num: string) {
    
    //Do Not Allow . more than once
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastOperand()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    //Do Not Allow 0 at beginning. 
    //Javascript will throw Octal literals are not allowed in strict mode.
    if (num=="0") {
      if (this.input=="" ) {
        return;
      }
      const PrevKey = this.input[this.input.length - 1];
      if (PrevKey === '/' || PrevKey === '*' || PrevKey === '-' || PrevKey === '+')  {
          return;
      }
    }
 
    this.input = this.input + num
    this.calcAnswer();
    
  }
 
 
  getLastOperand() {
    let pos:number;
    console.log(this.input)
    
    pos=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }
 
 
  pressOperator(op: string) {
 
    //Do not allow operators more than once

    if (op!="-") {
      if (this.input=="" ) {
        return;
      }
    }

    const lastKey = this.input[this.input.length - 1];

    //modifie l'input pour une opération ln
    if (this.input[0]==='l'){
      this.input=this.result;
      return
    }

    //modifie l'input pour une opération %
    if (lastKey==='%'){
      this.input=this.result;
      return
    }

    //modifie l'input pour une opération sqrt
    if (this.input[0]==='s'){
      this.input=this.result;
      return
    }
    
    
   
   
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
   
    
    this.input = this.input + op
    this.calcAnswer();
  }
 
  clear() {
    this.input = '';
  }

  /*clear() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }*/
 
  allClear() {
    this.result = '';
    this.input = '';
    this.isOff = false;
  }

  delete(){
    //On ne peut pas delete une opération ln
    if (this.input[0]==='l'){
      return;
    }
    //On ne peut pas delete une opération %
    if (this.input[this.input.length-1]==='%'){
      return;
    }
    //On ne peut pas delete une opération sqrt
    if (this.input[0]==='s'){
      return;
    }
    this.input=this.input.substring(0, this.input.length-1);
    this.calcAnswer();
    
  }

 
  calcAnswer() {
    let formula = this.input;
 
    let lastKey = formula[formula.length - 1];

        
    if (lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    lastKey = formula[formula.length - 1];
 
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula=formula.substr(0,formula.length - 1);
    }
 
    console.log("Formula " +formula);
    this.result = eval(formula);
  }
 
  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }

  pourcentage(){
    let nombre = eval(this.input)/100;
    this.result = nombre.toString();
    this.input = "("+this.input+")%"; 
  }


  ln() {
    let nombre = eval(this.input);
    if(nombre <= 0){
      this.result = "Erreur, entrez un nombre positif";
      this.input = "ln("+this.input+")"; 
    }else{
      this.result = Math.log(nombre).toString();
      this.input = "ln("+this.input+")"; 
    }
    
  }

  racine() {
    let nombre = eval(this.input);
    if(nombre <= 0){
      this.result = "Erreur, entrez un nombre positif";
      this.input = "sqrt("+this.input+")"; 
    }else{
      this.result = Math.sqrt(nombre).toString();
      this.input = "sqrt("+this.input+")"; 
    }
    
  }
 
}