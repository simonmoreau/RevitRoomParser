using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Svg;
using SVG = Svg;
using Svg.Pathing;
using Autodesk.Revit.DB;

namespace RevitRoomParserBundle
{
    static class SvgConversion
    {
        public static SvgVisualElement ConvertCurve(Curve curve)
        {
            SvgVisualElement svgVisualElement = null;
            if (curve is Arc)
            {
                svgVisualElement = ConvertArc((Arc)curve);
            }
            else if (curve is Line)
            {
                svgVisualElement = ConvertLine((Line)curve);
            }

            svgVisualElement.Stroke = new SvgColourServer(System.Drawing.Color.Black);
            svgVisualElement.StrokeWidth = new SvgUnit((float)0.2);
            svgVisualElement.Fill = SvgPaintServer.None;

            return svgVisualElement;

        }

        public static SvgVisualElement ConvertCurve(List<Curve> curves)
        {
            SvgVisualElement svgVisualElement = null;

            svgVisualElement = ConverPolyCurve(curves);

            svgVisualElement.Stroke = new SvgColourServer(System.Drawing.Color.Black);
            svgVisualElement.StrokeWidth = new SvgUnit((float)0.2);
            svgVisualElement.Fill = SvgPaintServer.None;

            return svgVisualElement;

        }

        private static SvgPath ConverPolyCurve(List<Curve> curves)
        {
            SvgPath svgPath = new SvgPath();

            SvgPathSegmentList svgPathSegmentList = new SvgPathSegmentList();
            svgPathSegmentList.Add(new SvgMoveToSegment(curves[0].GetEndPoint(0).ConvertToPointF()));

            foreach (Curve curve in curves)
            {
                if (curve is Arc)
                {
                    Arc arc = (Arc)curve;

                    XYZ a = arc.GetEndPoint(0) - arc.Center;
                    XYZ b = arc.GetEndPoint(1) - arc.Center;

                    double angleAboutAxis = a.AngleOnPlaneTo(b, arc.Normal);

                    SvgArcSweep svgArcSweep = SvgArcSweep.Positive;

                    if (angleAboutAxis >= 180) { svgArcSweep = SvgArcSweep.Negative; }

                    SvgArcSize svgArcSize = SvgArcSize.Small;

                    SvgArcSegment svgArcSegment = new SvgArcSegment(svgPathSegmentList.Last.End, (float)arc.Radius, (float)arc.Radius, (float)angleAboutAxis, svgArcSize, svgArcSweep, arc.GetEndPoint(1).ConvertToPointF());

                    svgPathSegmentList.Add(svgArcSegment);
                }
                else if (curve is Line)
                {
                    SvgLineSegment svgLineSegment = new SvgLineSegment(svgPathSegmentList.Last.End, ((Line)curve).GetEndPoint(1).ConvertToPointF());

                    svgPathSegmentList.Add(svgLineSegment);
                }
            }


            svgPath.PathData = svgPathSegmentList;

            return svgPath;
        }

        private static SvgPath ConvertArc(Arc arc)
        {

            SvgPath svgPath = new SvgPath();

            SvgPathSegmentList svgPathSegmentList = new SvgPathSegmentList();
            svgPathSegmentList.Add(new SvgMoveToSegment(arc.GetEndPoint(0).ConvertToPointF()));

            XYZ a = arc.GetEndPoint(0) - arc.Center;
            XYZ b = arc.GetEndPoint(1) - arc.Center;

            double angleAboutAxis = a.AngleOnPlaneTo(b, arc.Normal);


            SvgArcSweep svgArcSweep = SvgArcSweep.Positive;

            if (angleAboutAxis >= 180) { svgArcSweep = SvgArcSweep.Negative; }

            SvgArcSize svgArcSize = SvgArcSize.Small;

            SvgArcSegment svgArcSegment = new SvgArcSegment(svgPathSegmentList.Last.End, (float)arc.Radius, (float)arc.Radius, (float)angleAboutAxis, svgArcSize, svgArcSweep, arc.GetEndPoint(1).ConvertToPointF());

            svgPathSegmentList.Add(svgArcSegment);
            svgPath.PathData = svgPathSegmentList;

            return svgPath;

        }

        private static SvgPath ConvertLine(Line line)
        {

            SvgPath svgPath = new SvgPath();

            SvgPathSegmentList svgPathSegmentList = new SvgPathSegmentList();

            svgPathSegmentList.Add(new SvgMoveToSegment(line.GetEndPoint(0).ConvertToPointF()));

            SvgLineSegment svgLineSegment = new SvgLineSegment(svgPathSegmentList.Last.End, line.GetEndPoint(1).ConvertToPointF());

            svgPathSegmentList.Add(svgLineSegment);
            svgPath.PathData = svgPathSegmentList;


            return svgPath;

        }


        private static System.Drawing.PointF ConvertToPointF(this XYZ point)
        {
            System.Drawing.PointF pointF = new System.Drawing.PointF((float)point.X, -(float)point.Y);

            return pointF;
        }

    }
}
