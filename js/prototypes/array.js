Array.prototype.randomize = function (){
    var array = this;
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        //randomIndex = Math.floor(Math.random() * currentIndex);
        randomIndex = Random.int(currentIndex-1);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

Array.prototype.remove = function (valueOrPredicate) {
    var removedValues = [];
    var predicate = typeof valueOrPredicate == "function" ? valueOrPredicate : function (value) { return value === valueOrPredicate; };
    for (var i = 0; i < this.length; i++) {
        var value = this[i];
        if (predicate(value)) {
            removedValues.push(value);
            this.splice(i, 1);
            i--;
        }
    }
    return removedValues;
};

Array.prototype.clone = function(){
    return JSON.parse(JSON.stringify(this));
};

Array.prototype.any = function (predicate) {
    if (typeof(predicate)!='function')
        throw 'Function expected';

    for (var i = 0; i < this.length; i++)
        if (predicate(this[i]))
            return true;

    return false;
};

Array.prototype.firstOrNull = function (predicate) {
    if (typeof(predicate)!='function')
        throw 'Predicate must be a function';

    for (var i = 0; i < this.length; i++)
        if (predicate(this[i]))
            return this[i];

    return null;
};

Array.range = function(max){
    var a = new Array(max);
    for(var i=0;i<max;i++)
        a[i]=i;
    return a;
};

Array.prototype.select = function (predicate) {
    var projectedValues = [];
    for (var i = 0; i < this.length; i++)
        projectedValues.push(predicate(this[i]));
    return projectedValues;
};