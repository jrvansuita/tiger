


module.exports = {

   build(){

     String.prototype.replaceAll = function(search, replacement) {
         var target = this;
         return target.replace(new RegExp(search, 'g'), replacement);
     };


     String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
   }

};
