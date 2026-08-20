import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import {
  Badge,
  Button,
  Chip,
  DayPill,
  Divider,
  Input,
  ListRow,
  MetricTile,
  ProgressBar,
  ProgressRing,
  Screen,
  SectionChip,
  Spacer,
  StatRow,
  StatusCard,
  SurfaceCard,
  Text,
  WorkoutCard,
} from "@/components";
import { colors, primary, neutral, error } from "@/lib/tokens/colors";
import { spacing } from "@/lib/tokens/spacing";
import { radius } from "@/lib/tokens/radius";

function HeaderSection() {
  return (
    <View className="gap-s-8">
      <SectionChip label="Design System" />
      <Text variant="headline-1">System UI</Text>
      <Text variant="body-1" muted>
        Terminal-inspired HUD — sharp corners, segmented progress, white primary actions.
      </Text>
    </View>
  );
}

function ColorPrimitivesSection() {
  const primarySwatches = Object.entries(primary).map(([weight, hex]) => ({
    weight,
    hex,
  }));
  const neutralSwatches = Object.entries(neutral).map(([weight, hex]) => ({
    weight,
    hex,
  }));

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Color primitives</Text>
      <Text variant="title">Primary (System blue)</Text>
      <View className="flex-row flex-wrap gap-s-8">
        {primarySwatches.map((swatch) => (
          <View key={swatch.weight} className="items-center gap-s-4">
            <View
              className="h-14 w-14 rounded-r-8"
              style={{ backgroundColor: swatch.hex }}
            />
            <Text variant="caption" muted>
              {swatch.weight}
            </Text>
          </View>
        ))}
      </View>
      <Text variant="title">Neutral</Text>
      <View className="flex-row flex-wrap gap-s-8">
        {neutralSwatches.map((swatch) => (
          <View key={swatch.weight} className="items-center gap-s-4">
            <View
              className="h-14 w-14 rounded-r-8 border border-border-subtle"
              style={{ backgroundColor: swatch.hex }}
            />
            <Text variant="caption" muted>
              {swatch.weight}
            </Text>
          </View>
        ))}
      </View>
      <View className="flex-row gap-s-24">
        <View className="items-center gap-s-4">
          <View className="h-14 w-14 rounded-r-8 bg-error-500" />
          <Text variant="caption" muted>
            error-500
          </Text>
        </View>
        <View className="items-center gap-s-4">
          <View className="h-14 w-14 rounded-r-8 bg-error-800" />
          <Text variant="caption" muted>
            error-800
          </Text>
        </View>
      </View>
    </View>
  );
}

function SemanticTokensSection() {
  const rows = [
    { token: "button/active/bg", color: colors.semantic.button.active.bg },
    { token: "button/active/text", color: colors.semantic.button.active.text },
    { token: "button/stroke/border", color: colors.semantic.button.stroke.border },
    { token: "card/bg", color: colors.semantic.card.bg },
    { token: "input/focus/border", color: colors.semantic.input.focusBorder },
    { token: "progress/fill", color: colors.semantic.progress.fill },
    { token: "status/completed", color: colors.semantic.status.completed },
    { token: "status/missed", color: colors.semantic.status.missed },
  ];

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Semantic tokens</Text>
      <SurfaceCard>
        {rows.map((row) => (
          <View key={row.token} className="flex-row items-center justify-between py-s-8">
            <Text variant="body-2" muted>
              {row.token}
            </Text>
            <View className="flex-row items-center gap-s-8">
              <View
                className="h-6 w-6 rounded-r-8"
                style={{ backgroundColor: row.color }}
              />
              <Text variant="body-2">{row.color}</Text>
            </View>
          </View>
        ))}
      </SurfaceCard>
    </View>
  );
}

function TypographySection() {
  const samples: Array<{
    variant: "headline-1" | "headline-2" | "title" | "body-1" | "body-2" | "caption" | "metric";
    text: string;
  }> = [
    { variant: "headline-1", text: "Hunter dashboard" },
    { variant: "headline-2", text: "Training protocol" },
    { variant: "title", text: "Full body blast" },
    { variant: "body-1", text: "Quest complete. XP allocated." },
    { variant: "body-2", text: "45 min · Intermediate" },
    { variant: "caption", text: "Section label" },
    { variant: "metric", text: "12,450" },
  ];

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Typography</Text>
      {samples.map((sample) => (
        <View key={sample.variant} className="gap-s-4">
          <Text variant="body-2" muted>
            {sample.variant}
          </Text>
          <Text variant={sample.variant}>{sample.text}</Text>
        </View>
      ))}
    </View>
  );
}

function SpacingRadiusSection() {
  const spacingKeys = Object.keys(spacing) as Array<keyof typeof spacing>;
  const radiusKeys = Object.keys(radius) as Array<keyof typeof radius>;

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Spacing & radius</Text>
      <View className="gap-s-8">
        {spacingKeys.map((key) => (
          <View key={key} className="flex-row items-center gap-s-12">
            <View className="h-4 bg-primary-500" style={{ width: spacing[key] }} />
            <Text variant="body-2" muted>
              {key} — {spacing[key]}px
            </Text>
          </View>
        ))}
      </View>
      <View className="flex-row flex-wrap gap-s-12">
        {radiusKeys.map((key) => (
          <View
            key={key}
            className="h-16 w-16 items-center justify-center bg-surface-raised"
            style={{ borderRadius: radius[key] === 9999 ? 9999 : radius[key] }}
          >
            <Text variant="caption" muted>
              {key}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ButtonsSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Buttons</Text>
      <Button variant="active" fullWidth>
        Begin training
      </Button>
      <Button variant="stroke" fullWidth>
        View stats
      </Button>
      <Button variant="disabled" fullWidth>
        Locked
      </Button>
      <Button variant="error" fullWidth>
        Abandon quest
      </Button>
    </View>
  );
}

function InputsSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Inputs</Text>
      <Input label="Hunter name" placeholder="Enter name" />
      <Input label="Email" placeholder="hunter@system.io" />
      <Input label="Password" placeholder="••••••••" secureTextEntry error="Invalid credentials" />
    </View>
  );
}

function ChipsSection() {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Chips & day pills</Text>
      <View className="flex-row flex-wrap gap-s-8">
        <Chip label="All" active />
        <Chip label="Strength" />
        <Chip label="Cardio" />
        <Chip label="Mobility" />
      </View>
      <View className="flex-row justify-between">
        {days.map((day, index) => (
          <DayPill key={day} label={day} selected={index === 2} />
        ))}
      </View>
    </View>
  );
}

function SurfaceCardsSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Surface cards</Text>
      <SurfaceCard chipLabel="Daily quest">
        <Text variant="body-1">Complete 3 training sessions.</Text>
        <Spacer size="s-12" />
        <Text variant="body-2" muted>
          Reward: 450 XP across STR and VIT.
        </Text>
      </SurfaceCard>
    </View>
  );
}

function ListWorkoutSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">List rows & workout cards</Text>
      <ListRow
        title="Push-up protocol"
        subtitle="Chest · 20 min"
        thumbnail={
          <View className="h-14 w-14 items-center justify-center rounded-r-4 border border-border-subtle bg-canvas">
            <Text variant="caption" muted>
              STR
            </Text>
          </View>
        }
        trailing={
          <Text variant="body-2" muted>
            ›
          </Text>
        }
      />
      <WorkoutCard
        title="Leg endurance circuit"
        subtitle="VIT · 35 min"
        duration="35 min"
        calories="280"
      />
    </View>
  );
}

function StatusCardsSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Status cards</Text>
      <View className="flex-row justify-between">
        <StatusCard state="completed" label="Completed" />
        <StatusCard state="missed" label="Missed" />
        <StatusCard state="waiting" label="Waiting" />
      </View>
    </View>
  );
}

function ProgressSection() {
  const values = [25, 60, 100];

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Progress</Text>
      {values.map((value) => (
        <View key={value} className="gap-s-8">
          <Text variant="body-2" muted>
            Linear {value}%
          </Text>
          <ProgressBar value={value} />
        </View>
      ))}
      <View className="flex-row justify-around">
        {values.map((value) => (
          <ProgressRing key={value} value={value} size={96} />
        ))}
      </View>
    </View>
  );
}

function MetricsSection() {
  const stats = [
    { label: "STR", value: 12 },
    { label: "VIT", value: 10 },
    { label: "AGI", value: 14 },
    { label: "INT", value: 11 },
    { label: "SENSE", value: 9 },
  ];

  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Metrics & stats</Text>
      <View className="flex-row gap-s-12">
        <MetricTile label="Kcal" value="1,400" />
        <MetricTile label="Duration" value="45m" />
      </View>
      <SurfaceCard chipLabel="Hunter stats">
        {stats.map((stat) => (
          <StatRow key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </SurfaceCard>
      <View className="flex-row flex-wrap gap-s-8">
        {["E", "D", "C", "B", "A", "S"].map((rank) => (
          <Badge key={rank} label={rank} dot />
        ))}
      </View>
    </View>
  );
}

function CompositionSection() {
  return (
    <View className="gap-s-24">
      <Text variant="headline-2">Composition</Text>
      <SurfaceCard chipLabel="Hunter status">
        <Text variant="headline-2">Rank E</Text>
        <Spacer size="s-8" />
        <Text variant="body-2" muted>
          Daily task completion
        </Text>
        <Spacer size="s-12" />
        <View className="items-center">
          <ProgressRing value={60} size={112} />
        </View>
        <Spacer size="s-16" />
        <StatRow label="STR" value={12} />
        <StatRow label="VIT" value={10} />
        <Divider inset />
        <Spacer size="s-12" />
        <Button variant="active" fullWidth>
          Begin training
        </Button>
      </SurfaceCard>
    </View>
  );
}

export default function DesignSystemScreen() {
  const router = useRouter();

  return (
    <Screen>
      <ScrollView className="flex-1" contentContainerClassName="gap-s-40 pb-s-40">
        <Button variant="stroke" onPress={() => router.back()}>
          Back to home
        </Button>
        <HeaderSection />
        <ColorPrimitivesSection />
        <SemanticTokensSection />
        <TypographySection />
        <SpacingRadiusSection />
        <ButtonsSection />
        <InputsSection />
        <ChipsSection />
        <SurfaceCardsSection />
        <ListWorkoutSection />
        <StatusCardsSection />
        <ProgressSection />
        <MetricsSection />
        <CompositionSection />
      </ScrollView>
    </Screen>
  );
}
