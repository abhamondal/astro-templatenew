package caves;

public class Passage {
    private final String name;
    private final Chamber from;
    private final Chamber to;
    private final double lengthMeters;
    private final double widthMeters;
    private final Difficulty difficulty;

    public enum Difficulty {
        EASY, MODERATE, DIFFICULT, EXPERT
    }

    public Passage(String name, Chamber from, Chamber to,
                   double lengthMeters, double widthMeters, Difficulty difficulty) {
        this.name = name;
        this.from = from;
        this.to = to;
        this.lengthMeters = lengthMeters;
        this.widthMeters = widthMeters;
        this.difficulty = difficulty;
    }

    public boolean isNavigable(double minWidthMeters) {
        return widthMeters >= minWidthMeters;
    }

    public String getName() {
        return name;
    }

    public Chamber getFrom() {
        return from;
    }

    public Chamber getTo() {
        return to;
    }

    public double getLengthMeters() {
        return lengthMeters;
    }

    public double getWidthMeters() {
        return widthMeters;
    }

    public Difficulty getDifficulty() {
        return difficulty;
    }

    @Override
    public String toString() {
        return String.format("Passage[%s: %s -> %s, %.1fm, %s]",
                name, from.getName(), to.getName(), lengthMeters, difficulty);
    }
}
