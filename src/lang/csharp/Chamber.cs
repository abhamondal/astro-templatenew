namespace CaveExplorer;

public class Chamber
{
    public string Name { get; }
    public double WidthMeters { get; }
    public double HeightMeters { get; }
    public double LengthMeters { get; }
    public double DepthMeters { get; }
    public double Temperature { get; set; }
    public double Humidity { get; set; }
    public List<GeologicalFormation> Formations { get; } = new();

    public Chamber(string name, double width, double height, double length, double depth)
    {
        Name = name;
        WidthMeters = width;
        HeightMeters = height;
        LengthMeters = length;
        DepthMeters = depth;
        Temperature = 12.0; // Default cave temperature in Celsius
        Humidity = 95.0;    // Default cave humidity percentage
    }

    public double Volume => WidthMeters * HeightMeters * LengthMeters;

    public void AddFormation(GeologicalFormation formation)
    {
        Formations.Add(formation);
    }

    public IEnumerable<GeologicalFormation> GetFormationsByType(FormationType type) =>
        Formations.Where(f => f.Type == type);

    public override string ToString() =>
        $"Chamber[{Name}, {Volume:F1}m³, depth={DepthMeters}m, {Formations.Count} formations]";
}
