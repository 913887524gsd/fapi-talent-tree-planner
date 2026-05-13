const TALENT_TREE_DATA = {
  farmer: {
    small: ["atk", "conicon", "lck", "milk", "cal", "fry", "cexp", "hpt", "pexp"],
    medium: ["con+", "swp", "pro", "seed", "reinc", "sexp"],
    large: ["uniq"],
  },
  smasher: {
    small: ["hp", "str", "agi", "pcap", "renown", "leff", "prnk", "cexp", "fer"],
    medium: ["str+", "skp", "ir", "seed", "cpow", "sexp"],
    large: ["uniq"],
  },
  hoer: {
    small: ["atk", "conicon", "agi", "milk", "hpt", "lqty", "fer", "pcap", "renown"],
    medium: ["agi+", "cpow", "seed", "ir", "sexp", "reinc"],
    large: ["uniq"],
  },
  harvester: {
    small: ["hp", "str", "dex", "renown", "prnk", "lqty", "fer", "pcap", "fry"],
    medium: ["str+", "swp", "res", "seed", "sexp", "pro"],
    large: ["uniq"],
  },
  rancher: {
    small: ["atk", "conicon", "dex", "cal", "hpt", "milk", "lqty", "renown", "prnk"],
    medium: ["dex+", "reinc", "cpow", "seed", "sexp", "skp"],
    large: ["uniq"],
  },
  freeloader: {
    small: ["hp", "str", "lck", "cal", "leff", "fry", "lqty", "pexp", "cexp"],
    medium: ["lck+", "res", "ir", "seed", "pro", "sexp"],
    large: ["uniq"],
  },
};

const ADAPTIVE = "adaptive";
const STRICT = "strict";
const PRIORITY_MODES = [STRICT, ADAPTIVE];

const DEFAULT_PRIORITY_DATA = {
  farmer: {
    strict: {
      priorityOrder: ["uniq", "swp", "sexp", "reinc", "fry", "hpt", "milk", "pexp", "seed", "atk", "con+", "pro", "conicon", "lck", "cal", "cexp"],
      disabledPriorityIds: ["con+", "pro", "conicon", "lck", "cal", "cexp"],
    },
    adaptive: {
      priorityOrder: ["uniq", "swp", "sexp", "reinc", "fry", "hpt", "milk", "pexp", "seed", "atk", "con+", "pro", "conicon", "lck", "cal", "cexp"],
      disabledPriorityIds: ["con+", "pro", "conicon", "lck", "cal", "cexp"],
    },
  },
  smasher: {
    strict: {
      priorityOrder: ["uniq", "skp", "sexp", "seed", "pcap", "renown", "cexp", "str+", "prnk", "hp", "ir", "cpow", "str", "agi", "leff", "fer"],
      disabledPriorityIds: ["ir", "cpow", "str", "agi", "leff", "fer"],
    },
    adaptive: {
      priorityOrder: ["uniq", "skp", "sexp", "seed", "pcap", "renown", "cexp", "str+", "prnk", "hp", "ir", "cpow", "str", "agi", "leff", "fer"],
      disabledPriorityIds: ["ir", "cpow", "str", "agi", "leff", "fer"],
    },
  },
  hoer: {
    strict: {
      priorityOrder: ["uniq", "seed", "sexp", "reinc", "renown", "milk", "pcap", "cpow", "atk", "conicon", "agi+", "ir", "agi", "hpt", "lqty", "fer"],
      disabledPriorityIds: ["agi+", "ir", "agi", "hpt", "lqty", "fer"],
    },
    adaptive: {
      priorityOrder: ["uniq", "seed", "sexp", "reinc", "renown", "milk", "pcap", "cpow", "atk", "conicon", "agi+", "ir", "agi", "hpt", "lqty", "fer"],
      disabledPriorityIds: ["agi+", "ir", "agi", "hpt", "lqty", "fer"],
    },
  },
  harvester: {
    strict: {
      priorityOrder: ["uniq", "pro", "sexp", "seed", "renown", "pcap", "prnk", "res", "hp", "fry", "str+", "swp", "str", "dex", "lqty", "fer"],
      disabledPriorityIds: ["str+", "swp", "str", "dex", "lqty", "fer"],
    },
    adaptive: {
      priorityOrder: ["uniq", "pro", "sexp", "seed", "renown", "pcap", "prnk", "res", "hp", "fry", "str+", "swp", "str", "dex", "lqty", "fer"],
      disabledPriorityIds: ["str+", "swp", "str", "dex", "lqty", "fer"],
    },
  },
  rancher: {
    strict: {
      priorityOrder: ["uniq", "cpow", "sexp", "reinc", "renown", "milk", "prnk", "seed", "atk", "conicon", "dex+", "skp", "dex", "cal", "hpt", "lqty"],
      disabledPriorityIds: ["dex+", "skp", "dex", "cal", "hpt", "lqty"],
    },
    adaptive: {
      priorityOrder: ["uniq", "cpow", "sexp", "reinc", "renown", "milk", "prnk", "seed", "atk", "conicon", "dex+", "skp", "dex", "cal", "hpt", "lqty"],
      disabledPriorityIds: ["dex+", "skp", "dex", "cal", "hpt", "lqty"],
    },
  },
  freeloader: {
    strict: {
      priorityOrder: ["uniq", "ir", "sexp", "seed", "pexp", "cexp", "res", "cal", "hp", "str", "lck+", "pro", "lck", "leff", "fry", "lqty"],
      disabledPriorityIds: ["lck+", "pro", "lck", "leff", "fry", "lqty"],
    },
    adaptive: {
      priorityOrder: ["uniq", "ir", "sexp", "seed", "pexp", "cexp", "res", "cal", "hp", "str", "lck+", "pro", "lck", "leff", "fry", "lqty"],
      disabledPriorityIds: ["lck+", "pro", "lck", "leff", "fry", "lqty"],
    },
  },
};

const BRANCH_INDEXES = {
  small: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ],
  medium: [
    [0, 1],
    [2, 3],
    [4, 5],
  ],
};

const COOLDOWN = {
  small: 5,
  medium: 10,
  large: 20,
};

const I18N = {
  en: {
    title: "Talent Tree Planner",
    points: "Talent Points",
    language: "Language",
    languageAuto: "Auto",
    classSelector: "Class",
    currentStep: "Step",
    nextTalentsTitle: "Next 10 Talents",
    priorityTitle: "Priority",
    priorityModeStrict: "Strict",
    priorityModeAdaptive: "Adaptive",
    dragHintDesktop: "Drag icons on desktop to sort",
    doubleClickHint: "Double click to enable/disable",
    jumpToStep: "Jump to Step",
    prevStep: "Previous",
    nextStep: "Next",
    next10Steps: "Next 10",
    resetSim: "Reset",
    resetPriority: "Reset",
    moveLeft: "Move Left",
    moveRight: "Move Right",
    disableTalent: "Disable",
    enableTalent: "Enable",
    msgboxTitle: "Warning",
    criticalTalentMsg: "The new configuration is not viable for long-term simulation.",
    msgboxOk: "OK",
    stageTitlePrefix: "Talent Tree",
    class_farmer: "Farmer",
    class_smasher: "Smasher",
    class_hoer: "Hoer",
    class_harvester: "Harvester",
    class_rancher: "Rancher",
    class_freeloader: "Freeloader",
  },
  zh: {
    title: "天赋树规划器",
    points: "天赋点",
    language: "语言",
    languageAuto: "自动",
    classSelector: "职业",
    currentStep: "步骤",
    nextTalentsTitle: "接下来 10 个天赋",
    priorityTitle: "天赋优先级",
    priorityModeStrict: "精确分配",
    priorityModeAdaptive: "自动补全",
    dragHintDesktop: "电脑端可直接拖拽图标排序",
    doubleClickHint: "双击可启用/禁用天赋",
    jumpToStep: "跳转步数",
    prevStep: "上一步",
    nextStep: "下一步",
    next10Steps: "下十步",
    resetSim: "重置",
    resetPriority: "重置",
    moveLeft: "左移",
    moveRight: "右移",
    disableTalent: "禁用",
    enableTalent: "启用",
    msgboxTitle: "警告",
    criticalTalentMsg: "新配置无法支持长期模拟。",
    msgboxOk: "确定",
    stageTitlePrefix: "天赋树",
    class_farmer: "农夫",
    class_smasher: "粉碎者",
    class_hoer: "锄地者",
    class_harvester: "收割者",
    class_rancher: "牧场主",
    class_freeloader: "拾荒者",
  },
};

const STORAGE_KEY = "talent-tree-ui:v2026.05.13";
const MAX_TALENT_POINTS = 10000;
let debug = false;
const logger = {
  log: debug ? console.log.bind(console, "[DEBUG]:") : () => {}
};

const state = {
  localeChoice: "auto",
  locale: "en",
  selectedClass: "farmer",
  selectedPriorityId: null,
  priorityMode: ADAPTIVE,
  points: 12,
  currentStep: 0,
  plans: {},
  talentMeta: {},
};

const elements = {
  app: document.getElementById("app"),
  classSelector: document.getElementById("classSelector"),
  languageSelect: document.getElementById("languageSelect"),
  pointsInput: document.getElementById("pointsInput"),
  stageTitle: document.getElementById("stageTitle"),
  nextTalentsList: document.getElementById("nextTalentsList"),
  treeBoard: document.getElementById("treeBoard"),
  currentStepValue: document.getElementById("currentStepValue"),
  priorityList: document.getElementById("priorityList"),
  priorityEditor: document.getElementById("priorityEditor"),
  priorityModeSwitch: document.getElementById("priorityModeSwitch"),
  priorityModeButtons: document.querySelectorAll("[data-priority-mode]"),
  priorityToggleButton: document.getElementById("priorityToggleButton"),
  stepInput: document.getElementById("stepInput"),
  stepRange: document.getElementById("stepRange"),
  msgboxBackdrop: document.getElementById("msgboxBackdrop"),
  msgboxTitle: document.getElementById("msgboxTitle"),
  msgboxMessage: document.getElementById("msgboxMessage"),
  msgboxOkButton: document.getElementById("msgboxOkButton"),
};

function deepcopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function detectLocale() {
  return navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key) {
  return I18N[state.locale][key] ?? I18N.en[key] ?? key;
}

function classLabel(classId) {
  return t(`class_${classId}`);
}

function defaultPriorityConfig(classId = state.selectedClass, mode = state.priorityMode) {
  const priorityData = DEFAULT_PRIORITY_DATA[classId]?.[mode] ?? DEFAULT_PRIORITY_DATA[classId]?.adaptive;
  return {
    priorityOrder: [...priorityData.priorityOrder],
    disabledPriorityIds: [...priorityData.disabledPriorityIds],
  };
}

function activePriorityConfig() {
  const plan = activePlan();
  return plan.priorities[state.priorityMode];
}

function disabledPrioritySet(config = activePriorityConfig()) {
  return new Set(config.disabledPriorityIds ?? []);
}

class TalentMeta {
  constructor(priorityOrder = activePriorityConfig().priorityOrder) {
    this.priorityOrder = priorityOrder;
    this.currentStep = 0;
    this.order = [];

    this.reset();
  }

  reset() {
    const tree = TALENT_TREE_DATA[state.selectedClass];
    const count = this.order.reduce((acc, id) => (acc[id] = (acc[id] || 0) + 1, acc), {});

    this.currentStep = 0;
    ['small', 'medium', 'large'].forEach(tier => {
      tree[tier].forEach(id => {
        this[id] = {
          tier: tier, level: 0, cap: count[id] ?? 0, cooldown: 0,
          state: tier === "small" ? "ready" : "locked"
        };
      });
    });
  }

  loadOrder(order) {
    this.order = order;
    let currentStep = this.currentStep;
    this.reset();
    this.stepToTarget(currentStep);
  }

  calcPushOrder(selectId) {
    if (this.currentStep != this.order.length)
      logger.log("invalid step:", this.currentStep, this.order);
    this.order.push(selectId);
    this.nextStep();
  }

  isBetterOrder(otherMeta) {
    for (const id of this.priorityOrder) {
      if (!otherMeta[id]) logger.log("invalid id:", id);
      if (this[id].level > otherMeta[id].level) return true;
      if (this[id].level < otherMeta[id].level) return false;
    }
    return false;
  }

  calcGetActived(selectId) {
    return this[selectId].level > 0;
  }

  calcGetLocked(selectId) {
    return this[selectId].state === "locked";
  }

  calcGetReady(selectId) {
    return this[selectId].state === "ready" ||
           this[selectId].state === "locked";
  } 

  calcGetSerialized() {
    let obj = {};
    for (const id of this.priorityOrder) {
      obj[id] = {state: this[id].state, cooldown: this[id].cooldown};
    }
    const sortedKeys = Object.keys(obj).sort();
    const newObj = {};
    sortedKeys.forEach(key => {
      newObj[key] = obj[key];
    });
    return JSON.stringify(newObj);
  }

  checkState(currentSelectId) {
    const tree = TALENT_TREE_DATA[state.selectedClass];
    // check medium unlock state
    for (let i = 0; i < 3; i++) {
      let locked = false;
      for (const idx of BRANCH_INDEXES.small[i])
        locked |= (this[tree.small[idx]].level === 0);
      
      for (const idx of BRANCH_INDEXES.medium[i]) {
        let node = this[tree.medium[idx]];
        if (locked) node.state = "locked";
        else if (node.state === "locked") node.state = "ready";
      }
    }
    // check large unlock state
    let locked = false;
    for (let i = 0; i < 3; i++)
      for (const idx of BRANCH_INDEXES.medium[i])
        locked |= (this[tree.medium[idx]].level === 0);
    let node = this[tree.large[0]];
    if (locked) node.state = "locked";
    else if (node.state === "locked") node.state = "ready";
    // check active/cooling/ready state
    for (const id of this.priorityOrder) {
      let node = this[id];
      if (id === currentSelectId) node.state = "active";
      else if (node.cooldown > 0) node.state = "cooling";
      else if (node.state !== "locked") node.state = "ready";
    }
  }
  
  nextStep() {
    const currentSelectId = this.order[this.currentStep];
    if (!currentSelectId) logger.log("invalid next step");

    for (const id of this.priorityOrder) {
      let node = this[id];
      if (!node) logger.log("invalid id:", id);

      if (id === currentSelectId) {
        if (node.cooldown > 0) logger.log("invalid select:", id);
        else node.cooldown = COOLDOWN[node.tier], node.level++;
      } else {
        if (node.cooldown > 0) node.cooldown--;
      }
    }

    this.checkState(currentSelectId);
    this.currentStep++;
  }

  prevStep() {
    if (this.currentStep == 1) {
      this.reset();
      return;
    }
    const currentSelectId = this.order[this.currentStep - 2];
    const revertId = this.order[this.currentStep - 1];

    for (const id of this.priorityOrder) {
      let node = this[id];
      if (!node) logger.log("invalid id:", id);

      if (id === revertId) {
        if (node.cooldown != COOLDOWN[node.tier]) logger.log("invalid select:", id);
        else node.cooldown = 0, node.level--;
      } else {
        if (node.cooldown > 0) {
          node.cooldown++;
        } else {
          const prevSelectId = this.order[this.currentStep - COOLDOWN[node.tier] - 1];
          if (prevSelectId === id)
            node.cooldown++;
        }
      }
    }

    this.checkState(currentSelectId);
    this.currentStep--;
  }

  stepToTarget(targetStep) {
    targetStep = Math.min(Math.max(targetStep, 0), this.order.length);
    if (targetStep - 0 < Math.abs(targetStep - this.currentStep)) {
      this.reset();
      while (this.currentStep < targetStep)
        this.nextStep();
    } else {
      while (this.currentStep < targetStep)
        this.nextStep();
      while (this.currentStep > targetStep)
        this.prevStep();
    }
  }

  getNext10() {
    return this.order.slice(this.currentStep, this.currentStep + 10);
  }
}

class Calculator {
  constructor(priorityOrder, assignedPriorityOrder, disabledSet, steps = 0) {
    this.priorityOrder = deepcopy(priorityOrder);
    this.assignedPriorityOrder = deepcopy(assignedPriorityOrder);
    this.disabledSet = new Set(disabledSet);
    this.meta = new TalentMeta(this.priorityOrder);
    this.steps = steps;
  }
  
  findFirstId(ids) {
    for (const id of this.assignedPriorityOrder)
      if (ids.includes(id))
        return id;
  }
  
  unlockMedium(selectId) {
    const tree = TALENT_TREE_DATA[state.selectedClass];
    let branchIdx = 0;
    while (branchIdx < 3) {
      let ids = BRANCH_INDEXES.medium[branchIdx].map((idx) => tree.medium[idx]);
      if (ids.includes(selectId)) break;
      branchIdx++;
    }
    if (branchIdx == 3) logger.log("invalid id:", id);
    let ids = BRANCH_INDEXES.small[branchIdx]
              .map((idx) => tree.small[idx])
              .filter((id) => !this.meta.calcGetActived(id));
    if (ids.length == 0) {
      this.meta.calcPushOrder(selectId);
    } else {
      const id = this.findFirstId(ids);
      this.meta.calcPushOrder(id);
    }    
  }

  unlockLarge(selectId) {
    const tree = TALENT_TREE_DATA[state.selectedClass];
    let ids = [];
    for (const id of tree.medium)
      if (!this.meta.calcGetActived(id))
        ids.push(id);
    if (ids.length == 0) {
      this.meta.calcPushOrder(selectId);
    } else {
      const id = this.findFirstId(ids);
      if (this.meta.calcGetLocked(id))
        this.unlockMedium(id);
      else
        this.meta.calcPushOrder(id)
    }
  }

  step() {
    for (const id of this.assignedPriorityOrder) {
      if (this.disabledSet.has(id))
        continue;
      if (this.meta.calcGetReady(id)) {
        if (this.meta.calcGetLocked(id)) {
          if (this.meta[id].tier === "medium")
            this.unlockMedium(id);
          else if (this.meta[id].tier === "large")
            this.unlockLarge(id);
        } else {
          this.meta.calcPushOrder(id);
        }
        return true;
      }
    }
    return false;
  }

  calculate() {
    while (this.meta.order.length < this.steps) {
      logger.log(this.meta);
      if (!this.step())
        return null;
    }
    return this.meta;
  }

  validate() {
    let existed = new Set();
    while (true) {
      logger.log(this.meta);
      if (!this.step())
        return false;
      const serialized = this.meta.calcGetSerialized();
      if (existed.has(serialized))
        break;
      existed.add(serialized);
    }
    const storedLevel = {};
    ['small', 'medium', 'large'].forEach(tier => storedLevel[tier] = MAX_TALENT_POINTS);
    for (const id of this.priorityOrder) {
      const meta = this.meta[id];
      if (meta.level > storedLevel[meta.tier])
        return false;
      storedLevel[meta.tier] = meta.level;
    }
    return true;
  }
}

function readStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStorage() {
  const payload = {
    localeChoice: state.localeChoice,
    selectedClass: state.selectedClass,
    plans: state.plans,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function ensurePlan(classId) {
  if (!state.plans[classId]) {
    state.plans[classId] = {
      points: 12,
      priorityMode: ADAPTIVE,
      priorities: {
        strict: defaultPriorityConfig(classId, STRICT),
        adaptive: defaultPriorityConfig(classId, ADAPTIVE),
      },
      currentStep: 0,
    };
  }
  return state.plans[classId];
}

function activePlan() {
  return ensurePlan(state.selectedClass);
}

function savePlan() {
  const plan = activePlan();
  plan.points = state.points;
  plan.currentStep = state.currentStep;
  plan.priorityMode = state.priorityMode;
  writeStorage();
}

function loadInitialState() {
  const saved = readStorage();
  state.localeChoice = saved?.localeChoice ?? "auto";
  state.locale = state.localeChoice === "auto" ? detectLocale() : state.localeChoice;
  state.selectedClass = saved?.selectedClass && TALENT_TREE_DATA[saved.selectedClass] ? saved.selectedClass : "farmer";
  state.plans = saved?.plans ?? {};

  for (const classId of Object.keys(TALENT_TREE_DATA)) {
    const plan = ensurePlan(classId);

    if (!PRIORITY_MODES.includes(plan.priorityMode)) {
      plan.priorityMode = ADAPTIVE;
    }
    if (!plan.priorities || typeof plan.priorities !== "object") {
      plan.priorities = {}
      for (const mode of PRIORITY_MODES) {
        plan.priorities[mode] = defaultPriorityConfig(classId, mode);
      }
    }
  }

  applyPlanState();
}

function applyPlanState() {
  const plan = activePlan();
  state.points = Number.isFinite(plan.points) ? plan.points : 12;
  state.currentStep = Number.isFinite(plan.currentStep) ? plan.currentStep : 0;
  state.priorityMode = PRIORITY_MODES.includes(plan.priorityMode) ? plan.priorityMode : ADAPTIVE;
  state.talentMeta = new TalentMeta();
  state.selectedPriorityId = activePriorityConfig().priorityOrder[0] ?? null;
}

function renderTranslations() {
  document.documentElement.lang = state.locale;
  elements.languageSelect.value = state.localeChoice;
  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }
}

function renderClassSelector() {
  elements.classSelector.innerHTML = Object.keys(TALENT_TREE_DATA)
    .map(
      (classId) => `
        <button
          type="button"
          class="class-option ${classId === state.selectedClass ? "active" : ""}"
          data-class-id="${classId}"
        >
          <img src="./assets/${classId}.png" alt="${classLabel(classId)}" />
          <strong>${classLabel(classId)}</strong>
        </button>
      `
    )
    .join("");
}

function renderPriority() {
  const disabled = disabledPrioritySet();

  function priorityRowMarkup(talentId, index) {
    const isSelected = talentId === state.selectedPriorityId;
    const isDisabled = disabled.has(talentId);
    return `
      <button
        type="button"
        class="priority-row ${isSelected ? "selected" : ""} ${isDisabled ? "disabled" : ""}"
        data-talent-id="${talentId}"
        data-index="${index}"
        draggable="true"
      >
        <span class="priority-icon" aria-hidden="true">
          <img class="talent-base" src="./assets/base.png" alt="" />
          <img class="talent-icon" src="./assets/${talentId}.png" alt="" />
          <img class="priority-overlay" src="./assets/green.png" alt="" />
        </span>
        <span class="order-badge">${index + 1}</span>
        ${isDisabled ? `<span class="disabled-badge" aria-hidden="true">OFF</span>` : ""}
      </button>
    `;
  }
  const priorityConfig = activePriorityConfig();
  elements.priorityList.innerHTML = priorityConfig.priorityOrder.map(priorityRowMarkup).join("");
  const order = priorityConfig.priorityOrder;
  const selectedId = state.selectedPriorityId ?? order[0];
  const selectedDisabled = disabled.has(selectedId);
  elements.priorityToggleButton.textContent = selectedDisabled ? t("enableTalent") : t("disableTalent");

  elements.priorityModeSwitch.dataset.activeMode = state.priorityMode;
  for (const button of elements.priorityModeButtons) {
    const isActive = button.dataset.priorityMode === state.priorityMode;
    button.classList.toggle("active", isActive);
  }
}

function renderTalentStatus() {
  elements.currentStepValue.textContent = `${state.currentStep} / ${state.points}`;
  elements.stageTitle.textContent = `${t("stageTitlePrefix")} · ${classLabel(state.selectedClass)}`;
  elements.pointsInput.value = String(state.points);
  elements.stepInput.max = String(state.points);
  elements.stepRange.max = String(state.points);
  elements.stepInput.value = String(state.currentStep);
  elements.stepRange.value = String(state.currentStep);
}

function renderNextTalents(talentIds = []) {
  const nextIds = Array.isArray(talentIds) ? talentIds.slice(0, 10) : [];
  const talentMarkup = nextIds
    .map(
      (talentId, index) => `
        <div class="next-talent" data-talent-id="${talentId}">
          <span class="priority-icon" aria-hidden="true">
            <img class="talent-base" src="./assets/base.png" alt="" />
            <img class="talent-icon" src="./assets/${talentId}.png" alt="" />
            <img class="priority-overlay" src="./assets/green.png" alt="" />
          </span>
          <span class="order-badge">${index + 1}</span>
        </div>
      `
    )
    .join("");

  elements.nextTalentsList.innerHTML = talentMarkup;
}

function renderTree() {
  function talentCardMarkup(talentId, meta) {
    return `
      <div
        class="talent-card state-${meta.state}"
      >
        <span class="talent-visual">
          <img class="talent-base" src="./assets/base.png" alt="" aria-hidden="true" />
          <img class="talent-icon" src="./assets/${talentId}.png" alt="${talentId}" />
          <img class="talent-overlay overlay-green" src="./assets/green.png" alt="" aria-hidden="true" />
          <img class="talent-overlay overlay-red" src="./assets/red.png" alt="" aria-hidden="true" />
        </span>
        <span class="talent-count">${meta.level}/${meta.cap}</span>
      </div>
    `;
  }

  const tree = TALENT_TREE_DATA[state.selectedClass];
  const smallGroups = BRANCH_INDEXES.small.map((indexes) => indexes.map((index) => tree.small[index]));
  const mediumGroups = BRANCH_INDEXES.medium.map((indexes) => indexes.map((index) => tree.medium[index]));
  const branchClasses = ["branch-left", "branch-center", "branch-right"];

  const branchesMarkup = smallGroups
    .map(
      (smallGroup, branchIndex) => `
        <section class="branch ${branchClasses[branchIndex]}">
          <div class="branch-section small">
            <div class="node-row small">
              ${smallGroup.map((id) => talentCardMarkup(id, state.talentMeta[id])).join("")}
            </div>
          </div>
          <div class="branch-section medium">
            <div class="node-row medium">
              ${mediumGroups[branchIndex].map((id) => talentCardMarkup(id, state.talentMeta[id])).join("")}
            </div>
          </div>
        </section>
      `
    )
    .join("");

  const largeId = tree.large[0];
  elements.treeBoard.innerHTML = `
    <div class="tree-layout">
      <div class="tree-branches">
        ${branchesMarkup}
      </div>
      <div class="root-wrap">
        <div class="root-lane">${talentCardMarkup(largeId, state.talentMeta[largeId])}</div>
      </div>
    </div>
  `;
}

function renderAll() {
  renderTranslations();
  renderClassSelector();
  renderPriority();
  renderTalentStatus();
  renderNextTalents();
  renderTree();
}

function calculatePriority(priorityOrder, disabled) {
    let assignedPriorityOrder = deepcopy(priorityOrder);
    let bestMeta = new TalentMeta();
    let firstIdx = [-1, -1, -1], tierMap = {"small": 0, "medium": 1, "large": 2};
    for (let i = 0; i < assignedPriorityOrder.length; i++) {
      let tierIdx = tierMap[state.talentMeta[assignedPriorityOrder[i]].tier];
      if (firstIdx[tierIdx] == -1)
        firstIdx[tierIdx] = i;
    }
    let findBest = () => {
      let calculator = new Calculator(priorityOrder, assignedPriorityOrder, disabled, state.points);
      let newMeta = calculator.calculate() ?? bestMeta;
      if (newMeta.isBetterOrder(bestMeta))
        bestMeta = newMeta;
    };
    let swapFirstTier = (leftTier, rightTier) => {
      const leftIdx = firstIdx[leftTier];
      const rightIdx = firstIdx[rightTier];
      if (leftIdx === -1 || rightIdx === -1) {
        return false;
      }
      [assignedPriorityOrder[leftIdx], assignedPriorityOrder[rightIdx]]
      = [assignedPriorityOrder[rightIdx], assignedPriorityOrder[leftIdx]];
      return true;
    }
    const execute = {
      validSwap: true, 
      run(left, right) {
        if (this.validSwap) findBest();        
        this.validSwap = swapFirstTier(left, right);
        return this; 
      }
    };
    execute.run(0, 1).run(1, 2).run(0, 2)
            .run(0, 1).run(1, 2).run(0, 2);
    return bestMeta;
}

function validatePriority(priorityOrder, disabled) {
    let assignedPriorityOrder = deepcopy(priorityOrder);
    let firstIdx = [-1, -1, -1], tierMap = {"small": 0, "medium": 1, "large": 2};
    for (let i = 0; i < assignedPriorityOrder.length; i++) {
      let tierIdx = tierMap[state.talentMeta[assignedPriorityOrder[i]].tier];
      if (firstIdx[tierIdx] == -1)
        firstIdx[tierIdx] = i;
    }
    let isValid = () => {
      let calculator = new Calculator(priorityOrder, assignedPriorityOrder, disabled);
      return calculator.validate();
    };
    let swapFirstTier = (leftTier, rightTier) => {
      const leftIdx = firstIdx[leftTier];
      const rightIdx = firstIdx[rightTier];
      if (leftIdx === -1 || rightIdx === -1) {
        return false;
      }
      [assignedPriorityOrder[leftIdx], assignedPriorityOrder[rightIdx]]
      = [assignedPriorityOrder[rightIdx], assignedPriorityOrder[leftIdx]];
      return true;
    }
    const execute = {
      validPriority: false,
      validSwap: true, 
      run(left, right) {
        if (this.validSwap && !this.validPriority) 
          this.validPriority = isValid();        
        this.validSwap = swapFirstTier(left, right);
        return this; 
      }
    };
    execute.run(0, 1).run(1, 2).run(0, 2)
           .run(0, 1).run(1, 2).run(0, 2);
    return execute.validPriority;
  }

function emit(eventName, detail) {
  elements.app.dispatchEvent(new CustomEvent(eventName, { detail }));
}

function emitConfigChange(source) {
  emit("calculator:config-change", source);
}

function emitStepChange(source) {
  emit("calculator:step-change", source);
}

function bindTopbarControls() {
  elements.languageSelect.addEventListener("change", (event) => {
    const choice = event.target.value;
    state.localeChoice = choice;
    state.locale = choice === "auto" ? detectLocale() : choice;
    writeStorage();
    renderAll();
  });
}

function bindClassSelector() {
  elements.classSelector.addEventListener("click", (event) => {
    const button = event.target.closest("[data-class-id]");
    if (!button) {
      return;
    }
    const nextClass = button.dataset.classId;
    if (nextClass === state.selectedClass) {
      return;
    }
    state.selectedClass = nextClass;
    applyPlanState();
    writeStorage();
    renderAll();
    emitConfigChange("classSwitch");
  });
}

function bindPriority() {
  let lastToggledId = null;
  let lastSavedOrder = null;

  function checkAndRender(resetToggle = true) {
    const priorityConfig = activePriorityConfig();
    const order = priorityConfig.priorityOrder;
    const disabled = disabledPrioritySet();
    const enabledTalents = order.filter((id) => !disabled.has(id));
    const disabledTalents = order.filter((id) => disabled.has(id));
    priorityConfig.priorityOrder = [...enabledTalents, ...disabledTalents];
    if (resetToggle) {
      lastToggledId = null;
      lastSavedOrder = null;
    }
    renderPriority();
  }

  function reorderPriority(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
      return;
    }
    const priorityConfig = activePriorityConfig();
    const order = [...priorityConfig.priorityOrder];
    const [moved] = order.splice(fromIndex, 1);
    order.splice(toIndex, 0, moved);
    if (state.priorityMode === ADAPTIVE ||
        validatePriority(order, priorityConfig.disabledPriorityIds)) {
      priorityConfig.priorityOrder = order;
      state.selectedPriorityId = moved;
      savePlan();
      checkAndRender();
      emitConfigChange("priorityOrder");
    } else {
      showMsgbox();
    }
  }

  function buildPriorityPreviewOrder(order, fromIndex, nextIndex) {
    const previewOrder = [...order];
    const [moved] = previewOrder.splice(fromIndex, 1);
    nextIndex = Math.max(0, Math.min(nextIndex, previewOrder.length));
    previewOrder.splice(nextIndex, 0, moved);
    return { previewOrder, nextIndex };
  }

  function resolvePriorityPreviewIndex(clientX, draggedTalentId) {
    const allRows = [...elements.priorityList.querySelectorAll(".priority-row")];
    const draggedRow = allRows.find((row) => row.dataset.talentId === draggedTalentId);
    const rows = allRows
      .filter((row) => row.dataset.talentId !== draggedTalentId)
      .sort((leftRow, rightRow) => {
        const leftOrder = Number(leftRow.style.order || leftRow.dataset.index);
        const rightOrder = Number(rightRow.style.order || rightRow.dataset.index);
        return leftOrder - rightOrder;
      });

    let previewIndex = rows.length;
    for (let index = 0; index < rows.length; index++) {
      const rect = rows[index].getBoundingClientRect();
      if (clientX < rect.left + rect.width / 2) {
        previewIndex = index;
        break;
      }
    }

    const disabledStartIndex = rows.findIndex((row) => row.classList.contains("disabled"));
    const boundaryIndex = disabledStartIndex === -1 ? rows.length : disabledStartIndex;
    if (draggedRow.classList.contains("disabled")) {
      return Math.max(boundaryIndex, previewIndex);
    } else {
      return Math.min(boundaryIndex, previewIndex);
    }
  }

  function applyPriorityPreview(previewOrder, draggedTalentId) {
    const positionMap = new Map(previewOrder.map((talentId, index) => [talentId, index]));
    for (const row of elements.priorityList.querySelectorAll(".priority-row")) {
      row.style.order = String(positionMap.get(row.dataset.talentId) ?? 0);
      row.classList.toggle("dragging", row.dataset.talentId === draggedTalentId);
      const badge = row.querySelector(".order-badge");
      if (badge) {
        badge.textContent = String((positionMap.get(row.dataset.talentId) ?? 0) + 1);
      }
    }
  }

  function clearPriorityDragMarkers() {
    for (const row of elements.priorityList.querySelectorAll(".priority-row")) {
      row.classList.remove("dragging");
      row.style.order = "";
      const badge = row.querySelector(".order-badge");
      if (badge) {
        badge.textContent = String(Number(row.dataset.index) + 1);
      }
    }
  }

  function togglePriorityTalent(talentId) {
    const priorityConfig = activePriorityConfig();
    const order = priorityConfig.priorityOrder;
    const disabled = disabledPrioritySet();
    if (disabled.has(talentId)) {
      disabled.delete(talentId);
      if (lastToggledId === talentId) {
        priorityConfig.priorityOrder = lastSavedOrder;
      }
    } else if (order.includes(talentId)) {
      disabled.add(talentId);
      if (state.priorityMode === ADAPTIVE ||
          validatePriority(priorityConfig.priorityOrder, disabled)) {
        lastToggledId = talentId;
        lastSavedOrder = deepcopy(order);
      } else {
        disabled.delete(talentId);
        showMsgbox();
        return;
      }
    } else {
      logger.log("invalid id:", talentId);
      return;
    }
    priorityConfig.disabledPriorityIds = priorityConfig.priorityOrder.filter((id) => disabled.has(id));
    savePlan();
    checkAndRender(false);
    emitConfigChange("priorityToggle");
  }

  function resetPriorityOrder() {
    const priorityConfig = activePriorityConfig();
    const defaults = defaultPriorityConfig();
    priorityConfig.priorityOrder = defaults.priorityOrder;
    priorityConfig.disabledPriorityIds = defaults.disabledPriorityIds;
    state.selectedPriorityId = priorityConfig.priorityOrder[0] ?? null;
    savePlan();
    checkAndRender();
    emitConfigChange("priorityOrder");
  }

  let draggedIndex = null;
  let dragPreviewIndex = null;
  let lastClickTime = 0;
  const DOUBLE_CLICK_THRESHOLD = 350;

  elements.priorityList.addEventListener("click", (event) => {
      const button = event.target.closest("[data-talent-id]");
      if (!button) return;

      const currentTime = Date.now();
      const talentId = button.dataset.talentId;

      if (currentTime - lastClickTime < DOUBLE_CLICK_THRESHOLD) {
          togglePriorityTalent(talentId);
          lastClickTime = 0; 
      } else {
          state.selectedPriorityId = talentId;
          checkAndRender();
          lastClickTime = currentTime;
      }
  });

  elements.priorityList.addEventListener("dragstart", (event) => {
    const row = event.target.closest(".priority-row");
    if (!row) {
      return;
    }
    draggedIndex = Number(row.dataset.index);
    dragPreviewIndex = Number(row.dataset.index);
    row.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", row.dataset.talentId);
  });

  elements.priorityList.addEventListener("dragend", (event) => {
    clearPriorityDragMarkers();
    draggedIndex = null;
    dragPreviewIndex = null;
  });

  elements.priorityList.addEventListener("dragover", (event) => {
    if (draggedIndex === null) {
      return;
    }
    event.preventDefault();
    const draggedTalentId = activePriorityConfig().priorityOrder[draggedIndex];
    if (!draggedTalentId) {
      return;
    }
    const previewIndex = resolvePriorityPreviewIndex(event.clientX, draggedTalentId);
    if (dragPreviewIndex === previewIndex) {
      return;
    }

    dragPreviewIndex = previewIndex;
    const { previewOrder } = buildPriorityPreviewOrder(activePriorityConfig().priorityOrder, draggedIndex, previewIndex);
    applyPriorityPreview(previewOrder, draggedTalentId);
  });

  elements.priorityList.addEventListener("drop", (event) => {
    event.preventDefault();
    if (draggedIndex === null) {
      return;
    }
    const draggedTalentId = activePriorityConfig().priorityOrder[draggedIndex];
    const previewIndex = dragPreviewIndex ?? resolvePriorityPreviewIndex(event.clientX, draggedTalentId);
    const { nextIndex } = buildPriorityPreviewOrder(activePriorityConfig().priorityOrder, draggedIndex, previewIndex);

    clearPriorityDragMarkers();
    dragPreviewIndex = null;
    reorderPriority(draggedIndex, nextIndex);
  });

  elements.priorityEditor.addEventListener("click", (event) => {
    function moveTalent(talentId, targetFunc) {
      const order = activePriorityConfig().priorityOrder;
      const fromIndex = order.indexOf(talentId);
      const targetIndex = targetFunc(fromIndex);
      const clampedIndex = Math.max(0, Math.min(targetIndex, order.length - 1));
      if (fromIndex < 0) {
        return;
      }
      reorderPriority(fromIndex, clampedIndex);
    }

    const actionButton = event.target.closest("[data-priority-action]");
    if (!actionButton) {
      return;
    }
    const action = actionButton.dataset.priorityAction;
    if (action === "reset") {
      resetPriorityOrder();
      return;
    }

    const selectedId = state.selectedPriorityId ?? activePriorityConfig().priorityOrder[0];
    if (!selectedId) {
      return;
    }
    if (action === "left") {
      moveTalent(selectedId, (idx) => {return idx - 1;});
    } else if (action === "right") {
      moveTalent(selectedId, (idx) => {return idx + 1;});
    } else if (action === "toggle") {
      togglePriorityTalent(selectedId);
    }
  });

  for (const button of elements.priorityModeButtons) {
    button.addEventListener("click", () => {
      const nextMode = button.dataset.priorityMode;
      if (!PRIORITY_MODES.includes(nextMode) || nextMode === state.priorityMode) {
        return;
      }
      lastSavedOrder = null;
      lastToggledId = null;
      state.priorityMode = nextMode;
      activePlan().priorityMode = nextMode;
      state.selectedPriorityId = activePriorityConfig().priorityOrder[0] ?? null;
      savePlan();
      renderPriority();
      emitConfigChange("priorityMode");
    });
  }
}

function bindTalentPointControls() {
  elements.pointsInput.addEventListener("change", (event) => {
    const nextPoints = Math.min(Math.max(Number(event.target.value) || 0, 0), MAX_TALENT_POINTS);
    state.points = nextPoints;
    state.currentStep = Math.min(state.currentStep, state.points);
		savePlan();
    renderTalentStatus();
    emitConfigChange("points");
  });
}

function bindSimulationControls() {
  function syncStep(nextStep) {
    state.currentStep = Math.max(0, Math.min(nextStep, state.points));
		savePlan();
    renderTalentStatus();
  }

  elements.stepInput.addEventListener("change", (event) => {
    syncStep(Number(event.target.value) || 0);
    emitStepChange("input");
  });

  elements.stepRange.addEventListener("input", (event) => {
    syncStep(Number(event.target.value) || 0);
    emitStepChange("range");
  });

  document.querySelector(".control-actions").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const action = button.dataset.action;
    if (action === "prev") {
      syncStep(state.currentStep - 1);
      emitStepChange("prev");
    } else if (action === "next") {
      syncStep(state.currentStep + 1);
      emitStepChange("next");
    } else if (action === "next10") {
      syncStep(state.currentStep + 10);
      emitStepChange("next10");
    } else if (action === "reset") {
      syncStep(0);
      emitStepChange("reset");
    }
  });
}

function showMsgbox() {
  const title = t("msgboxTitle");
  const message = t("criticalTalentMsg");

  elements.msgboxTitle.textContent = title;
  elements.msgboxMessage.textContent = message;
  elements.msgboxBackdrop.hidden = false;
  elements.msgboxOkButton.focus();
}

function closeMsgbox() {
  elements.msgboxBackdrop.hidden = true;
}

function bindMsgbox() {
  elements.msgboxOkButton.addEventListener("click", closeMsgbox);
}

function bindControls() {
  bindTopbarControls();
  bindClassSelector();
  bindTalentPointControls();
  bindPriority();
  bindSimulationControls();
  bindMsgbox();
}

function installPublicApi() {
  elements.app.addEventListener("calculator:config-change", (event) => {
    logger.log("config change ->", event.detail, state.currentStep, "/", state.points);
    let priorityOrder = activePriorityConfig().priorityOrder;
    let disabled = new Set(disabledPrioritySet());
    if (state.priorityMode === ADAPTIVE) {
      for (const id of priorityOrder) {
        if (state.talentMeta[id].tier !== "small")
          continue;
        if (disabled.has(id))
          disabled.delete(id);
      }
    }
    let bestMeta = calculatePriority(priorityOrder, disabled);
    state.talentMeta.loadOrder(bestMeta.order);
    state.talentMeta.stepToTarget(state.currentStep);
    renderNextTalents(state.talentMeta.getNext10());
    renderTree();
  });
  elements.app.addEventListener("calculator:step-change", (event) => {
    logger.log("step change ->", event.detail, state.currentStep, "/", state.points);
    state.talentMeta.stepToTarget(state.currentStep);
    renderNextTalents(state.talentMeta.getNext10());
    renderTree();
  });
}

loadInitialState();
bindControls();
installPublicApi();
renderAll();
emitConfigChange("init");
