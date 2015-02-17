var Section = Section || {};

Section.Chamber = (function(){

    var section = function(variationNumber,entranceDoorDirection){
        var self = this;
        self.map=[];
        self.variation = SectionData.Chamber[variationNumber];
        if(!self.variation)
            throw 'Cannot create Chamber '+variationNumber;
        self.unconnectedDoors = [entranceDoorDirection];
        self.unconnectedPassages = [];
        self.potentialDoors = [];
        self.potentialPassages = [];
        self.connectedDoors = [];
        //self.setUnconnectedDoors();
        //self.setUnconnectedPassages();
        self.createMap(self.variation.map);
    };

    section.prototype = new SectionBase();

    return section;
})();