package caves;

import java.util.ArrayList;
import java.util.List;

public class Chamber {
    private final String name;
    private final double widthMeters;
    private final double heightMeters;
    private final double lengthMeters;
    private final List<Formation> formations;

    public Chamber(String name, double widthMeters, double heightMeters, double lengthMeters) {
        this.name = name;
        this.widthMeters = widthMeters;
        this.heightMeters = heightMeters;
        this.lengthMeters = lengthMeters;
        this.formations = new ArrayList<>();
    }

    public void addFormation(Formation formation) {
        formations.add(formation);
    }

    public double getVolume() {
        return widthMeters * heightMeters * lengthMeters;
    }

    public String getName() {
        return name;
    }

    public double getWidthMeters() {
        return widthMeters;
    }

    public double getHeightMeters() {
        return heightMeters;
    }

    public double getLengthMeters() {
        return lengthMeters;
    }

    public List<Formation> getFormations() {
        return List.copyOf(formations);
    }

    @Override
    public String toString() {
        return String.format("Chamber[%s, %.1f x %.1f x %.1fm, formations=%d]",
                name, widthMeters, heightMeters, lengthMeters, formations.size());
    }
}
