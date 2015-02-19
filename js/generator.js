var Generator = (function(){
    var self = {};
    self.map = null;
    self.chamberQueue = [];
    self.doorQueue = [];
    self.generating = false;

    self.genEntrance = function(x , y){
        var variationList = [];
        for(var i=0; i< SectionData.Entrance.length; i++)
            variationList.push(i);
        variationList.randomize();
        var success = false;
        var entrance;

        while(variationList.length > 0 && success == false)
        {
            var randInt = Random.int(variationList.length-1);
            var chamberRotationStart = Random.int(3);
            var variation = variationList[randInt];
            variationList.remove(variation);
            entrance = new Section.Entrance(variation);
            for(var i = 0; i<chamberRotationStart; i++)
               entrance.rotateMapCounterClockwise();

            success = self.map.addSection(entrance,x,y);
            if(success){
                entrance.x = x;
                entrance.y = y;
            }
        }

        if(!success)
            return false;

        while (true){
            var potentialDoorLocations = entrance.getUnconnectedPotentialDoors();
            if(potentialDoorLocations === false)
                break;
            var door = potentialDoorLocations.randomize()[0];
            entrance.placeDoor(door);
            self.doorQueue.push(door);
        }

        self.map.refreshMap();
        return entrance;
    };

    self.genDoorsForChamber = function(chamber){ // FIXME - these could also be passages
        var newDoorsCount = 0;
        if(chamber.variation.size == 'normal')
            newDoorsCount = SectionData.Chamber.NormalExitChance.randomize()[0];
        if(chamber.variation.size == 'large')
            newDoorsCount = SectionData.Chamber.LargeExitChance.randomize()[0];
        for(var i=0;i<newDoorsCount;i++)
            chamber.unconnectedDoors.push('anyWhere'); // FIXME - use exit location table

        while (true){
            potentialDoorLocations = chamber.getUnconnectedPotentialDoors();
            if(potentialDoorLocations == false || potentialDoorLocations.length == 0)
                return;
            var door = potentialDoorLocations.randomize().pop();
            chamber.placeDoor(door);
            self.doorQueue.push(door);
            self.map.refreshMap();
        }
    };

    self.genPassagesForChamber = function(chamber){ // FIXME - these could also be passages
        //var newDoorsCount = 0;
        //if(chamber.variation.size == 'normal')
        //    newDoorsCount = SectionData.Chamber.NormalExitChance.randomize()[0];
        //if(chamber.variation.size == 'large')
        //    newDoorsCount = SectionData.Chamber.LargeExitChance.randomize()[0];
        //for(var i=0;i<newDoorsCount;i++)
        //    chamber.unconnectedDoors.push('anyWhere'); // FIXME - use exit location table
        //
        //while (true){
        //    potentialDoorLocations = chamber.getUnconnectedPotentialDoors();
        //    if(potentialDoorLocations == false || potentialDoorLocations.length == 0)
        //        return;
        //    var door = potentialDoorLocations.randomize().pop();
        //    chamber.placeDoor(door);
        //    self.doorQueue.push(door);
        //    self.map.refreshMap();
        //}
    };

    self.genChamberFromDoor = function(parentDoor){
        var variationList = Array.range(SectionData.Chamber.length).randomize();
        var success = false;
        var chamber;
        var chamberDoorDirection;
        var rotations=0;
        var variation=null;
        switch(parentDoor.direction){
            case 'east':
                chamberDoorDirection = 'west'; break;
            case 'west':
                chamberDoorDirection = 'east'; break;
            case 'north':
                chamberDoorDirection = 'south'; break;
            case 'south':
                chamberDoorDirection = 'north'; break;
        }
        while(variationList.length > 0 && success == false){
            if(rotations == 4 || variation == null){
                variation = variationList.pop();
                rotations = 0;
            }
            chamber = new Section.Chamber(variation,chamberDoorDirection);
            var chamberRotationStart = Random.int(3);
            for(var i = 0; i<chamberRotationStart; i++)
                chamber.rotateMapCounterClockwise();
            var entranceDoorLocations = chamber.getUnconnectedPotentialDoors().randomize();
            while(success == false && entranceDoorLocations.length > 0){
                var entranceDoor = entranceDoorLocations.pop();
                var chamberX = parentDoor.parent.x + parentDoor.x - entranceDoor.x;
                var chamberY = parentDoor.parent.y + parentDoor.y - entranceDoor.y;
                chamber.placeDoor(entranceDoor);
                self.map.refreshMap();
                success = self.map.addSection(chamber,chamberX, chamberY);
                if(success){
                    chamber.x = chamberX;
                    chamber.y = chamberY;
                    self.chamberQueue.push(chamber);
                }
                else{
                    chamber.removeDoor(entranceDoor);
                    console.log('door failed');
                }
            }
            if(!success){
                if(rotations==3)
                    console.log('chamber variation failed');
                else
                    console.log("chamber didn't fit, rotating.");
                rotations++;
                chamber.rotateMapCounterClockwise();
            }
        }
        if(!success)
            return false;
        return chamber;
    };

    self.updateView = function(){
        //FIXME - put this UI stuff someplace else.  Looks cool but way in the wrong place
        $('#map').html(self.map.renderAscii());
        //
    };

    self.tick = function(){
        if(self.chamberQueue.length > 0) {
            self.chamberQueue = self.chamberQueue.randomize();
            var chamber = self.chamberQueue.pop();
            self.genDoorsForChamber(chamber);
        }
        if(self.doorQueue.length > 0) {
            self.doorQueue = self.doorQueue.randomize();
            var door = self.doorQueue.pop();
            var genChamberSuccess = self.genChamberFromDoor(door);
            if(genChamberSuccess === false){
                door.parent.removeDoor(door);
                console.log("Couldn't fit chamber door, removing it.");
            }
        }
        self.updateView();
        if(self.generating===true && (self.chamberQueue.length > 0 || self.doorQueue.length > 0))
            setTimeout(self.tick, 100);
        else{
            //FIXME - clean up unconnected doors
        }
    };

    self.generateMap = function(x,y){
        self.map = new Map(x,y);
        self.chamberQueue = [];
        self.doorQueue = [];
        self.generating = true;

        var entrance = self.genEntrance(32, 32);
        if(!entrance)
            throw "Couldn't even find an Entrance!";
        self.updateView();

        self.tick();

        self.map.refreshMap();

        return self.map;
    };

    return self;
})();
