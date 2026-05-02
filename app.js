const TALENT_TREE_DATA = {
  farmer: {
    small: ["atk", "_con", "lck", "milk", "cal", "fry", "cexp", "hpt", "pexp"],
    medium: ["con+", "swp", "pro", "seed", "reinc", "sexp"],
    large: ["uniq"],
  },
  smasher: {
    small: ["hp", "str", "agi", "pcap", "renown", "leff", "prnk", "cexp", "fer"],
    medium: ["str+", "skp", "ir", "seed", "cpow", "sexp"],
    large: ["uniq"],
  },
  hoer: {
    small: ["atk", "_con", "agi", "milk", "hpt", "lqty", "fer", "pcap", "renown"],
    medium: ["agi+", "cpow", "seed", "ir", "sexp", "reinc"],
    large: ["uniq"],
  },
  harvester: {
    small: ["hp", "str", "dex", "renown", "prnk", "lqty", "fer", "pcap", "fry"],
    medium: ["str+", "swp", "res", "seed", "sexp", "pro"],
    large: ["uniq"],
  },
  rancher: {
    small: ["atk", "_con", "dex", "cal", "hpt", "milk", "lqty", "renown", "prnk"],
    medium: ["dex+", "reinc", "cpow", "seed", "sexp", "skp"],
    large: ["uniq"],
  },
  freeloader: {
    small: ["hp", "str", "lck", "cal", "leff", "fry", "lqty", "pexp", "cexp"],
    medium: ["lck+", "res", "ir", "seed", "pro", "sexp"],
    large: ["uniq"],
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
    priorityTitle: "Priority",
    dragHintDesktop: "Drag icons on desktop to sort",
    jumpToStep: "Jump to Step",
    prevStep: "Previous",
    nextStep: "Next",
    resetSim: "Reset",
    moveLeft: "Move Left",
    moveRight: "Move Right",
    targetPosition: "Position",
    applyPosition: "Apply",
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
    priorityTitle: "天赋优先级",
    dragHintDesktop: "电脑端可直接拖拽图标排序",
    jumpToStep: "跳转步数",
    prevStep: "上一步",
    nextStep: "下一步",
    resetSim: "重置",
    moveLeft: "左移",
    moveRight: "右移",
    targetPosition: "位置",
    applyPosition: "应用",
    stageTitlePrefix: "天赋树",
    class_farmer: "农夫",
    class_smasher: "粉碎者",
    class_hoer: "锄地者",
    class_harvester: "收割者",
    class_rancher: "牧场主",
    class_freeloader: "拾荒者",
  },
};

const STORAGE_KEY = "talent-tree-ui";
const MAX_TALENT_POINTS = 10000;
const debug = false;
const logger = {
  log: debug ? console.log.bind(console, "[DEBUG]:") : () => {}
};

const state = {
  localeChoice: "auto",
  locale: "en",
  selectedClass: "farmer",
  selectedPriorityId: null,
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
  treeBoard: document.getElementById("treeBoard"),
  currentStepValue: document.getElementById("currentStepValue"),
  priorityList: document.getElementById("priorityList"),
  priorityEditor: document.getElementById("priorityEditor"),
  priorityPositionInput: document.getElementById("priorityPositionInput"),
  stepInput: document.getElementById("stepInput"),
  stepRange: document.getElementById("stepRange"),
};

function detectLocale() {
  return navigator.language && navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function t(key) {
  return I18N[state.locale][key] ?? I18N.en[key] ?? key;
}

function classLabel(classId) {
  return t(`class_${classId}`);
}

function defaultPriorityOrder(classId) {
  const tree = TALENT_TREE_DATA[classId];
  return [...tree.large, ...tree.medium, ...tree.small];
}

class TalentMeta {
  constructor() {
    this.priorityOrder = activePlan().priorityOrder;
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

  calcPushOrder(selectId, steps) {
    if (this.currentStep != this.order.length)
      logger.log("invalid step:", this.currentStep, this.order);
    if (this.currentStep == steps)
      return false;
    this.order.push(selectId);
    this.nextStep();
    return true;
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
}

function defaultTalentMeta() {
  return new TalentMeta();
}

function ensurePlan(classId) {
  if (!state.plans[classId]) {
    state.plans[classId] = {
      points: 12,
      priorityOrder: defaultPriorityOrder(classId),
      currentStep: 0,
    };
  }
  return state.plans[classId];
}

function activePlan() {
  return ensurePlan(state.selectedClass);
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

function loadInitialState() {
  const saved = readStorage();
  state.localeChoice = saved?.localeChoice ?? "auto";
  state.locale = state.localeChoice === "auto" ? detectLocale() : state.localeChoice;
  state.selectedClass = saved?.selectedClass && TALENT_TREE_DATA[saved.selectedClass] ? saved.selectedClass : "farmer";
  state.plans = saved?.plans ?? {};

  for (const classId of Object.keys(TALENT_TREE_DATA)) {
    const plan = ensurePlan(classId);
    const validIds = new Set(defaultPriorityOrder(classId));
    plan.priorityOrder = plan.priorityOrder.filter((id) => validIds.has(id));
    for (const id of defaultPriorityOrder(classId)) {
      if (!plan.priorityOrder.includes(id)) {
        plan.priorityOrder.push(id);
      }
    }
  }

  applyPlanState();
}

function applyPlanState() {
  const plan = activePlan();
  state.points = Number.isFinite(plan.points) ? plan.points : 12;
  state.currentStep = Number.isFinite(plan.currentStep) ? plan.currentStep : 0;
  state.talentMeta = defaultTalentMeta();
  state.selectedPriorityId = plan.priorityOrder[0] ?? null;
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

function renderPriorityList() {
  function priorityRowMarkup(talentId, index) {
    const isSelected = talentId === state.selectedPriorityId;
    return `
      <button
        type="button"
        class="priority-row ${isSelected ? "selected" : ""}"
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
      </button>
    `;
  }
  elements.priorityList.innerHTML = activePlan().priorityOrder.map(priorityRowMarkup).join("");
  const order = activePlan().priorityOrder;
  const selectedId = state.selectedPriorityId ?? order[0];
  const selectedIndex = Math.max(order.indexOf(selectedId), 0);
  elements.priorityPositionInput.max = String(order.length);
  elements.priorityPositionInput.value = String(selectedIndex + 1);
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
  renderPriorityList();
  renderTalentStatus();
  renderTree();
}

function savePlan() {
  const plan = activePlan();
  plan.points = state.points;
  plan.currentStep = state.currentStep;
  writeStorage();
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

function bindPriorityList() {
  function reorderPriority(fromIndex, toIndex) {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) {
      return;
    }
    const order = [...activePlan().priorityOrder];
    const [moved] = order.splice(fromIndex, 1);
    order.splice(toIndex, 0, moved);
    activePlan().priorityOrder = order;
    state.selectedPriorityId = moved;
    savePlan();
    renderPriorityList();
    emitConfigChange("priorityOrder");
  }

  function buildPriorityPreviewOrder(order, fromIndex, nextIndex) {
    const previewOrder = [...order];
    const [moved] = previewOrder.splice(fromIndex, 1);
    nextIndex = Math.max(0, Math.min(nextIndex, previewOrder.length));
    previewOrder.splice(nextIndex, 0, moved);
    return { previewOrder, nextIndex };
  }

  function resolvePriorityPreviewIndex(clientX, draggedTalentId) {
    const rows = [...elements.priorityList.querySelectorAll(".priority-row")]
      .filter((row) => row.dataset.talentId !== draggedTalentId)
      .sort((leftRow, rightRow) => {
        const leftOrder = Number(leftRow.style.order || leftRow.dataset.index);
        const rightOrder = Number(rightRow.style.order || rightRow.dataset.index);
        return leftOrder - rightOrder;
      });

    for (let index = 0; index < rows.length; index += 1) {
      const rect = rows[index].getBoundingClientRect();
      if (clientX < rect.left + rect.width / 2) {
        return index;
      }
    }

    return rows.length;
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

  let draggedIndex = null;
  let dragPreviewIndex = null;

  elements.priorityList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-talent-id]");
    if (!button) {
      return;
    }
    state.selectedPriorityId = button.dataset.talentId;
    renderPriorityList();
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
    const draggedTalentId = activePlan().priorityOrder[draggedIndex];
    if (!draggedTalentId) {
      return;
    }
    const previewIndex = resolvePriorityPreviewIndex(event.clientX, draggedTalentId);
    if (dragPreviewIndex === previewIndex) {
      return;
    }

    dragPreviewIndex = previewIndex;
    const { previewOrder } = buildPriorityPreviewOrder(activePlan().priorityOrder, draggedIndex, previewIndex);
    applyPriorityPreview(previewOrder, draggedTalentId);
  });

  elements.priorityList.addEventListener("drop", (event) => {
    event.preventDefault();
    if (draggedIndex === null) {
      return;
    }
    const draggedTalentId = activePlan().priorityOrder[draggedIndex];
    const previewIndex = dragPreviewIndex ?? resolvePriorityPreviewIndex(event.clientX, draggedTalentId);
    const { nextIndex } = buildPriorityPreviewOrder(activePlan().priorityOrder, draggedIndex, previewIndex);

    clearPriorityDragMarkers();
    dragPreviewIndex = null;
    reorderPriority(draggedIndex, nextIndex);
  });

  elements.priorityEditor.addEventListener("click", (event) => {
    function moveTalent(talentId, targetFunc) {
      const order = activePlan().priorityOrder;
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
    const selectedId = state.selectedPriorityId ?? activePlan().priorityOrder[0];
    if (!selectedId) {
      return;
    }
    const action = actionButton.dataset.priorityAction;
    if (action === "left") {
      moveTalent(selectedId, (idx) => {return idx - 1;});
    } else if (action === "right") {
      moveTalent(selectedId, (idx) => {return idx + 1;});
    } else if (action === "apply") {
      const targetIndex = (Number(elements.priorityPositionInput.value) || 1) - 1;
      moveTalent(selectedId, (idx) => {return targetIndex;});
    }
  });
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
    } else if (action === "reset") {
      syncStep(0);
      emitStepChange("reset");
    }
  });
}

function bindControls() {
  bindTopbarControls();
  bindClassSelector();
  bindTalentPointControls();
  bindPriorityList();
  bindSimulationControls();
}

class Calculator {
  constructor(priorityOrder, steps) {
    this.priorityOrder = JSON.parse(JSON.stringify(priorityOrder));
    this.meta = new TalentMeta();
    this.steps = steps;
  }
  
  findFirstId(ids) {
    for (const id of this.priorityOrder)
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
      this.meta.calcPushOrder(selectId, this.steps);
    } else {
      const id = this.findFirstId(ids);
      this.meta.calcPushOrder(id, this.steps);
    }    
  }

  unlockLarge(selectId) {
    const tree = TALENT_TREE_DATA[state.selectedClass];
    let ids = [];
    for (const id of tree.medium)
      if (!this.meta.calcGetActived(id))
        ids.push(id);
    if (ids.length == 0) {
      this.meta.calcPushOrder(selectId, this.steps);
    } else {
      const id = this.findFirstId(ids);
      if (this.meta.calcGetLocked(id))
        this.unlockMedium(id);
      else
        this.meta.calcPushOrder(id, this.steps)
    }
  }

  calculate() {
    while (this.meta.order.length < this.steps) {
      logger.log(this.meta)
      for (const id of this.priorityOrder)
        if (this.meta.calcGetReady(id)) {
          if (this.meta.calcGetLocked(id)) {
            if (this.meta[id].tier === "medium")
              this.unlockMedium(id);
            else if (this.meta[id].tier === "large")
              this.unlockLarge(id);
          } else {
            this.meta.calcPushOrder(id, this.steps);
          }
          break;
        }
    }
    return this.meta;
  }
}

function installPublicApi() {
  elements.app.addEventListener("calculator:config-change", (event) => {
    logger.log("config change ->", event.detail, state.currentStep, "/", state.points);
    let bestMeta = new TalentMeta();
    let priorityOrder = JSON.parse(JSON.stringify(activePlan().priorityOrder));
    let firstIdx = [-1, -1, -1], tierMap = {"small": 0, "medium": 1, "large": 2};
    for (let i = 0; i < priorityOrder.length; i++) {
      let tierIdx = tierMap[state.talentMeta[priorityOrder[i]].tier];
      if (firstIdx[tierIdx] == -1)
        firstIdx[tierIdx] = i;
    }
    let findBest = () => {
      let calculator = new Calculator(priorityOrder, state.points);
      let newMeta = calculator.calculate();
      if (newMeta.isBetterOrder(bestMeta))
        bestMeta = newMeta;
    };
    findBest(); [priorityOrder[firstIdx[0]], priorityOrder[firstIdx[1]]] = [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[0]]];
    findBest(); [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[2]]] = [priorityOrder[firstIdx[2]], priorityOrder[firstIdx[1]]];
    findBest(); [priorityOrder[firstIdx[0]], priorityOrder[firstIdx[1]]] = [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[0]]];
    findBest(); [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[2]]] = [priorityOrder[firstIdx[2]], priorityOrder[firstIdx[1]]];
    findBest(); [priorityOrder[firstIdx[0]], priorityOrder[firstIdx[1]]] = [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[0]]];
    findBest(); [priorityOrder[firstIdx[1]], priorityOrder[firstIdx[2]]] = [priorityOrder[firstIdx[2]], priorityOrder[firstIdx[1]]];
    state.talentMeta.loadOrder(bestMeta.order);
    state.talentMeta.stepToTarget(state.currentStep);
    renderTree();
  });
  elements.app.addEventListener("calculator:step-change", (event) => {
    logger.log("step change ->", event.detail, state.currentStep, "/", state.points);
    state.talentMeta.stepToTarget(state.currentStep);
    renderTree();
  });
}

loadInitialState();
bindControls();
installPublicApi();
emitConfigChange("init");
renderAll();
