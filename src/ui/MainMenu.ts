import { QUALITY, type QualityTier } from '../app/quality';

export interface PlanetChoice {
  id: string;
  name: string;
  subtitle: string;
  colors: { primary: string; water: string; accent: string };
  active: boolean;
}

export interface MainMenuInfo {
  hasSave: boolean;
  planetName: string;
  planetId: string;
  planets: PlanetChoice[];
  stageLabel: string;
  objects: number;
  tick: number;
  quality: QualityTier;
}

export interface MainMenuCallbacks {
  onContinue: () => void;
  onNew: () => void;
  onDna: () => void;
  onPlanet: (planetId: string) => void;
  onQuality: (tier: QualityTier) => void;
  onReplayTutorial: () => void;
  onClose: () => void;
}

const TIERS: QualityTier[] = ['low', 'medium', 'high'];

export class MainMenu {
  private readonly root = document.getElementById('main-menu')!;
  private readonly sheet = document.querySelector<HTMLElement>('.menu-sheet')!;
  private readonly orb = document.getElementById('menu-planet-orb')!;
  private readonly planetGrid = document.getElementById('planet-grid')!;
  private readonly planetCaption = document.getElementById('menu-planet-caption')!;
  private readonly continueButton = document.getElementById('menu-continue') as HTMLButtonElement;
  private readonly saveNote = document.getElementById('menu-save-note')!;
  private readonly qualityNote = document.getElementById('menu-quality-note')!;
  private readonly guideModal = document.getElementById('guide-modal')!;
  private readonly guideClose = document.getElementById('guide-close') as HTMLButtonElement;
  private readonly guideReplay = document.getElementById('guide-replay') as HTMLButtonElement;
  private readonly guideButton = document.getElementById('menu-guide') as HTMLButtonElement;
  private readonly qualityButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-quality]'),
  );

  constructor(private readonly callbacks: MainMenuCallbacks) {
    this.continueButton.addEventListener('click', () => this.callbacks.onContinue());
    document.getElementById('menu-new')!.addEventListener('click', () => this.callbacks.onNew());
    document.getElementById('menu-dna')!.addEventListener('click', () => this.callbacks.onDna());
    document.getElementById('menu-close')!.addEventListener('click', () => this.callbacks.onClose());
    this.guideButton.addEventListener('click', () => this.openGuide());
    this.guideClose.addEventListener('click', () => this.closeGuide());
    this.guideReplay.addEventListener('click', () => {
      this.closeGuide();
      this.callbacks.onReplayTutorial();
    });
    this.guideModal.addEventListener('click', (event) => {
      if (event.target === this.guideModal) this.closeGuide();
    });
    for (const button of this.qualityButtons) {
      button.addEventListener('click', () => this.callbacks.onQuality(button.dataset.quality as QualityTier));
    }
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      if (!this.guideModal.classList.contains('hidden')) this.closeGuide();
      else if (this.isOpen) this.callbacks.onClose();
    });
  }

  get isOpen(): boolean {
    return !this.root.classList.contains('hidden');
  }

  show(info: MainMenuInfo): void {
    this.update(info);
    this.root.classList.remove('hidden');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    this.continueButton.focus();
  }

  update(info: MainMenuInfo): void {
    this.continueButton.querySelector('.menu-action-title')!.textContent = info.hasSave ? 'Lanjutkan' : 'Mulai merakit';
    this.saveNote.textContent = info.hasSave
      ? `${info.planetName} · ${info.stageLabel} · ${info.objects} objek · tick ${info.tick}`
      : 'Belum ada planet tersimpan di perangkat ini.';
    this.renderPlanets(info.planets);
    this.setQuality(info.quality);
  }

  hide(): void {
    this.closeGuide();
    this.root.classList.add('hidden');
    this.root.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  setQuality(tier: QualityTier): void {
    this.qualityNote.textContent = QUALITY[tier].label;
    for (const button of this.qualityButtons) {
      const active = button.dataset.quality === tier;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    }
    if (!TIERS.includes(tier)) this.qualityNote.textContent = QUALITY.medium.label;
  }

  private renderPlanets(planets: PlanetChoice[]): void {
    this.planetGrid.replaceChildren();
    const active = planets.find((planet) => planet.active) ?? planets[0];
    for (const planet of planets) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `planet-chip${planet.active ? ' active' : ''}`;
      button.dataset.planet = planet.id;
      button.setAttribute('aria-pressed', String(planet.active));
      button.style.setProperty('--chip-primary', planet.colors.primary);
      button.style.setProperty('--chip-water', planet.colors.water);
      button.style.setProperty('--chip-accent', planet.colors.accent);
      const dot = document.createElement('span');
      dot.className = 'planet-dot';
      dot.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.textContent = planet.name;
      button.append(dot, label);
      button.addEventListener('click', () => this.callbacks.onPlanet(planet.id));
      this.planetGrid.append(button);
    }
    if (!active) return;
    this.planetCaption.textContent = `${active.name} · ${active.subtitle}`;
    for (const element of [this.sheet, this.orb]) {
      element.style.setProperty('--planet-primary', active.colors.primary);
      element.style.setProperty('--planet-water', active.colors.water);
      element.style.setProperty('--planet-accent', active.colors.accent);
    }
  }

  private openGuide(): void {
    this.guideModal.classList.remove('hidden');
    this.guideModal.setAttribute('aria-hidden', 'false');
    this.guideClose.focus();
  }

  private closeGuide(): void {
    if (this.guideModal.classList.contains('hidden')) return;
    this.guideModal.classList.add('hidden');
    this.guideModal.setAttribute('aria-hidden', 'true');
    if (this.isOpen) this.guideButton.focus();
  }
}
