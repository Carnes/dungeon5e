describe('Tiles', function(){
    describe('door',function(){
        it('renders',function(){
            var door = new Tile.Door();
            expect(door.render()).toBe('X');
        });
    });
    describe('entrance',function(){
        it('renders',function(){
            var door = new Tile.Entrance();
            expect(door.render()).toBe('@');
        });
    });
    describe('floor',function(){
        it('renders',function(){
            var door = new Tile.Floor();
            expect(door.render()).toBe(' ');
        });
    });
    describe('wall',function(){
        it('renders',function(){
            var door = new Tile.Wall();
            expect(door.render()).toBe('#');
        });
    });
});
