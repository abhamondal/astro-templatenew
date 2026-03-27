namespace CaveExplorer;

public enum FormationType
{
    Stalactite,
    Stalagmite,
    Column,
    Flowstone,
    SodaStraw,
    Helictite,
    CavePearl,
    Drapery,
    Rimstone
}

public enum MineralComposition
{
    Calcite,
    Aragonite,
    Gypsum,
    Dolomite,
    Quartz
}

public class GeologicalFormation
{
    public FormationType Type { get; }
    public MineralComposition Mineral { get; }
    public double HeightCm { get; }
    public int EstimatedAgeYears { get; }
    public bool IsActive { get; set; }

    public GeologicalFormation(
        FormationType type,
        MineralComposition mineral,
        double heightCm,
        int estimatedAgeYears,
        bool isActive = true)
    {
        Type = type;
        Mineral = mineral;
        HeightCm = heightCm;
        EstimatedAgeYears = estimatedAgeYears;
        IsActive = isActive;
    }

    public double GrowthRateCmPerYear =>
        EstimatedAgeYears > 0 ? HeightCm / EstimatedAgeYears : 0;

    public string Classification => Type switch
    {
        FormationType.Stalactite or FormationType.SodaStraw or FormationType.Drapery
            => "Ceiling Formation",
        FormationType.Stalagmite or FormationType.Rimstone
            => "Floor Formation",
        FormationType.Column
            => "Floor-to-Ceiling Formation",
        FormationType.Flowstone
            => "Wall/Floor Coating",
        FormationType.CavePearl
            => "Pool Formation",
        FormationType.Helictite
            => "Eccentric Formation",
        _ => "Unknown"
    };

    public override string ToString() =>
        $"{Type}[{Mineral}, {HeightCm}cm, ~{EstimatedAgeYears}yrs, {(IsActive ? "active" : "inactive")}]";
}
