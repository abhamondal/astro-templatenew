namespace CaveExplorer;

public enum PassageDifficulty
{
    Easy,
    Moderate,
    Difficult,
    Expert,
    Impassable
}

public class Passage
{
    public Chamber From { get; }
    public Chamber To { get; }
    public double LengthMeters { get; }
    public PassageDifficulty Difficulty { get; }
    public bool HasWater { get; set; }
    public double MinWidthMeters { get; set; } = 1.0;

    public Passage(Chamber from, Chamber to, double lengthMeters, PassageDifficulty difficulty)
    {
        From = from;
        To = to;
        LengthMeters = lengthMeters;
        Difficulty = difficulty;
    }

    public bool IsNavigable(double requiredWidthMeters) =>
        MinWidthMeters >= requiredWidthMeters && Difficulty != PassageDifficulty.Impassable;

    public override string ToString() =>
        $"Passage[{From.Name} -> {To.Name}, {LengthMeters}m, {Difficulty}]";
}
