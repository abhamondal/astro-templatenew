package caves;

public class Formation {
    public enum Type {
        STALACTITE("Stalactite", "Hangs from the ceiling"),
        STALAGMITE("Stalagmite", "Grows from the floor"),
        COLUMN("Column", "Floor-to-ceiling formation"),
        FLOWSTONE("Flowstone", "Sheet-like calcite deposit"),
        SODA_STRAW("Soda Straw", "Thin hollow stalactite"),
        HELICTITE("Helictite", "Twisted branching formation"),
        CAVE_PEARL("Cave Pearl", "Rounded concretion in pools");

        private final String displayName;
        private final String description;

        Type(String displayName, String description) {
            this.displayName = displayName;
            this.description = description;
        }

        public String getDisplayName() {
            return displayName;
        }

        public String getDescription() {
            return description;
        }
    }

    private final Type type;
    private final double heightCm;
    private final int estimatedAgeYears;

    public Formation(Type type, double heightCm, int estimatedAgeYears) {
        this.type = type;
        this.heightCm = heightCm;
        this.estimatedAgeYears = estimatedAgeYears;
    }

    public Type getType() {
        return type;
    }

    public double getHeightCm() {
        return heightCm;
    }

    public int getEstimatedAgeYears() {
        return estimatedAgeYears;
    }

    @Override
    public String toString() {
        return String.format("%s[%.1fcm, ~%d years old]",
                type.getDisplayName(), heightCm, estimatedAgeYears);
    }
}
