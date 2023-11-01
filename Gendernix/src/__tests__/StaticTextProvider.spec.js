import { StaticTextProvider } from "../lib/StaticTextProvider";
import { describe, it, expect } from 'vitest'

describe('test the static text provider', ()=>{
    //Test if there are 3 ids known to the statictextprovider
    it('test the id list', ()=>{
        const stp = new StaticTextProvider();
        expect(stp.textIds.length).toBe(3);
    });

    //Test if the title is retunred correctly
    it('test get title', ()=>{
        const stp = new StaticTextProvider();
        expect(stp.getTitle('coffeemachine')).toBe("Kaffeemaschiene");
    })

    //Test if get text works as intended
    it('text get text, incl. length', ()=>{
        const stp = new StaticTextProvider();
        expect(stp.getText('coffeemachine', 100).length).toBe(100);
        expect(stp.getText('coffeemachine').length).toBeGreaterThan(100);
    })
})