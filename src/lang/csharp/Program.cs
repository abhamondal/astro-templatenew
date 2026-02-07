namespace CaveExplorer;

public class Program
{
    public static void Main(string[] args)
    {
        var cave = new CaveSystem("Lechuguilla Cave", 489.0);

        var entrance = new Chamber("Entrance Pit", 8, 50, 10, 0);
        var boulderFalls = new Chamber("Boulder Falls", 20, 15, 25, 60);
        var bigRoom = new Chamber("Big Room", 100, 30, 80, 200);
        var chandelier = new Chamber("Chandelier Ballroom", 40, 25, 35, 350);

        bigRoom.AddFormation(new GeologicalFormation(
            FormationType.Stalactite, MineralComposition.Calcite, 150, 10000));
        bigRoom.AddFormation(new GeologicalFormation(
            FormationType.Column, MineralComposition.Calcite, 500, 50000));

        chandelier.AddFormation(new GeologicalFormation(
            FormationType.SodaStraw, MineralComposition.Aragonite, 30, 2000));
        chandelier.AddFormation(new GeologicalFormation(
            FormationType.Helictite, MineralComposition.Aragonite, 12, 5000));
        chandelier.AddFormation(new GeologicalFormation(
            FormationType.CavePearl, MineralComposition.Calcite, 3, 800));

        cave.AddChamber(entrance);
        cave.AddChamber(boulderFalls);
        cave.AddChamber(bigRoom);
        cave.AddChamber(chandelier);

        cave.AddPassage(entrance, boulderFalls, 30, PassageDifficulty.Difficult);
        cave.AddPassage(boulderFalls, bigRoom, 150, PassageDifficulty.Moderate);
        cave.AddPassage(bigRoom, chandelier, 200, PassageDifficulty.Expert);

        Console.WriteLine(cave);
        Console.WriteLine($"Total passage length: {cave.TotalPassageLength}m");
        Console.WriteLine();

        Console.WriteLine("Chambers by depth:");
        foreach (var chamber in cave.GetChambersByDepth())
        {
            Console.WriteLine($"  {chamber}");
        }

        Console.WriteLine();
        Console.WriteLine("Formations in Chandelier Ballroom:");
        foreach (var formation in chandelier.Formations)
        {
            Console.WriteLine($"  {formation} [{formation.Classification}]");
            Console.WriteLine($"    Growth rate: {formation.GrowthRateCmPerYear:F6} cm/year");
        }
    }
}
