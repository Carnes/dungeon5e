var Section = Section || {};

Section.Chamber = (function(){

    var section = function(variationNumber,entranceDoorDirection){
        var self = this;
        self.map=[];
        self.variation = SectionData.Chamber[variationNumber];
        if(!self.variation)
            throw 'Cannot create Chamber '+variationNumber;
        self.potentialDoorCount = null;
        self.potentialDoorLocations = [];
        self.unconnectedDoors = [entranceDoorDirection];
        self.connectedDoors = [];
        self.unconnectedPassages = [];
        self.potentialPassages = [];
        //self.setUnconnectedDoors();
        //self.setUnconnectedPassages();
        self.createMap(self.variation.map);
    };

    section.prototype = new SectionBase();

    return section;
})();