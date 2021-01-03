using Autodesk.Revit.DB;
using DesignAutomationFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            foreach (Autodesk.Revit.DB.Architecture.Room room in rooms)
            {
                if (room != null)
                {
                    roomNames.Add(room.Name);
                }
            }

            string path = @".\rooms.csv";
            File.WriteAllLines(path, roomNames.ToArray());

            LogTrace("Rooms file saved in the working directory");


        }

        /// <summary>
        /// This will appear on the Design Automation output
        /// </summary>
        private static void LogTrace(string format, params object[] args) { System.Console.WriteLine(format, args); }
    }
}
