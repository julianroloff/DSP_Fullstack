import ifcopenshell
import ifcopenshell.geom
import ifcopenshell.util.shape
import os

def render_ifc_with_pyvista(ifc_file_path, output_image_path):
    ifc_file = ifcopenshell.open(os.path.expanduser(ifc_file_path))
    element = ifc_file.by_type('IfcWall')[0]
    
    settings = ifcopenshell.geom.settings()
    settings.set(settings.USE_PYTHON_OPENCASCADE, True)

    try:
        shape = geom.create_shape(settings, element)
        geometry = shape.geometry # see #1124
        # These are methods of the TopoDS_Shape class from pythonOCC
        shape_gpXYZ = geometry.Location().Transformation().TranslationPart()
        # These are methods of the gpXYZ class from pythonOCC
        print(shape_gpXYZ.X(), shape_gpXYZ.Y(), shape_gpXYZ.Z())
    except:
        print("Shape creation failed")
    


        

    # Example usage
    if __name__ == "__main__":
        # Replace these paths with your actual file locations
        ifc_file_path = "~/Desktop/Ifc4_SampleHouse.ifc"  # Path to your IFC file
        output_image_path = "~/Desktop/Ifc4_SampleHouse_3D.jpg"  # Path to save the output image

        render_ifc_with_pyvista(ifc_file_path, output_image_path)
