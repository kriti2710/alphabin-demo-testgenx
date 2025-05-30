class CssXpathGenerator {
    constructor() {
        this.priorityAttributes = [
            "data-test", "data-test-id", "data-testid", "data-qa", "data-automation-id",
            "name", "aria-label", "aria-labelledby", "aria-describedby",
            "role", "placeholder", "title", "alt", "for", "value", "type", "data-semantics-role"
        ];

        this.attributesProperty = {
            svg: [...this.priorityAttributes, "viewBox", "width", "height"],
            img: [...this.priorityAttributes, "alt", "title", "src"],
            button: [...this.priorityAttributes, "name", "type", "title"],
            input: [...this.priorityAttributes, "name", "placeholder", "type", "value"],
            textarea: [...this.priorityAttributes, "name", "placeholder", "data-semantics-role"],
            select: [...this.priorityAttributes, "name",],
            option: [...this.priorityAttributes, "value",],
            label: [...this.priorityAttributes, "for",],
            a: [...this.priorityAttributes, "item-id", "href"],
            default: [...this.priorityAttributes, "name"]
        };

        this.ignoredAttributes = (attr) => {
            if (!attr) return true;

            const coreIgnoredAttributes = [
                "id", "class",
                "href", "src",
                "style", "target",
                "disabled", "hidden", "readonly",
                "tabindex", "draggable", "contenteditable"
            ];

            const ignoredEvents = [
                "onclick", "onmouseover", "onmouseout", "onchange", "onkeydown",
                "onkeyup", "onkeypress", "onload", "onsubmit", "onfocus", "onblur"
            ];

            return coreIgnoredAttributes.includes(attr) ||
                ignoredEvents.includes(attr) ||
                (typeof attr === "string" && (
                    attr.startsWith("on") ||
                    attr.includes("index") ||
                    attr.includes("internal") ||
                    attr.includes("random") ||
                    attr.includes("disabled") ||
                    attr.includes("hidden") ||
                    attr.includes("readonly") ||
                    attr.includes("index")
                ));
        };

        // Maximum length for CSS selectors before considering XPath
        this.MAX_CSS_LENGTH = 100;
    }

    getSelector(element, state) {
        if (!element) return '';

        // Handle iframe elements specially
        const tagName = element.tagName.toLowerCase();
        if (tagName === 'iframe') {
            return this.buildOptimalIframeXPath(element, state);
        }

        // --- Iframe XPath Handling ---
        try {
            let iframe = null;
            let currentWindow = element.ownerDocument.defaultView;
            const maxIterations = 10; // Safeguard against infinite loops
            let iterationCount = 0;

            // Walk up the window chain to see if the element is inside an iframe.
            while (currentWindow !== window.top) {
                iterationCount++;
                if (iterationCount > maxIterations) {
                    break;
                }
                try {
                    iframe = currentWindow.frameElement;
                    if (iframe) {
                        break;
                    }
                    currentWindow = currentWindow.parent;
                } catch (error) {
                    break;
                }
            }

            if (iframe) {
                try {
                    // Compute the XPath of the iframe element itself
                    const iframeXPath = this.buildOptimalIframeXPath(iframe, state);
                    if (iframeXPath) {
                        state.iframeXpath = iframeXPath;
                    }
                } catch (error) {
                    // Optionally log or handle errors here
                }
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                return this.getSelectorWithinDocument(element, iframeDoc).css ||
                    this.getSelectorWithinDocument(element, iframeDoc).xpath;
            }
        } catch (error) {
            // Optionally log unexpected errors during iframe detection
        }

        state.iframeXpath = null;
        const result = this.getSelectorWithinDocument(element);
        return result.css || result.xpath;
    }

    getSelectorWithinDocument(element, doc = document) {
        // Handle special cases like SVG paths or <i> icons
        if (['path', 'i'].includes(element.tagName.toLowerCase())) {
            element = element.parentElement;
        }

        // Try CSS selector first using our revised method, passing the document context.
        const cssSelector = this.buildOptimalCssSelector(element, 0, doc);
        if (cssSelector && this.isSelectorEfficient(cssSelector) && this.isUnique(cssSelector, doc)) {
            return { css: cssSelector, xpath: '' };
        }
        // Fallback to XPath if CSS is inefficient or not unique.
        return { css: '', xpath: this.buildOptimalXPath(element, doc) };
    }


    isSelectorEfficient(selector) {
        if (selector.length > this.MAX_CSS_LENGTH) return false;

        // Count combinators (>, +, ~, whitespace)
        const combinatorCount = (selector.match(/[\s>+~]/g) || []).length;
        if (combinatorCount > 30) return false;

        // Count specificity indicators (IDs, classes, attributes)
        const specificityCount = (selector.match(/[#.[]/g) || []).length;
        if (specificityCount > 4) return false;

        return true;
    }

    /**
     * Revised method to build an optimal CSS selector.
     * The idea is:
     *  1. Try to use the element's own attributes (ID, priority attributes, or tag name).
     *  2. If the selector matches add an index (nth-of-type) if needed.
     *  3. If the selector returns too many results, combine with a parent's selector and try again.
     *  4. Repeat (up to a maximum depth) until a unique selector is found.
     */
    buildOptimalCssSelector(element, depth = 0, doc = document) {
        const MAX_DEPTH = 2;  // Limit recursion depth to keep selectors concise
        if (!element || depth > MAX_DEPTH) return '';

        const tagName = element.tagName.toLowerCase();
        let selectorParts = [];

        // 1. Use meaningful attributes first
        const meaningfulAttrs = this.attributesProperty[tagName] || this.attributesProperty['default'];
        for (const attr of meaningfulAttrs) {
            if (element.hasAttribute(attr) && !this.ignoredAttributes(attr)) {
                const value = element.getAttribute(attr).trim();
                if (value && !this.isInvalidAttributeValue(attr, value)) {
                    const selector = `${tagName}[${attr}="${value}"]`;
                    if (this.isUnique(selector, doc)) {
                        return selector;
                    }
                    selectorParts.push(selector);
                }
            }
        }

        // 2. Try other attributes that aren't in the priority list
        const allAttributes = Array.from(element.attributes);
        for (const attr of allAttributes) {
            const attrName = attr.name;
            const value = attr.value.trim();

            // Skip if attribute is already checked or should be ignored
            if (meaningfulAttrs.includes(attrName) || this.ignoredAttributes(attrName)) {
                continue;
            }

            if (value && !this.isInvalidAttributeValue(attrName, value)) {
                const selector = `${tagName}[${attrName}="${value}"]`;
                if (this.isUnique(selector, doc)) {
                    return selector;
                }
                selectorParts.push(selector);
            }
        }


        // 5. Use parent context if needed
        if (element.parentElement) {
            const parentSelector = this.buildOptimalCssSelector(element.parentElement, depth + 1, doc);
            if (parentSelector) {
                // Try combining parent selector with existing selector parts
                for (const selectorPart of selectorParts) {
                    const childSelector = `${parentSelector} > ${selectorPart}`;
                    if (this.isUnique(childSelector, doc)) return childSelector;
                }

                // Fallback to basic tag name if no selector parts available
                const basicChildSelector = `${parentSelector} > ${tagName}`;
                if (this.isUnique(basicChildSelector, doc)) return basicChildSelector;

                // Use nth-of-type with additional attribute conditions if available
                const siblings = Array.from(element.parentElement.children).filter(
                    sib => sib.tagName.toLowerCase() === tagName
                );
                if (siblings.length > 1) {
                    const index = siblings.indexOf(element) + 1;
                    const nthSelector = `${parentSelector} > ${tagName}:nth-of-type(${index})`;
                    if (this.isUnique(nthSelector, doc)) return nthSelector;

                    // Try combining nth-of-type with attribute selectors for more accuracy
                    if (selectorParts.length > 0) {
                        const enhancedNthSelector = `${parentSelector} > ${tagName}:nth-of-type(${index})${selectorParts[0].substring(tagName.length)}`;
                        if (this.isUnique(enhancedNthSelector, doc)) return enhancedNthSelector;
                    }
                }
            }
        }

        return selectorParts[0]; // Fallback to first selector part or tag name
    }




    isUnique(selector, doc = document) {
        try {
            const elements = doc.querySelectorAll(selector);
            return elements.length === 1;
        } catch (e) {
            return false;
        }
    }


    // ----------------------- Modified XPath methods -----------------------
    // Helper: returns an array of candidate text predicates using different matching strategies.
    // If the text is longer than maxTextLength, only a substring (the first maxTextLength characters) is used.
    buildTextCandidates(text) {
        if (!text) return []; // Early return for empty text

        const MAX_TEXT_LENGTH = 30;
        const escapedText = this.escapeXPathString(
            text.length > MAX_TEXT_LENGTH ? text.substring(0, MAX_TEXT_LENGTH) : text
        );

        return text.length > MAX_TEXT_LENGTH
            ? [`[contains(text(), ${escapedText})]`]
            : [
                `[normalize-space()=${escapedText}]`,
                `[starts-with(normalize-space(), ${escapedText})]`
            ];
    }

    checkCandidate = (candidate, element) => {
        const matches = this.evaluateXPath(candidate);
        if (matches.length === 1) return candidate;

        if (matches.length > 1) {
            const index = Array.from(matches).findIndex(el => el.isSameNode(element)) + 1;
            if (index > 0) {
                const indexedCandidate = `(${candidate})[${index}]`;
                return this.evaluateXPath(indexedCandidate).length === 1 ? indexedCandidate : null;
            }
        }

        return null;
    };

    buildIterativeXPath(element) {
        const tag = element.tagName.toLowerCase();
        // 1. Try combination of 2 attributes first with priority order
        const attributePairs = [];
        for (let i = 0; i < this.priorityAttributes.length; i++) {
            for (let j = i + 1; j < this.priorityAttributes.length; j++) {
                const attr1 = this.priorityAttributes[i];
                const attr2 = this.priorityAttributes[j];

                // Check if both attributes exist and are valid
                if (element.hasAttribute(attr1) && element.hasAttribute(attr2)) {
                    const val1 = element.getAttribute(attr1).trim();
                    const val2 = element.getAttribute(attr2).trim();

                    // Validate attribute values more strictly
                    if (val1 && val2 &&
                        !this.isInvalidAttributeValue(attr1, val1) &&
                        !this.isInvalidAttributeValue(attr2, val2)) {

                        // Try both combinations to find most unique
                        const pair1 = `[@${attr1}=${this.escapeXPathString(val1)} and @${attr2}=${this.escapeXPathString(val2)}]`;
                        const pair2 = `[@${attr2}=${this.escapeXPathString(val2)} and @${attr1}=${this.escapeXPathString(val1)}]`;

                        attributePairs.push(pair1, pair2);

                        // Also try contains() for dynamic values
                        if (val1.length > 20 || val2.length > 20) {
                            attributePairs.push(
                                `[contains(@${attr1}, ${this.escapeXPathString(val1.substring(0, 20))}) and @${attr2}=${this.escapeXPathString(val2)}]`,
                                `[@${attr1}=${this.escapeXPathString(val1)} and contains(@${attr2}, ${this.escapeXPathString(val2.substring(0, 20))})]`
                            );
                        }
                    }
                }
            }
        }

        // Try each pair combination to find unique locator
        for (const pair of attributePairs) {
            // Try with and without descendant axis
            const candidates = [
                `//${tag}${pair}`,
                `.//${tag}${pair}`,
                `descendant::${tag}${pair}`
            ];

            for (const candidate of candidates) {
                const uniqueXPath = this.checkCandidate(candidate, element);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // (3) Try using other attributes not in the priority list.
        const allAttrs = element.getAttributeNames();
        for (const attr of allAttrs) {
            if (!this.priorityAttributes.includes(attr) && !this.ignoredAttributes(attr)) {
                const value = element.getAttribute(attr);
                if (value && !this.isInvalidAttributeValue(attr, value)) {
                    const candidate = `//${tag}[@${attr}=${this.escapeXPathString(value)}]`;
                    const uniqueXPath = this.checkCandidate(candidate, element);
                    if (uniqueXPath) return uniqueXPath;
                }
            }
        }


        // (2) Try using text content with a maximum search depth of 5.
        const text = this.getTextContentWithDepthLimit(element, 5).trim();
        if (text) {
            const textCandidates = this.buildTextCandidates(text);
            for (const predicate of textCandidates) {
                const candidate = `//${tag}${predicate}`;
                const uniqueXPath = this.checkCandidate(candidate, element);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // (4) Try combining with parent's XPath for better uniqueness
        if (element.parentElement) {
            const parentXPath = this.buildIterativeXPath(element.parentElement);
            if (parentXPath) {
                // Try priority attributes with parent
                for (const attr of this.priorityAttributes) {
                    if (element.hasAttribute(attr)) {
                        const value = element.getAttribute(attr);
                        if (value && !this.isInvalidAttributeValue(attr, value)) {
                            const condition = `[@${attr}=${this.escapeXPathString(value)}]`;
                            // Try without parent
                            const candidateWithoutParent = `//${tag}${condition}`;
                            const uniqueXPathWithoutParent = this.checkCandidate(candidateWithoutParent, element);
                            if (uniqueXPathWithoutParent) return uniqueXPathWithoutParent;

                            // Try with parent
                            const candidateWithParent = `${parentXPath}//${tag}${condition}`;
                            const uniqueXPathWithParent = this.checkCandidate(candidateWithParent, element);
                            if (uniqueXPathWithParent) return uniqueXPathWithParent;
                        }
                    }
                }

                // Try text content with parent
                if (text) {
                    const textCondition = this.buildTextCandidates(text)[0];

                    // Try with parent
                    const candidateWithParent = `${parentXPath}//${tag}${textCondition}`;
                    const uniqueXPathWithParent = this.checkCandidate(candidateWithParent, element);
                    if (uniqueXPathWithParent) return uniqueXPathWithParent;

                    // Try without parent
                    const candidateWithoutParent = `//${tag}${textCondition}`;
                    const uniqueXPathWithoutParent = this.checkCandidate(candidateWithoutParent, element);
                    if (uniqueXPathWithoutParent) return uniqueXPathWithoutParent;
                }

                // Try tag only with parent as fallback
                const baseCandidate = `${parentXPath}//${tag}`;
                const uniqueXPath = this.checkCandidate(baseCandidate, element);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // (5) Fallback to a stable positional XPath if none of the above worked.
        return this.buildStablePositionalXPath(element);
    }


    // Modified buildOptimalXPath to use the iterative method above
    buildOptimalXPath(element, state = {}) {
        const tagName = element.tagName.toLowerCase();

        // Handle SVG elements
        if (tagName === 'svg') {
            const svgXPath = this.handleSVGElement(element);
            if (svgXPath) return svgXPath;
        }

        const iterativeXPath = this.buildIterativeXPath(element);
        if (iterativeXPath) return iterativeXPath;

        if (this.isInteractiveElement(element)) {
            return this.buildInteractiveXPath(element);
        }

        return this.buildStablePositionalXPath(element);
    }

    isInteractiveElement(element) {
        // Check if element is clickable or can change state
        const interactiveTags = ['button', 'a', 'input', 'select', 'textarea'];
        const interactiveRoles = ['button', 'link', 'menuitem', 'tab', 'menuitemcheckbox'];

        return interactiveTags.includes(element.tagName.toLowerCase()) ||
            interactiveRoles.includes(element.getAttribute('role')) ||
            element.hasAttribute('onclick') ||
            element.hasAttribute('tabindex') ||
            window.getComputedStyle(element).cursor === 'pointer';
    }

    buildInteractiveXPath(element) {
        // For interactive elements, prefer stable parent references
        const stableParent = this.findStableParent(element);
        if (!stableParent) {
            return this.buildStablePositionalXPath(element);
        }

        const parentXPath = this.getStableParentXPath(stableParent);
        if (!parentXPath) {
            return this.buildStablePositionalXPath(element);
        }

        // Get the text content of the element
        const text = this.getTextContentWithDepthLimit(element, 1).trim();
        if (text) {
            const escapedText = this.escapeXPathString(text);
            const relativeXPath = `.//${element.tagName.toLowerCase()}[normalize-space()=${escapedText}]`;
            const fullXPath = `${parentXPath}${relativeXPath}`;

            const uniqueXPath = this.checkCandidate(fullXPath, element); // Pass element to checkCandidate
            if (uniqueXPath) return uniqueXPath;
        }

        return this.buildStablePositionalXPath(element);
    }
    buildStablePositionalXPath(element) {
        const segments = [];
        let current = element;
        const maxDepth = 2;

        // Commonly used values
        const nodeType = Node.ELEMENT_NODE;
        const escapeXPath = this.escapeXPathString.bind(this);
        const isVisible = this.isElementVisible.bind(this);

        const buildSegment = (el) => {
            const tagName = el.tagName.toLowerCase();
            // Check priority attributes in order
            for (const attr of this.priorityAttributes) {
                const value = el.getAttribute(attr);
                if (value && !this.isInvalidAttributeValue(attr, value)) {
                    return `${tagName}[@${attr}=${escapeXPath(value)}]`;
                }
            }

            // Get parent element once
            const parent = el.parentElement;
            if (!parent) return tagName;

            // Optimize sibling filtering
            const siblings = Array.from(parent.children).filter(child =>
                child.tagName.toLowerCase() === tagName && isVisible(child)
            );

            return siblings.length === 1 ? tagName :
                `${tagName}[${siblings.indexOf(el) + 1}]`;
        };

        // Build segments up to maxDepth
        for (let depth = 0; current && current.nodeType === nodeType && depth < maxDepth; depth++) {
            segments.unshift(buildSegment(current));
            current = current.parentElement;
        }

        const xpath = `//${segments.join('/')}`;
        const matches = this.evaluateXPath(xpath);

        if (matches.length === 1) return xpath;

        // Filter and index visible matches
        const visibleMatches = matches.filter(isVisible);
        const index = visibleMatches.findIndex(el => el.isSameNode(element)) + 1;

        return index > 1 ? `(${xpath})[${index}]` : xpath;
    }

    getElementPositionWithinParent(element) {
        if (!element?.parentElement) return 1;

        const tagName = element.tagName.toLowerCase();
        const children = Array.from(element.parentElement.children).filter(this.isElementVisible); // Filter visible elements

        // Count elements with the same tag name *before* the current element
        let position = 0;
        for (let i = 0; i < children.indexOf(element); i++) {
            if (children[i].tagName.toLowerCase() === tagName) {
                position++;
            }
        }

        return position + 1; // nth-child is 1-based
    }



    isElementVisible(element) {
        if (!element) return false;
        const style = window.getComputedStyle(element);

        // Quick visibility checks
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0')
            return false;

        // Detailed geometry checks
        const rect = element.getBoundingClientRect();
        return !(rect.width === 0 || rect.height === 0 ||
            rect.top > window.innerHeight || rect.bottom < 0 ||
            rect.left > window.innerWidth || rect.right < 0);
    }

    getTextContentWithDepthLimit(element, maxDepth, currentDepth = 0) {
        if (!element || currentDepth >= maxDepth) return '';

        // Get direct text content
        const texts = [];
        for (const node of element.childNodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent.trim();
                if (text) texts.push(text);
            }
        }

        const directText = texts.join(' ');
        if (directText) return directText;

        // Process child elements
        const childTexts = [];
        for (const child of element.children) {
            if (!['script', 'style', 'noscript'].includes(child.tagName.toLowerCase())) {
                const childText = this.getTextContentWithDepthLimit(child, maxDepth, currentDepth + 1);
                if (childText) childTexts.push(childText);
            }
        }

        return childTexts.join(' ');
    }


    tryStableAttributeXPath(element) {
        const tagName = element.tagName.toLowerCase();

        for (const attr of this.priorityAttributes) {
            if (element.hasAttribute(attr)) {
                const value = element.getAttribute(attr);
                if (value && !this.isInvalidAttributeValue(attr, value)) {
                    const xpath = `//${tagName}[@${attr}=${this.escapeXPathString(value)}]`;
                    const matches = this.evaluateXPath(xpath);
                    if (matches.length === 1) return xpath;
                    if (matches.length > 1) {

                        // Add parent context for uniqueness
                        const parentXPath = this.getStableParentXPath(element);
                        if (parentXPath) {
                            const withParentXPath = `${parentXPath}//${tagName}[@${attr}=${this.escapeXPathString(value)}]`;
                            if (this.evaluateXPath(withParentXPath).length === 1) {
                                return withParentXPath;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }

    getStableParentXPath(element) {
        let current = element.parentElement;
        let depth = 0;
        const maxDepth = 3;

        while (current && depth < maxDepth) {
            const stableXPath = this.tryStableAttributeXPath(current);
            if (stableXPath) return stableXPath;
            current = current.parentElement;
            depth++;
        }

        return null;
    }

    findStableParent(element) {
        let current = element.parentElement;
        let depth = 0;
        const maxDepth = 3;

        while (current && depth < maxDepth) {
            if (this.hasStableAttributes(current)) {
                return current;
            }
            current = current.parentElement;
            depth++;
        }

        return null;
    }

    hasStableAttributes(element) {
        return this.priorityAttributes.some(attr =>
            element.hasAttribute(attr) && !this.isInvalidAttributeValue(attr, element.getAttribute(attr))
        );
    }

    evaluateXPath(xpath, contextDocument = document) {
        if (!xpath || typeof xpath !== 'string') {
            console.error('[XPath] Invalid XPath:', xpath);
            return [];
        }

        try {
            const result = contextDocument.evaluate(
                xpath,
                contextDocument,
                null,
                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                null
            );

            // Convert snapshot to array
            const nodes = [];
            for (let i = 0; i < result.snapshotLength; i++) {
                const node = result.snapshotItem(i);
                if (node) nodes.push(node);
            }
            return nodes;
        } catch (error) {
            console.error(`[XPath] Error evaluating: ${xpath}`, error);
            return [];
        }
    }

    handleSVGElement(element) {
        const pathElement = element.querySelector('path');
        if (!pathElement?.getAttribute('d')) {
            return "//*[name()='svg']";
        }

        const dValue = pathElement.getAttribute('d');
        const dValueSubstring = dValue.substring(0, 10);

        // Use single quotes consistently
        const xpath = `//*[name()='svg'][.//*[name()='path' and contains(@d,'${dValueSubstring}')]]`;

        try {
            const elements = this.evaluateXPath(xpath, element.ownerDocument);
            if (!elements || elements.length === 0) return xpath;

            if (elements.length === 1) return xpath;

            const index = Array.from(element.ownerDocument.querySelectorAll('svg'))
                .filter(svg => {
                    const path = svg.querySelector('path');
                    return path?.getAttribute('d')?.includes(dValueSubstring);
                })
                .findIndex(el => el.isSameNode(element)) + 1;
            return index > 0 ? `(${xpath})[${index}]` : xpath;
        } catch (error) {
            console.error('[DEBUG] SVG XPath evaluation failed:', error);
            return xpath;
        }
    }

    escapeXPathString(str) {
        // Handle strings with both single and double quotes
        if (str.includes("'") && str.includes('"')) {
            return `concat('${str.replace(/'/g, "' , \"'\" , '")}')`;
        }
        // Prefer single quotes if possible
        return `'${str}'`;
    }

    isInvalidAttributeValue(attr, value) {

        if (!value || typeof value !== 'string') return true;

        if (value.includes('javascript:') ||
            value.includes('(') ||
            value.includes(')') ||
            value.includes('<') ||
            value === 'true' ||
            value === 'false' ||
            value === 'open' ||
            value.includes(':') ||
            value === 'closed' ||
            value === 'visible' ||
            value === 'hidden' ||
            value === 'enabled' ||
            value === 'disabled' ||
            value === 'checked' ||
            value.includes('>')) {
            return true;
        }

        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value)) {
            return true;
        }

        if (/^[a-zA-Z0-9_-]{16,}$/.test(value) && !/^[a-z]+[-_]?[a-z]+$/i.test(value)) {
            return true;
        }

        return false;
    }

    getXpathOnly(element) {
        return this.buildOptimalXPath(element);
    }

    // Optimized method for generating iframe XPaths using priority attributes
    buildOptimalIframeXPath(iframeElement, state = {}) {
        if (!iframeElement || iframeElement.tagName.toLowerCase() !== 'iframe') {
            return '';
        }

        // Try priority attributes first
        for (const attr of this.priorityAttributes) {
            const value = iframeElement.getAttribute(attr);
            if (value && !this.isInvalidAttributeValue(attr, value)) {
                const xpath = `//iframe[@${attr}=${this.escapeXPathString(value)}]`;
                const uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) {
                    return uniqueXPath;
                }
            }
        }

        // Try src attribute with different matching strategies
        const src = iframeElement.getAttribute('src');
        if (src && !this.isInvalidAttributeValue('src', src)) {
            // Try exact match
            let xpath = `//iframe[@src=${this.escapeXPathString(src)}]`;
            let matches = this.evaluateXPath(xpath);

            // If we have multiple matches with the same src, we need to differentiate them
            if (matches.length > 1) {
                // First try to find the position in the document
                const allIframesWithSameSrc = Array.from(document.querySelectorAll(`iframe[src="${src}"]`));
                if (allIframesWithSameSrc.length > 1) {
                    const position = allIframesWithSameSrc.indexOf(iframeElement) + 1;
                    if (position > 0) {
                        const indexedXPath = `(//iframe[@src=${this.escapeXPathString(src)}])[${position}]`;
                        if (this.evaluateXPath(indexedXPath).length === 1) {
                            return indexedXPath;
                        }
                    }
                }

                // Try with parent context if indexing didn't work
                if (iframeElement.parentElement) {
                    const parentXPath = this.buildOptimalXPath(iframeElement.parentElement);
                    if (parentXPath) {
                        const contextXPath = `${parentXPath}//iframe[@src=${this.escapeXPathString(src)}]`;
                        if (this.evaluateXPath(contextXPath).length === 1) {
                            return contextXPath;
                        }

                        // Try with position within the parent context
                        const parentIframes = Array.from(iframeElement.parentElement.querySelectorAll(`iframe[src="${src}"]`));
                        if (parentIframes.length > 1) {
                            const positionInParent = parentIframes.indexOf(iframeElement) + 1;
                            if (positionInParent > 0) {
                                const positionedXPath = `${parentXPath}//iframe[@src=${this.escapeXPathString(src)}][${positionInParent}]`;
                                if (this.evaluateXPath(positionedXPath).length === 1) {
                                    return positionedXPath;
                                }
                            }
                        }
                    }
                }
            } else {
                const uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;
            }

            // Try base path without query params
            const baseSrc = src.split('?')[0];
            if (baseSrc !== src) {
                xpath = `//iframe[starts-with(@src, ${this.escapeXPathString(baseSrc)})]`;
                let uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;
            }

            // Try last URL segment
            const lastSegment = baseSrc.split('/').pop();
            if (lastSegment) {
                xpath = `//iframe[contains(@src, ${this.escapeXPathString(lastSegment)})]`;
                let uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // Try with parent context
        if (iframeElement.parentElement) {
            const parentXPath = this.buildOptimalXPath(iframeElement.parentElement);
            if (parentXPath) {
                // Try direct child first
                let xpath = `${parentXPath}/iframe`;
                let uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;

                // Try descendant
                xpath = `${parentXPath}//iframe`;
                uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // Try closest div parent with stable attributes
        let current = iframeElement.parentElement;
        while (current) {
            if (current.tagName.toLowerCase() === 'div') {
                for (const attr of this.priorityAttributes) {
                    const value = current.getAttribute(attr);
                    if (value && !this.isInvalidAttributeValue(attr, value)) {
                        const divXPath = `//div[@${attr}=${this.escapeXPathString(value)}]`;
                        const iframes = Array.from(current.querySelectorAll('iframe'));
                        const position = iframes.indexOf(iframeElement) + 1;

                        if (position > 0) {
                            const xpath = iframes.length === 1 ?
                                `${divXPath}//iframe` :
                                `${divXPath}//iframe[${position}]`;
                            const uniqueXPath = this.checkCandidate(xpath, iframeElement);
                            if (uniqueXPath) return uniqueXPath;
                        }
                    }
                }
            }
            current = current.parentElement;
        }

        // Try common identifying attributes
        const attributes = ['name', 'id', 'title'];
        for (const attr of attributes) {
            const value = iframeElement.getAttribute(attr);
            if (value && !this.isInvalidAttributeValue(attr, value)) {
                const xpath = `//iframe[@${attr}=${this.escapeXPathString(value)}]`;
                const uniqueXPath = this.checkCandidate(xpath, iframeElement);
                if (uniqueXPath) return uniqueXPath;
            }
        }

        // Fallback to positional xpath with document order
        const allIframes = Array.from(document.querySelectorAll('iframe'));
        const position = allIframes.indexOf(iframeElement) + 1;
        if (position > 0) {
            const positionXPath = `(//iframe)[${position}]`;
            const uniqueXPath = this.checkCandidate(positionXPath, iframeElement);
            if (uniqueXPath) return uniqueXPath;
        }

        // Ultimate fallback to standard positional xpath
        return this.buildStablePositionalXPath(iframeElement);
    }
}

// Create singleton instance
const cssXpathGenerator = new CssXpathGenerator();

module.exports = {
    getSelector(element, state) {
        return cssXpathGenerator.getSelector(element, state);
    },
    getXpathOnly(element) {
        return cssXpathGenerator.getXpathOnly(element);
    },
    CssXpathGenerator
};