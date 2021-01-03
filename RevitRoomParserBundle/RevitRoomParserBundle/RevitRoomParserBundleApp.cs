using Autodesk.Revit.DB;
using DesignAutomationFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Svg;

namespace RevitRoomParserBundle
{
    [Autodesk.Revit.Attributes.Regeneration(Autodesk.Revit.Attributes.RegenerationOption.Manual)]
    [Autodesk.Revit.Attributes.Transaction(Autodesk.Revit.Attributes.TransactionMode.Manual)]
    public class RevitRoomParserBundleApp : IExternalDBApplication
    {
        public ExternalDBApplicationResult OnStartup(Autodesk.Revit.ApplicationServices.ControlledApplication app)
        {
            DesignAutomationBridge.DesignAutomationReadyEvent += HandleDesignAutomationReadyEvent;
            return ExternalDBApplicationResult.Succeeded;
        }

        public ExternalDBApplicationResult OnShutdown(Autodesk.Revit.ApplicationServices.ControlledApplication app)
        {
            return ExternalDBApplicationResult.Succeeded;
        }

        public void HandleDesignAutomationReadyEvent(object sender, DesignAutomationReadyEventArgs e)
        {
            e.Succeeded = true;
            ParseRooms(e.DesignAutomationData);
        }

        public static void ParseRooms(DesignAutomationData data)
        {
            LogTrace("Parsing the file for rooms...");

            Document doc = data.RevitDoc;


            List<Autodesk.Revit.DB.Architecture.Room> rooms = new FilteredElementCollector(doc)
                         .OfCategory(BuiltInCategory.OST_Rooms)
                         .WhereElementIsNotElementType()
                         .ToElements()
                         .Cast<Autodesk.Revit.DB.Architecture.Room>()
                         .ToList();

            List<string> roomNames = new List<string>();

            SvgDocument svgDoc = new SvgDocument
            {
                Width = 20,
                Height = 20,
                ViewBox = new SvgViewBox(-10, -10, 20, 20),
            };

            BoundingBox boundingBox = new BoundingBox();

            foreach (Autodesk.Revit.DB.Architecture.Room room in rooms)
            {
                if (room != null)
                {
                    roomNames.Add(room.Name);

                    SpatialElementBoundaryOptions opt = new SpatialElementBoundaryOptions();
                    opt.SpatialElementBoundaryLocation = SpatialElementBoundaryLocation.Finish;

                    IList<IList<Autodesk.Revit.DB.BoundarySegment>> boundarySegmentArray = room.GetBoundarySegments(opt);
                    if (null == boundarySegmentArray)  //the room may not be bound
                    {
                        continue;
                    }

                    foreach (IList<Autodesk.Revit.DB.BoundarySegment> boundarySegArr in boundarySegmentArray)
                    {
                        if (0 == boundarySegArr.Count)
                        {
                            continue;
                        }
                        else
                        {
                            foreach (Autodesk.Revit.DB.BoundarySegment boundarySegment in boundarySegArr)
                            {
                                //Check if the boundary is a room separation lines
                                Element boundaryElement = doc.GetElement(boundarySegment.ElementId);

                                if (boundaryElement == null) { continue; }

                                Categories categories = doc.Settings.Categories;
                                Category RoomSeparetionLineCat = categories.get_Item(BuiltInCategory.OST_RoomSeparationLines);

                                if (boundaryElement.Category.Id != RoomSeparetionLineCat.Id)
                                {

                                    Curve boundaryCurve = boundarySegment.GetCurve();

                                    if (boundaryCurve != null)
                                    {
                                        svgDoc.Children.Add(SvgConversion.ConvertCurve(boundaryCurve));
                                        boundingBox.UpdateBox(boundaryCurve.GetEndPoint(0));
                                        boundingBox.UpdateBox(boundaryCurve.GetEndPoint(1));
                                    }

                                }
                            }
                        }
                    }
                }
            }

            svgDoc.Width = new SvgUnit((float)boundingBox.GetWidth());
            svgDoc.Height = new SvgUnit((float)boundingBox.GetHeight());
            svgDoc.ViewBox = new SvgViewBox((float)boundingBox.minX, (float)boundingBox.minY, (float)boundingBox.GetWidth(), (float)boundingBox.GetHeight());



            string path = @".\rooms.svg";
            // File.WriteAllLines(path, roomNames.ToArray());

            svgDoc.Write(path);


            LogTrace("Rooms file saved in the working directory");


        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { System.Console.WriteLine(format, args); }
    }

    public class BoundingBox
    {
        public BoundingBox()
        {
            minX = 0;
            minY = 0;
            maxX = 0;
            maxY = 0;
            margin = 10;


        }
        public double minX { get; set; }
        public double maxX { get; set; }
        public double minY { get; set; }
        public double maxY { get; set; }
        public double margin { get; set; }

        public void UpdateBox(XYZ point)
        {
            if (minX > point.X)
            {
                minX = point.X - margin;
            }

            if(maxX < point.X)
            {
                maxX = point.X + margin;
            }

            if (minY > point.Y)
            {
                minY = point.Y - margin;
            }

            if(maxY < point.Y)
            {
                maxY = point.Y + margin;
            }
        }

        public double GetWidth()
        {
            return maxX - minX;
        }

        public double GetHeight()
        {
            return maxY - minY;
        }
    }
}
