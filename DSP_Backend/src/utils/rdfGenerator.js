export const generateRdf = ({ windows, walls, frames, doors }) => {
    let rdfData = `
        @prefix ex: <http://example.org/> .
        @prefix ifc: <http://ifcowl.openbimstandards.org/IFC2X3_TC1#> .
    `;

    // Add windows
    windows.forEach((window, index) => {
        rdfData += `
            ex:Window${index} a ifc:IFCWindow ;
                ex:hasName "${window.Name}" ;
                ex:hasID "${window.GlobalId}" .
        `;
    });

    // Add walls
    walls.forEach((wall, index) => {
        rdfData += `
            ex:Wall${index} a ifc:IFCWall ;
                ex:hasName "${wall.Name}" ;
                ex:hasID "${wall.GlobalId}" .
        `;
    });

    // Add frames
    frames.forEach((frame, index) => {
        rdfData += `
            ex:Frame${index} a ifc:IFCFurnishingElement ;
                ex:hasName "${frame.Name}" ;
                ex:hasID "${frame.GlobalId}" .
        `;
    });

    // Add doors
    doors.forEach((door, index) => {
        rdfData += `
            ex:Door${index} a ifc:IFCDoor ;
                ex:hasName "${door.Name}" ;
                ex:hasID "${door.GlobalId}" .
        `;
    });

    return rdfData;
};