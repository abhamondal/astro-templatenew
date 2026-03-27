namespace CaveExplorer;

public class CaveSystem
{
    public string Name { get; }
    public double DepthMeters { get; }
    public List<Chamber> Chambers { get; } = new();
    public List<Passage> Passages { get; } = new();

    public CaveSystem(string name, double depthMeters)
    {
        Name = name;
        DepthMeters = depthMeters;
    }

    public void AddChamber(Chamber chamber)
    {
        Chambers.Add(chamber);
    }

    public void AddPassage(Chamber from, Chamber to, double lengthMeters, PassageDifficulty difficulty)
    {
        var passage = new Passage(from, to, lengthMeters, difficulty);
        Passages.Add(passage);
    }

    public double TotalPassageLength =>
        Passages.Sum(p => p.LengthMeters);

    public IEnumerable<Chamber> GetChambersByDepth() =>
        Chambers.OrderByDescending(c => c.DepthMeters);

    public override string ToString() =>
        $"CaveSystem[{Name}, {DepthMeters}m deep, {Chambers.Count} chambers]";
}
