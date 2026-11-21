import { QUALITY, type QualityTier } from '../app/quality';

export interface MainMenuInfo {
  hasSave: boolean;
  planetName: string;
  stageLabel: string;
  objects: number;
  tick: number;
  quality: QualityTier;
}

export interface MainMenuCallbacks {
  onContinue: () => void;
  onNew: () => void;
  onDna: () => void;
  onQuality: (tier: QualityTier) => void;
  onClose: () => void;
}

const TIERS: QualityTier[] = ['low', 'medium', 'high'];

export class MainMenu {
  private readonly root = document.getElementById('main-menu')!;
  private readonly continueButton = document.getElementById('menu-continue') as HTMLButtonElement;
  private readonly saveNote = document.getElementById('menu-save-note')!;
  private readonly qualityNote = document.getElementById('menu-quality-note')!;
  private readonly qualityButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>('[data-quality]'),
  );

  constructor(private readonly callbacks: MainMenuCallbacks) {
    this.continueButton.addEventListener('click', () => this.callbacks.onContinue());
    document.getElementById('menu-new')!.addEventListener('click', () => this.callbacks.onNew());
    document.getElementById('menu-dna')!.addEventListener('click', () => this.callbacks.onDna());
    document.getElementById('menu-close')!.addEventListener('click', () => this.callbacks.onClose());
    for (const button of this.qualityButtons) {
      button.addEventListener('click', () => this.callbacks.onQuality(button.dataset.quality as QualityTier));
    }
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen) this.callbacks.onClose();
    });
  }

  get isOpen(): boolean {
    return !this.root.classList.contains('hidden');
  }

  show(info: MainMenuInfo): void {
    this.continueButton.querySelector('.menu-action-title')!.textContent = info.hasSave ? 'Lanjutkan' : 'Mulai merakit';
    this.saveNote.textContent = info.hasSave
      ? `${info.planetName} · ${info.stageLabel} · ${info.objects} objek · tick ${info.tick}`
      : 'Belum ada planet tersimpan di perangkat ini.';
    this.setQuality(info.quality);
    this.root.classList.remove('hidden');
    this.root.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
    this.continueButton.focus();
  }

  hide(): void {
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
}
