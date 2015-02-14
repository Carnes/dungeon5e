Array.prototype.randomize = function (){
    var array = this;
    var currentIndex = array.length, temporaryValue, randomIndex ;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
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
