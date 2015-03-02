var Section = Section || {};

Section.Chamber = (function(){

    var section = function(variationNumber,entranceDoorDirection){
        var self = this;
        self.map=[];
        self.variation = Data.Chamber[variationNumber];
        if(!self.variation)
            throw 'Cannot create Chamber '+variationNumber;
        self.potentialDoorLocations = [];
        self.unconnectedDoors = [entranceDoorDirection];
        self.connectedDoors = [];
        self.unconnectedPassages = [];
        self.potentialPassages = [];
        self.createMap(self.variation.map);
    };

    section.prototype = new SectionBase();

    return section;
})();